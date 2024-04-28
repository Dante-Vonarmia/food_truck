const data = require('../../../resources/sample.json');

function getLocalData() {
  return data.map(item => ({
    id: item.locationid,
    applicant: item.Applicant,
    facilityType: item.FacilityType,
    locationDescription: item.LocationDescription,
    address: item.Address,
    foodItems: item.FoodItems,
    latitude: item.Latitude,
    longitude: item.Longitude
  }));
}

module.exports = getLocalData;
