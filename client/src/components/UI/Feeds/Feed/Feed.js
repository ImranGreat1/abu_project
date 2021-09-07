import React from 'react';
import classes from './Feed.module.css';
import { BsCalendar, BsClock } from 'react-icons/bs';
import IconWithText from '../../IconWithText/IconWithText';

const Feed = props => {
  return (
    <div className={classes.feed}>
      
      <h3 className={classes.feed__title}>
        <a href="#" className={classes.feed__link}>{props.title}</a>
      </h3>
      {/* <p className={classes.feed__content}>{props.content}</p> */}
      <div className={classes.feed__footer}>
        <small className={classes.feed__date}>
          <IconWithText icon={<BsCalendar />} text={props.date? props.date : '14th Jul 2020'}/>
        </small>
        <small className={classes["feed__read-time"]}>
          <IconWithText icon={<BsClock />} text={props.readTime? props.readTime : '3 min read'}/>
        </small>
      </div>
    </div>
  );
}

export default Feed;