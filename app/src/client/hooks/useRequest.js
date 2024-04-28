import { useEffect, useRef, useState } from 'react';
import { unstable_batchedUpdates as batch } from 'react-dom';

/**
 * use request
 * @param {Promise} request
 * @param {any[]} [params]
 * @param {any[]} [dependencies]
 * @param {{canRequest?: function, keepOneRequest?: boolean, once?: boolean, then?: function, catch?: function}} [options]
 * @returns {{request: *, data: any, loading: boolean, error: any}}
 */
export const useRequest = (request, params = [], dependencies = [], options = {}) => {
  const { canRequest, keepOneRequest = false, once, then: onThen, catch: onCatch } = options;
  const [onceExecuted, setOnceExecuted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();
  const unmounted = useRef(false);
  const client = useRef();

  useEffect(() => () => {
    unmounted.current = true;
    if (client.current?.abort) client.current.abort();
  }, []);

  useEffect(() => {
    if (keepOneRequest && client.current?.abort) client.current.abort();

    if (canRequest && !canRequest()) {
      setLoading(false);
      return;
    }

    setLoading(true);
    client.current = request(...params);
    client.current.then((d) => {
      if (!unmounted.current) {
        batch(() => {
          setLoading(false);
          setData(d);
          if (onThen && (!once || !onceExecuted)) {
            setOnceExecuted(true);
            onThen(d);
          }
        });
      }
    }).catch((e) => {
      if (!unmounted.current) {
        batch(() => {
          setLoading(false);
          setError(e);
          if (onCatch && (!once || !onceExecuted)) {
            setOnceExecuted(true);
            onCatch(e);
          }
        });
      }
    });
  }, dependencies);

  return {
    request,
    loading,
    data,
    error,
    setLoading,
    setData,
    setError,
  };
};
