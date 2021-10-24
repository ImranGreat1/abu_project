import axios from 'axios';

const sendRequest = async (url, config) => {
  let status;
  let data;

  try {
    const res = await axios({
      url,
      ...config,
    });

    if (res.data.status === 'success') {
      status = 'success';
      data = res.data;
    }
  } catch (error) {
    status = 'error';
    // If the error is thrown by axios cancelling the request
    if (axios.isCancel(error)) {
      // Do something else
      data = { error, message: 'Request Canceled!' };
    } else {
      if (error.response) {
        data = error.response.data.error;
      } else {
        data = { error, message: 'Something went wrong!' };
      }
    }
  }

  return { status, data };
};

export default sendRequest;
