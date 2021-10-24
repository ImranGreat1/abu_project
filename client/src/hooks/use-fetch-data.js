import axios from 'axios';
import { useState, useEffect } from 'react';
import sendRequest from '../utils/send-request';
import { useSelector } from 'react-redux';

const useFetchData = (url, urlParams, pageNumber, documentType, mounted) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [docs, setDocs] = useState([]);
  const [userLibraryDocs, setUserLibraryDocs] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    setIsLoading(true);
    const documentsSource = axios.CancelToken.source();
    const librarySource = axios.CancelToken.source();

    // Get user library
    const getUserLibraryDocs = async () => {
      const res = await sendRequest('http://localhost:3030/api/v1/libraries', {
        headers: {
          Authorization: token,
        },
        cancelToken: librarySource.token,
        params: { only: documentType },
      });
      return res;
    };

    const fetchDocs = async () => {
      const res = await sendRequest(url, {
        cancelToken: documentsSource.token,
        headers: {
          Authorization: token,
        },
        params: { page: pageNumber, ...urlParams },
      });
      return res;
    };

    // Get user library
    getUserLibraryDocs().then((libraryResponse) => {
      // Success response
      if (libraryResponse.status === 'success' && mounted) {
        // FETCH ASSIGNMENT AFTER FETCHING USER LIBRARY
        fetchDocs().then((docs) => {
          // Handle success response
          if (docs.status === 'success' && mounted) {
            setUserLibraryDocs(libraryResponse.data.data.data);
            let newDocs;
            setDocs((prevDocs) => {
              newDocs = [...prevDocs, ...docs.data.data.data];
              const newDocsIds = [...new Set(newDocs.map((doc) => doc._id))];
              newDocs = newDocsIds.map((id) => {
                const filteredDoc = newDocs.find((doc) => doc._id === id);
                return filteredDoc;
              });
              return newDocs;
            });
            setHasMore(docs.data.data.totalDocs > newDocs.length);
          }

          // Handle error response
          if (docs.status === 'error' && mounted) {
            setError(docs.data);
          }
          // Remove loading state
          if (mounted) setIsLoading(false);
        });
      }

      // Handle error response
      if (libraryResponse.status === 'error' && mounted) {
        setError(libraryResponse.data);
        console.log(libraryResponse.data);
      }
    });

    // Clean Up
    return () => {
      mounted = false;
      documentsSource.cancel();
      librarySource.cancel();
    };
  }, [pageNumber]);

  return { isLoading, error, docs, hasMore, userLibraryDocs };
};

export default useFetchData;
