import request, { gqlPrefix } from '@/client/helper/request';

const GET_DATA_QUERY = `
  query GetData {
    getData {
      id
      applicant
      facilityType
      locationDescription
      address
      foodItems
      latitude
      longitude
    }
  }
`;

export const fetchMapData = () => {
  return request.post(gqlPrefix, {
    query: GET_DATA_QUERY,
  }).then(response => response.data);
};
