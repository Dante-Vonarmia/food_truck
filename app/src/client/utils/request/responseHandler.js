import Axios from 'axios';

function getTypeOf(obj) {
  // Correctly using call to bind this to obj
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
}

const defaultError = {
  success: false,
  status: 400,
};

function generateError(error) {
  return Promise.reject({ ...defaultError, ...error });
}

/**
 * Handles axios responses and errors, converting them into a unified format.
 * @param {Object} response - The axios response object.
 * @param {Object} error - The axios error object.
 * @returns {Promise<Object>|Object} - A promise that resolves to the response data or rejects with an error object.
 */
export default function responseHandler(response, error) {
  if (!response) {
    // Handle axios cancelation as a special case
    return Axios.isCancel(error) ? generateError({ ...error, aborted: true }) : generateError(error);
  }

  const { status, data, config } = response;
  const { url } = config || {};

  if (!data) {
    return (status >= 400) ? generateError({ status, data, url, response }) : data;
  }

  if (getTypeOf(data) === 'object') {
    if ('success' in data && 'status' in data) {
      return data.success ? (data.data ?? {}) : generateError({ ...data, url, response });
    }

    if ('errors' in data) {
      const { errors } = data;
      let innerStatus = defaultError.status;

      if (getTypeOf(errors) === 'array') {
        const err = errors.find((e) => 'status' in e);
        if (err && err.status) innerStatus = err.status;
      }

      return generateError({ status: innerStatus, ...data, url, response });
    }

    if (url?.includes?.('/gql')) return data.data ?? {};
  }

  if (status >= 400) {
    return generateError({ status, data, url, response });
  }

  return data;
}
