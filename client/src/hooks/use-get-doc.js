import sendRequest from '../utils/send-request';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const useGetDoc = (url, config) => {
  let mounted = true;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doc, setDoc] = useState([]);

  const source = axios.CancelToken.source();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    let requestConfig = {
      cancelToken: source.token,
      headers: { Authorization: token },
    };

    if (config) {
      requestConfig = { ...requestConfig, ...config };
    }

    const fetchDoc = async () => {
      const res = await sendRequest(url, requestConfig);
      return res;
    };

    fetchDoc().then((responseData) => {
      // Handle success response
      if (responseData.status === 'success' && mounted) {
        setDoc(responseData.data.data.data);
      }

      // Handle error response
      if (responseData.status === 'error' && mounted) {
        setError(responseData.data);
      }

      // Remove loading state
      if (mounted) setIsLoading(false);
    });

    return () => {
      source.cancel();
      mounted = false;
    };
  }, []);

  return { isLoading, error, setError, doc, setDoc };
};

export default useGetDoc;
