import classes from './PostForm.module.css';
import btnClasses from '../../../UI/ButtonWithIcon/ButtonWithIcon.module.css';
import { useParams } from 'react-router-dom';
import PostFormParagraph from './PostFormParagraph';
import NewParagraphForm from './NewParagraphForm';
import PostDetailHeader from '../PostDetail/PostDetailHeader';
import { formatDate, calcuateReadTime } from '../../../../utils/index';
import ButtonWithIcon from '../../../UI/ButtonWithIcon/ButtonWithIcon';
import { AiOutlinePlus } from 'react-icons/ai';
import Button from '../../../UI/Button/Button';
import normalButtonClasses from '../../../UI/Button/Button.module.css';
import ConfirmationModal from '../../../UI/ConfirmationModal/ConfirmationModal';
import useGetDoc from '../../../../hooks/use-get-doc';
import usePostForm from './use-post-form';

const PostForm = () => {
  const slug = useParams().slug;
  const {
    isLoading,
    error,
    setError,
    doc: post,
    setDoc: setPost,
  } = useGetDoc(`http://localhost:3030/api/v1/posts/${slug}`);

  const {
    isOpen,
    setIsOpen,
    showModal,
    setShowModal,
    deletePostHandler,
    paragraphSubmitHandler,
  } = usePostForm(slug, setPost, setError);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!post) {
    return <h1>Could not find post</h1>;
  }

  const date = formatDate(new Date(post.createdAt));
  const readTime = calcuateReadTime(post.paragraphs);

  return (
    <div className={classes['post-form']}>
      {!isLoading && post && (
        <PostDetailHeader
          title={post.title}
          date={date}
          readTime={readTime}
          name={post.author.name}
        />
      )}
      <ul className={classes['post-form__paragraph-list']}>
        {!isLoading &&
          post &&
          post.paragraphs.length !== 0 &&
          post.paragraphs.map((para) => (
            <PostFormParagraph key={para._id} paragraph={para} />
          ))}
      </ul>
      {isLoading && <h1>Loading...</h1>}

      {!isOpen && (
        <div className={classes['post-form__main-action']}>
          <ButtonWithIcon
            className={btnClasses['btn-with-icon-outline--primary']}
            Icon={AiOutlinePlus}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add Paragraph
          </ButtonWithIcon>
          <Button
            className={`${normalButtonClasses['btn--danger']} ml-auto`}
            onClick={() => setShowModal(true)}
          >
            Delete Post
          </Button>
        </div>
      )}
      {isOpen && (
        <div>
          <NewParagraphForm
            paragraphSubmitHandler={paragraphSubmitHandler}
            closeForm={() => setIsOpen(false)}
          />
        </div>
      )}
      {showModal && (
        <ConfirmationModal
          isOpen={showModal}
          header="Delete Post"
          description="Are you sure you wannt to delete this post?"
          closeModal={() => setShowModal(false)}
          confirmHandler={deletePostHandler}
        />
      )}
    </div>
  );
};

export default PostForm;
