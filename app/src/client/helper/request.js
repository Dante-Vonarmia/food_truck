import Request from '@/client/utils/request';
import { camelizeKeys } from 'humps';

export const gqlPrefix = '/graphql/';

const request = Request.create();

request.interceptors.response.use(
  (data) => camelizeKeys(data),
  (error) => {
    const { errors } = error || {};
    return Promise.reject(error);
  },
);

export default request;
