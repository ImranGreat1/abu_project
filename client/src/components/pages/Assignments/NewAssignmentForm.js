import AssignmentForm from './AssignmentForm';
import sendRequest from '../../../utils/send-request';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import useCleanUp from '../../../hooks/use-clean-up';

const NewAssignmentForm = () => {
  const { mounted } = useCleanUp();
  const [error, setError] = useState(null);

  const source = axios.CancelToken.source();
  const history = useHistory();
  const token = useSelector((state) => state.auth.token);

  const assignmentSubmitHandler = async (formData) => {
    const responseData = await sendRequest(
      'http://localhost:3030/api/v1/assignments',
      {
        method: 'post',
        data: formData,
        cancelToken: source.token,
        headers: {
          Authorization: token,
        },
      }
    );

    // Handle success response
    if (responseData.status === 'success' && mounted) {
      // console.log(responseData.data.data.data);
      history.push('/assignments');
    }
    // Handler error response
    if (responseData.status === 'error' && mounted) {
      setError(responseData.data);
    }
  };

  const closeForm = () => {
    history.push('/assignments');
  };

  return (
    <>
      <AssignmentForm
        assignmentSubmitHandler={assignmentSubmitHandler}
        closeForm={closeForm}
      />
    </>
  );
};

export default NewAssignmentForm;
