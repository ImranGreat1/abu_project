import { useState } from 'react';
import sendRequest from '../../../../utils/send-request';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { alertMessage } from '../../../../store/slices/message/message-action-creators';
import useCleanUp from '../../../../hooks/use-clean-up';
import axios from 'axios';

const usePostForm = (slug, setPost, setError) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const history = useHistory();
  const dispatch = useDispatch();
  const deleteSource = axios.CancelToken.source();
  const getPostSource = axios.CancelToken.source();
  const paragraphSource = axios.CancelToken.source();

  const mounted = useCleanUp([deleteSource, getPostSource, paragraphSource]);

  // DELETE POST HANDLER
  const deletePostHandler = async () => {
    const responseData = await sendRequest(
      `http://localhost:3030/api/v1/posts/${slug}`,
      {
        method: 'delete',
        headers: {
          Authorization: token,
          cancelToken: deleteSource.token,
        },
      }
    );

    // Handle success response
    if (responseData.status === 'success' && mounted) {
      const message = {
        message: 'Post Deleted',
        description: 'This action cannot be reversed!',
        forPage: 'home',
      };
      dispatch(alertMessage(message));
      history.replace('/news');
    }

    // Handle error response
    if (responseData.status === 'error' && mounted) {
      setError(responseData.data);
    }
  };

  // GET POST HANDLER: When a new paragraph is created
  const getPost = async () => {
    const responseData = await sendRequest(
      `http://localhost:3030/api/v1/posslug}`,
      {
        cancelToken: getPostSource.token,
      }
    );

    if (responseData.status === 'success') {
      setPost(responseData.data.data.data);
      setIsOpen(false);
    }

    if (responseData.status === 'error') {
      console.log('Something went wrong getting post title');
      setError('Something went wrong getting post title');
    }
  };

  // PARAGRAPH SUBMIT HANDLER
  const paragraphSubmitHandler = async (formData) => {
    // Send Paragraph create request
    const responseData = await sendRequest(
      `http://localhost:3030/api/v1/paragraphs/${slug}`,
      {
        method: 'post',
        data: formData,
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
        cancelToken: paragraphSource.token,
      }
    );
    // Handle different response status
    if (responseData.status === 'success') {
      // Get post
      getPost();
    }

    if (responseData.status === 'error') {
      setError(responseData.data);
    }
  };

  return {
    isOpen,
    setIsOpen,
    showModal,
    setShowModal,
    deletePostHandler,
    paragraphSubmitHandler,
  };
};

export default usePostForm;
