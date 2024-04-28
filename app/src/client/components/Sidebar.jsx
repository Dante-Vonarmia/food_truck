import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Vendor from "@/client/pages/Vendor";

const Sidebar = ({ map }) => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const GRAPHQL_URL = 'http://localhost:3000/graphql';

  const fetchResults = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.post(GRAPHQL_URL, {
        query: `
          query Search($query: String!) {
            searchTrucks(key: $key) {
              branches {
                hours
                address
                location {
                  coordinates
                  type
                }
                schedule
              }
            }
          }
        `,
        variables: {
          query: query
        },
      });
      
      setResults(response.data.data.search.vendors); // 注意这个路径可能需要根据实际的返回数据结构调整
    } catch (error) {
      console.error("Error in fetching response: ", error);
    }
    setLoading(false);
  }, [query]);

  const generateGeoJSON = useCallback((markers) => {
    return {
      type: "FeatureCollection",
      features: markers.map(p => ({
        type: "Feature",
        properties: {
          name: p.name,
          hours: p.hours,
          address: p.address,
          "point-color": "253,237,57,1",
        },
        geometry: {
          type: "Point",
          coordinates: [parseFloat(p.location.longitude), parseFloat(p.location.latitude)],
        },
      })),
    };
  }, []);

  const plotOnMap = useCallback((vendor) => {
    const markers = results.flatMap(t =>
      t.branches.map(b => ({
        location: b.location,
        name: t.name,
        schedule: b.schedule,
        hours: b.hours,
        address: b.address,
      }))
    );

    let highlightMarkers, usualMarkers, usualgeoJSON, highlightgeoJSON;
    if (vendor) {
      highlightMarkers = markers.filter(m => m.name.toLowerCase() === vendor.toLowerCase());
      usualMarkers = markers.filter(m => m.name.toLowerCase() !== vendor.toLowerCase());
    } else {
      usualMarkers = markers;
    }

    usualgeoJSON = generateGeoJSON(usualMarkers);
    if (highlightMarkers) {
      highlightgeoJSON = generateGeoJSON(highlightMarkers);
    }

    // Clearing layers
    if (map.getLayer("trucks")) {
      map.removeLayer("trucks");
    }
    if (map.getSource("trucks")) {
      map.removeSource("trucks");
    }
    if (map.getLayer("trucks-highlight")) {
      map.removeLayer("trucks-highlight");
    }
    if (map.getSource("trucks-highlight")) {
      map.removeSource("trucks-highlight");
    }

    // Add new layers
    map.addSource("trucks", {
      type: "geojson",
      data: usualgeoJSON,
    });
    map.addLayer({
      id: "trucks",
      type: "circle",
      source: "trucks",
      paint: {
        "circle-radius": 8,
        "circle-color": "rgba(253,237,57,1)",
      },
    });

    if (highlightMarkers) {
      map.addSource("trucks-highlight", {
        type: "geojson",
        data: highlightgeoJSON,
      });
      map.addLayer({
        id: "trucks-highlight",
        type: "circle",
        source: "trucks-highlight",
        paint: {
          "circle-radius": 8,
          "circle-color": "rgba(164,65,99,1)",
        },
      });
    }
  }, [results, generateGeoJSON, map]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchResults();
  };

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    fetchResults();
  }, [query, fetchResults]);

  return (
    <div>
      <div id="search-area">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Burgers, Tacos or Wraps?"
          />
          <button type="submit">Search!</button>
        </form>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        results.length > 0 && (
          <div id="results-area">
            <h5>
              Found <span className="highlight">{results.length}</span> vendors
            </h5>
            <ul>
              {results.map((vendor, i) => (
                <Vendor key={i} data={vendor} />
              ))}
            </ul>
          </div>
        )
      )}
    </div>
  );
};

export default Sidebar;
