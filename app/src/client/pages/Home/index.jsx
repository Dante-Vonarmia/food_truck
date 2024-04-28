import React, { useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '@/client/components/Sidebar';
import { useMapboxContext } from '@/client/context/MapboxContext';
import axios from 'axios';

// TODO: Should replace with webpack proxy.
const GRAPHQL_URL = 'http://localhost:3000/graphql';

function Home() {
  const { map } = useMapboxContext();

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        const response = await axios({
          url: GRAPHQL_URL,
          method: 'POST',
          data: {
            query: `
              query ExampleQuery {
                getData {
                  address
                  applicant
                }
              }
            `
          },
          headers: {

            'Content-Type': 'application/json'
          }
        });
        console.log(response.data);
        // setData(response.data);
      } catch (err) {
        // setError(err);
      } finally {
        // setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (map) {
      map.on("load", setupMap);
    }

    return () => {
      if (map) {
        map.off("load", setupMap);
      }
    };
  }, [map]);
  
  const setupMap = useCallback(() => {
    map.on("click", function (e) {
      const features = map.queryRenderedFeatures(
        e.point,
        { layers: ['trucks', 'trucks-highlight'], radius: 10, includeGeometry: true }
      );

      if (!features.length) return;

      const feature = features[0];
      const content = ReactDOMServer.renderToString(
        <MarkerPopupContent {...feature.properties} />
      );
      new mapboxgl.Popup()
        .setLngLat(feature.geometry.coordinates)
        .setHTML(content)
        .addTo(map);
    });
  }, [map]);

  function formatHTMLforMarker(props) {
    const { name, hours, address } = props;
    return `
      <div class="marker-title">${name}</div>
      <h4>Operating Hours</h4>
      <span>${hours}</span>
      <h4>Address</h4>
      <span>${address}</span>
    `;
  }

  return (
    <div>
      <div id="map" style={{ width: '100%', height: '100vh' }}></div>
      <Sidebar map={map} />
    </div>
  );
}

export default Home;

// TODO: if webpack proxy works. It should be adapt methods like these:
// import { useRequest } from '@/client/hooks/useRequest';
// import { fetchMapData } from '@/client/services/map';

// const Sidebar = ({ map }) => {
//   const [query, setQuery] = useState('');
//   const { data: results, loading, error } = useRequest(
//     fetchMapData,
//     [],
//     [query],
//     {
//       then: (data) => {
//         console.log('Data fetched successfully:', data);
//       },
//       catch: (error) => {
//         console.error('Error while fetching data:', error);
//       }
//     }
//   );