const axios = require('axios');

async function getData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

function convertData(data, msymbol="restaurant", msize="medium") {
  return data.reduce((acc, d) => {
    if (d.longitude && d.latitude) {
      acc.push({
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [parseFloat(d.longitude), parseFloat(d.latitude)]
        },
        properties: {
          name: d.applicant || "",
          markerSymbol: msymbol,
          markerSize: msize,
          markerColor: "#CC0033",
          fooditems: d.fooditems || "",
          address: d.address || ""
        }
      });
    }
    return acc;
  }, []);
}
