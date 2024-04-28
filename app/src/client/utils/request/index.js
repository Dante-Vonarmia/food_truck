import axios, { CancelToken } from 'axios';
import responseHandler from './responseHandler';

const defaultConfig = {
  baseURL: '/',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
  validateStatus: (status) => ((status >= 200) && (status < 500)),
};

const REQUEST_METHOD = ['request'];
const BASIC_METHODS = ['get', 'delete', 'head', 'options'];
const OTHER_METHODS = ['post', 'put', 'patch'];
const METHODS = [...REQUEST_METHOD, ...BASIC_METHODS, ...OTHER_METHODS];

function init(inst, { useRequestInterceptor = true, useResponseInterceptor = true } = {}) {
  const instance = inst;
  const originRequest = instance.request;

  // custom methods
  METHODS.forEach((method) => {
    instance[method] = (...args) => {
      let config = {};
      let formatter;
      if (REQUEST_METHOD.includes(method)) {
        const { formatter: _formatter, ...options } = args[0] || {};
        formatter = _formatter;
        config = options;
      } else if (BASIC_METHODS.includes(method)) {
        const [url, { formatter: _formatter, ...options } = {}] = args;
        formatter = _formatter;
        config = {
          method,
          url,
          ...options,
        };
      } else if (OTHER_METHODS.includes(method)) {
        const [url, data, { formatter: _formatter, ...options } = {}] = args;
        formatter = _formatter;
        config = {
          method,
          url,
          data,
          ...options,
        };
      }
      const source = CancelToken.source();
      config.cancelToken = source.token;

      let promise = originRequest(config);
      if (formatter) promise = promise.then(formatter);

      promise.abort = () => {
        source.cancel();
      };

      return promise;
    };
  });

  // interceptor.request
  if (useRequestInterceptor) {
    instance.interceptors.request.use(({ url, ...params }) => ({
      ...params,
      url: url.endsWith('/') ? url : `${url}/`,
    }));
  }

  // interceptor.response
  if (useResponseInterceptor) {
    instance.interceptors.response.use(
      (response) => responseHandler(response),
      (error) => responseHandler(error.response, error),
    );
  }

  return instance;
}

const request = axios.create(defaultConfig);
init(request);

request.create = ({ useRequestInterceptor, useResponseInterceptor, ...config } = {}) => {
  const instance = axios.create({ ...defaultConfig, ...config });
  return init(instance, { useRequestInterceptor, useResponseInterceptor });
};

export default request;
