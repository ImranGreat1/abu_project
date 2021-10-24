import { useEffect, useState } from 'react';
import classes from './PostDetail.module.css';
import Paragraph from '../../../UI/Paragraph/Paragraph';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { formatDate, calcuateReadTime } from '../../../../utils';
import sendRequest from '../../../../utils/send-request';
import PostDetailHeader from './PostDetailHeader';
import PostParagraph from './PostParagraph';

const PostDetail = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState(null);

  const { slug } = useParams();

  useEffect(() => {
    const source = axios.CancelToken.source();
    let mounted = true;

    const getPost = async () => {
      const res = sendRequest(`http://localhost:3030/api/v1/posts/${slug}`, {
        method: 'get',
        'Content-Type': 'application/json',
        cancelToken: source.token,
      });
      return res;
    };

    getPost().then((responseData) => {
      // Handle success
      if (responseData.status === 'success' && mounted) {
        setPost(responseData.data.data.data);

        // remove loading state
        setIsLoading(false);
      }

      // Handle error
      if (responseData.status === 'error' && mounted) {
        setError(responseData.data);
        // remove loading state
        setIsLoading(false);
      }
    });

    return () => {
      // Cancel all state change subscription and asynchronous rqeuest
      source.cancel();
      mounted = false;
    };
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Something went wrong...</p>;
  }

  if (!post) {
    return <h2>No Post Found!</h2>;
  }

  const date = formatDate(new Date(post.createdAt));
  const readTime = calcuateReadTime(post.paragraphs);

  return (
    <div className={classes['post-detail']}>
      <PostDetailHeader
        title={post.title}
        date={date}
        readTime={readTime}
        name={post.author.name}
      />
      <div className={classes['post-detail__paragraphs']}>
        {post.paragraphs.map((para) => {
          return (
            <PostParagraph key={para._id} text={para.text} image={para.image} />
          );
        })}
      </div>
    </div>
  );
};

// const PostDetail = (props) => {
//   const { slug } = useParams();

//   const post = DUMMY_POSTS.find((post) => post.slug === slug);
//   return (
//     <div className={classes['post-detail']}>
//       <h2 className={classes['post-detail__title']}>{post.title}</h2>
//       <header className={classes['post-detail__header']}>
//         <small className={classes['post-detail__icon']}>
//           <IconWithText
//             icon={<BsCalendar />}
//             // text={formatDate(new Date(post.createdAt))}
//             text={post.date}
//           />
//         </small>
//         <small className={classes['post-detail__icon']}>
//           <IconWithText icon={<BsClock />} text="1 min read" />
//         </small>
//         <small className={classes['post-detail__author']}>
//           By {post.author}
//         </small>
//       </header>
//       <div className={classes['post-detail__paragraph']}>
//         {paragraphs.length !== 0 &&
//           paragraphs.map((para, index) => {
//             return <Paragraph key={index}>{para}</Paragraph>;
//           })}
//       </div>
//     </div>
//   );
// };

export default PostDetail;
