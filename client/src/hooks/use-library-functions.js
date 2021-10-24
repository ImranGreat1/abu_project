import { useSelector } from 'react-redux';
import sendRequest from '../utils/send-request';
import axios from 'axios';

const useLibraryFunctions = (document) => {
  const token = useSelector((state) => state.auth.token);

  const saveSource = axios.CancelToken.source();
  const removeSource = axios.CancelToken.source();

  //  Save handout to library handler
  const saveToLibrary = async (id) => {
    // Construct Document Id field
    const data = {};
    data[`${document}Id`] = id;

    const responseData = await sendRequest(
      `http://localhost:3030/api/v1/${`${document}s`}/library/save`,
      {
        method: 'patch',
        data,
        headers: {
          Authorization: token,
        },
        cancelToken: saveSource.token,
      }
    );

    if (responseData.status === 'success') {
      return true;
    }

    if (responseData.status === 'error') {
      return false;
    }
  };

  // Remove handout to library handler
  const removeFromLibrary = async (id) => {
    // Construct Document Id field
    const data = {};
    data[`${document}Id`] = id;

    const responseData = await sendRequest(
      `http://localhost:3030/api/v1/${`${document}s`}/library/remove`,
      {
        method: 'patch',
        data,
        headers: {
          Authorization: token,
        },
        cancelToken: removeSource.token,
      }
    );

    if (responseData.status === 'success') {
      return true;
    }

    if (responseData.status === 'error') {
      console.log(responseData.data);
      return false;
    }
  };

  return { saveToLibrary, removeFromLibrary };
};

export default useLibraryFunctions;
