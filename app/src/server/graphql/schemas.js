// 引入 gql 来创建 schema
const gql = require('graphql-tag');

const typeDefs = gql`
  type Query {
    getData: [DataItem]!
    searchTrucks(key: String!): TruckSearchResult
  }

  type TruckSearchResult {
    trucks: [Truck]
    hits: Int
    locations: Int
  }

  type DataItem {
    id: ID!
    applicant: String
    facilityType: String
    locationDescription: String
    address: String
    foodItems: String
    latitude: Float
    longitude: Float
  }

  type Truck {
    name: String
    fooditems: String
    branches: [Branch]
    drinks: Boolean
  }

  type Branch {
    hours: String
    schedule: String
    address: String
    location: Location
  }

  type Location {
    type: String
    coordinates: [Float]
  }
`;

module.exports = typeDefs;
