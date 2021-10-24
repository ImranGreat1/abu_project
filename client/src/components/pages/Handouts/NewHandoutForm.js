import HandoutForm from './HandoutForm';
import sendRequest from '../../../utils/send-request';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

const NewHandoutForm = () => {
  const token = useSelector((state) => state.auth.token);
  const history = useHistory();

  const handoutFormSubmitHandler = async (formData) => {
    const responseData = await sendRequest(
      'http://localhost:3030/api/v1/handouts',
      {
        method: 'post',
        data: formData,
        headers: {
          Authorization: token,
        },
      }
    );

    // Success Response
    if (responseData.status === 'success') {
      history.push('/handouts');
      console.log(responseData.data);
    }

    // Fail Response
    if (responseData.status === 'error') {
      console.log(responseData.data);
    }
  };

  return <HandoutForm handoutFormSubmitHandler={handoutFormSubmitHandler} />;
};

export default NewHandoutForm;
