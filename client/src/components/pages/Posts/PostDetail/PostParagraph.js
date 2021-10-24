import classes from './PostDetail.module.css';
import Paragraph from '../../../UI/Paragraph/Paragraph';

const PostParagraph = ({ text, image, subHeading }) => {
  return (
    <div className={classes.paragraph}>
      <div className={classes['paragraph__image-container']}>
        <img
          src={
            image && image.name
              ? `/images/paragraphs/${image.name}`
              : '/sample.jpg'
          }
          alt={
            image && image.description ? image.description : 'Paragraph Image'
          }
          className={classes.paragraph__image}
        />
      </div>
      {image && image.description ? (
        <p className={classes['paragraph__image-description']}>
          {image.description}
        </p>
      ) : (
        <p className={classes['paragraph__image-description']}>
          Image Description
        </p>
      )}

      {subHeading ? (
        <p className={classes.paragraph__title}>{subHeading}</p>
      ) : (
        <p className={classes.paragraph__title}>
          This is the title of my paragraph
        </p>
      )}

      <Paragraph className={`${classes.paragraph__text} mb-small`}>
        {text}
      </Paragraph>
    </div>
  );
};

export default PostParagraph;
