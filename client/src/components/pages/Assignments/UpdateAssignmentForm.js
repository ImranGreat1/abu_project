import AssignmentForm from './AssignmentForm';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import sendRequest from '../../../utils/send-request';
import useGetDoc from '../../../hooks/use-get-doc';

const UpdateAssignmentForm = () => {
  const history = useHistory();
  const slug = useParams().slug;
  let mounted;

  const {
    isLoading,
    error,
    setError,
    doc: assignment,
  } = useGetDoc(`http://localhost:3030/api/v1/assignments/${slug}`);

  const token = useSelector((state) => state.auth.token);
  // Close update form
  const closeForm = () => {
    history.push(`/assignments/${assignment.slug}`);
  };

  // Assignment delete handler
  const assignmentDeleteHandler = async () => {
    const responseData = await sendRequest(
      `http://localhost:3030/api/v1/assignments/${assignment.slug}`,
      {
        method: 'delete',
        headers: {
          Authorization: token,
        },
      }
    );
    // Handle success response
    if (responseData.status === 'success') {
      history.push('/assignments');
    }
    // Handle error response
    if (responseData.status === 'error') {
      setError(responseData.data);
    }
  };

  // update source
  const updateSource = axios.CancelToken.source();

  // assignment update handler
  const assignmentSubmitHandler = async (formData) => {
    const responseData = await sendRequest(
      `http://localhost:3030/api/v1/assignments/${slug}`,
      {
        method: 'patch',
        data: formData,
        cancelToken: updateSource.token,
        headers: {
          Authorization: token,
        },
      }
    );

    if (responseData.status === 'success' && mounted) {
      history.push(`/assignments/${slug}`);
    }

    if (responseData.status === 'error' && mounted) {
      setError(responseData.data);
      return false;
    }
  };

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (!isLoading && error) {
    return <h2>Something went wrong!</h2>;
  }

  if (!isLoading && !assignment) {
    return <h2>No post found with that slug to edit</h2>;
  }

  return (
    <AssignmentForm
      assignmentSubmitHandler={assignmentSubmitHandler}
      closeForm={closeForm}
      type="update"
      assignmentData={assignment}
      deleteHandler={assignmentDeleteHandler}
    />
  );
};

export default UpdateAssignmentForm;
