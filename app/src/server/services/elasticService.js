const { Client } = require('@elastic/elasticsearch');
const config = require('../config/config');
const esClient = new Client({ node: config.es_node });

const formatFoodItems = (foodItems) => {
  // Assume there's some logic here to format the food items,
  // e.g., to trim long strings, remove duplicates, etc.
  return foodItems.split(', ').map(item => item.trim()).join(', ');
};

const searchByKey = async (key) => {
  const { body } = await esClient.search({
    index: 'sfdata',
    body: {
      query: { match: { fooditems: key } },
      size: 750 // 最大文档大小
    }
  });

  return body.hits.hits;
};

exports.searchFoodItems = async (key) => {
  const result = await esClient.search({
    index: 'sfdata',
    body: {
      query: {
        match: { fooditems: key }
      },
      size: 750 // max document size
    }
  });

  // Process hits and group by applicant (vendor)
  const hits = result.body.hits.hits;
  const vendors = new Set(hits.map(hit => hit._source.applicant));
  const temp = {};
  const fooditems = {};

  hits.forEach(hit => {
    const applicant = hit._source.applicant;
    // Collect all unique food items for each vendor
    fooditems[applicant] = fooditems[applicant]
      ? `${fooditems[applicant]}, ${hit._source.fooditems}`
      : hit._source.fooditems;

    // Prepare structured data for each truck per vendor
    const truck = {
      hours: hit._source.dayshours || "NA",
      schedule: hit._source.schedule || "NA",
      address: hit._source.address || "NA",
      location: hit._source.location,
    };

    if (!temp[applicant]) {
      temp[applicant] = [];
    }

    temp[applicant].push(truck);
  });

  // Construct final structured response for GraphQL
  const trucks = Array.from(vendors).map(vendor => ({
    name: vendor,
    fooditems: formatFoodItems(fooditems[vendor]),
    branches: temp[vendor],
    drinks: fooditems[vendor].toLowerCase().includes("cold truck"),
  }));

  const hitsCount = trucks.length;
  const locationsCount = Object.values(temp).reduce((acc, branches) => acc + branches.length, 0);

  return {
    trucks: trucks,
    hits: hitsCount,
    locations: locationsCount
  };
};

module.exports = {
  searchByKey,
};