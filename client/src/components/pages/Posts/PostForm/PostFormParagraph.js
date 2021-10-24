import { Fragment, useState } from 'react';
import { AiOutlineForm } from 'react-icons/ai';
import ButtonWithIcon from '../../../UI/ButtonWithIcon/ButtonWithIcon';
import classes from './PostForm.module.css';
import PostParagraph from '../PostDetail/PostParagraph';
import ParagraphForm from './ParagraphForm';
import sendRequest from '../../../../utils/send-request';
import { useHistory, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PostFormParagraph = ({ paragraph }) => {
  const [isOpen, setIsOpen] = useState(false);

  const token = useSelector((state) => state.auth.token);
  const slug = useParams().slug;
  const history = useHistory();

  const submitHandler = async (formData) => {
    const responseData = await sendRequest(
      `http://localhost:3030/api/v1/paragraphs/${slug}/${paragraph._id}`,
      {
        method: 'patch',
        data: formData,
        headers: {
          Authorization: token,
        },
      }
    );

    // Handle success response
    if (responseData.status === 'success') {
      history.push(`/news/${slug}`);
    }

    // Handle error response
    if (responseData.status === 'error') {
      console.log(responseData.data);
    }
  };

  const deleteParagraphHandler = async () => {
    const responseData = await sendRequest(
      `http://localhost:3030/api/v1/paragraphs/${slug}/${paragraph._id}`,
      {
        method: 'delete',
        headers: {
          Authorization: token,
        },
      }
    );
    // Handle success response
    if (responseData.status === 'success') {
      window.location.reload();
      history.push(`/news/${slug}/update`);
    }

    // Handle error response
    if (responseData.status === 'error') {
      history.push(`/news/${slug}/update`);
    }
  };

  return (
    <li className={classes.paragraph}>
      <PostParagraph
        image={paragraph.image}
        text={paragraph.text}
        subHeading={paragraph.subHeading}
      />
      {!isOpen && (
        <ButtonWithIcon
          onClick={() => setIsOpen(true)}
          Icon={AiOutlineForm}
          className="mb-small"
        >
          Edit Paragraph
        </ButtonWithIcon>
      )}
      {isOpen && (
        <ParagraphForm
          paragraphSubmitHandler={submitHandler}
          closeForm={() => setIsOpen(false)}
          type="update"
          paragraphData={paragraph}
          deleteHandler={deleteParagraphHandler}
        />
      )}
    </li>
  );
};

export default PostFormParagraph;
