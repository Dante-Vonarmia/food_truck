// 引入需要的服务
const getLocalData = require('../services/dataService');
const { searchByKey } = require('../services/elasticService');

const resolvers = {
  Query: {
    getData: () => getLocalData(),
    searchTrucks: async (_, { key }) => {
      const results = await searchByKey(key);

      const vendors = new Set(results.map(hit => hit._source.applicant));
      const temp = { ...vendors }; // 创建 vendors 的结构
      const fooditems = { ...vendors }; // 创建 fooditems 的结构

      // 继续之前的逻辑，转换 Elasticsearch 结果为 GraphQL 需要的格式
      results.forEach(hit => {
        const applicant = hit._source.applicant;
        const truck = {
          hours: hit._source.dayshours || "NA",
          schedule: hit._source.schedule || "NA",
          address: hit._source.address || "NA",
          location: hit._source.location,
        };
        fooditems[applicant] = hit._source.fooditems;
        if (!temp[applicant]) {
          temp[applicant] = [];
        }
        temp[applicant].push(truck);
      });

      const trucks = Object.keys(temp).map(vendor => ({
        name: vendor,
        fooditems: fooditems[vendor],
        branches: temp[vendor],
        drinks: fooditems[vendor].includes("COLD TRUCK"),
      }));

      return trucks;
    },
  },
};

module.exports = resolvers;
