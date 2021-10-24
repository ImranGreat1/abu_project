import classes from './PostDetail.module.css';
import { BsPerson, BsCalendar, BsClock } from 'react-icons/bs';
import IconWithText from '../../../UI/IconWithText/IconWithText';

const PostDetailHeader = ({ title, date, readTime, name }) => {
  return (
    <div>
      <h2 className={classes['post-detail__title']}>{title}</h2>
      <header className={classes['post-detail__header']}>
        <small className={classes['post-detail__icon']}>
          <IconWithText icon={<BsCalendar />} text={date} />
        </small>
        <small className={classes['post-detail__icon']}>
          <IconWithText icon={<BsClock />} text={`${readTime} min read`} />
        </small>
        <small className={classes['post-detail__author']}>By {name}</small>
      </header>
    </div>
  );
};

export default PostDetailHeader;
