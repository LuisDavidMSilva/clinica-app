import { useEffect, useState } from 'react';
import { api } from '../libs/api';

export const useAxios = <T = any>(path: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(path)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, error, loading };
};
