import React from 'react';
import classes from './Post.module.css';
import { BsCalendar, BsClock } from 'react-icons/bs';
import IconWithText from '../../../UI/IconWithText/IconWithText';
import { Link, useParams } from 'react-router-dom';

const Post = (props) => {
  return (
    <li className={classes.post}>
      <h3 className={classes.post__title}>
        <Link to={`/news/${props.slug}`} className={classes.post__link}>
          {props.title}
        </Link>
      </h3>
      {/* <p className={classes.post__content}>{props.content}</p> */}
      <div className={classes.post__footer}>
        <small className={classes.post__date}>
          <IconWithText
            icon={<BsCalendar />}
            text={props.date ? props.date : '14th Jul 2020'}
          />
        </small>
        <small className={classes['post__read-time']}>
          <IconWithText
            icon={<BsClock />}
            text={`${props.readTime} min read`}
          />
        </small>
      </div>
    </li>
  );
};

export default Post;
