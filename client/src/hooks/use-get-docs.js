import sendRequest from '../utils/send-request';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

const useGetDocs = (url, urlParams, pageNumber, config) => {
  let mounted = true;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [docs, setDocs] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const source = axios.CancelToken.source();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchDocs = async () => {
      const res = await sendRequest(url, {
        cancelToken: source.token,
        params: { page: pageNumber, ...urlParams },
        headers: {
          Authorization: token,
        },
      });

      return res;
    };

    fetchDocs().then((responseData) => {
      // Handle success response
      if (responseData.status === 'success' && mounted) {
        let newDocs;
        setDocs((prevDocs) => {
          newDocs = [...prevDocs, ...responseData.data.data.data];
          const newDocsIds = [...new Set(newDocs.map((doc) => doc._id))];

          newDocs = newDocsIds.map((id) => {
            const filteredDoc = newDocs.find((doc) => doc._id === id);
            return filteredDoc;
          });
          return newDocs;
        });
        setHasMore(responseData.data.data.totalDocs > newDocs.length);
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

  return { isLoading, error, docs, hasMore, setDocs };
};

export default useGetDocs;
