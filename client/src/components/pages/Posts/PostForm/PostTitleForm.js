import { useState, useRef, Fragment } from 'react';
import classes from './PostForm.module.css';
import Button from '../../../UI/Button/Button';
import sendRequest from '../../../../utils/send-request';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
const PostTitleForm = () => {
  // Create tile
  // If title, show the the button to click to add show paragraph form
  // Paragraph form should include both text and image input
  // When we submit a paragraph the paragraph form should be close
  // When we are finally done we can the click done button to redirect us to post detail page
  const titleRef = useRef();
  const history = useHistory();

  const token = useSelector((state) => state.auth.token);

  const titleSubmitHandler = async (event) => {
    event.preventDefault();

    if (titleRef.current.value.trim() === '') {
      console.log('Invalid Input');
      return;
    }

    const responseData = await sendRequest(
      'http://localhost:3030/api/v1/posts',
      {
        method: 'post',
        data: JSON.stringify({ title: titleRef.current.value }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      }
    );

    if (responseData.status === 'success') {
      history.push(`/news/${responseData.data.data.data.slug}/create`);
    }

    if (responseData.status === 'error') {
      console.log(responseData.data);
    }
  };

  return (
    <Fragment>
      <form onSubmit={titleSubmitHandler} className={classes.form}>
        <div className={classes.form__group}>
          <label htmlFor="title" className={classes.form__label}>
            Title
          </label>
          <textarea
            id="title"
            ref={titleRef}
            className={classes.form__textarea}
          ></textarea>
        </div>
        <div className={classes.form__group}>
          <Button type="submit" className="text-upper">
            Create Title
          </Button>
        </div>
      </form>
    </Fragment>
  );
};

export default PostTitleForm;
