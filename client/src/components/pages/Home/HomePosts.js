import React, { useState, useEffect, Fragment } from 'react';
import classes from '../Posts/Posts.module.css';
import axios from 'axios';
import Post from '../Posts/Post/Post';
import { formatDate, calcuateReadTime } from '../../../utils';
import DUMMY_POSTS from '../Posts/dummy-posts';
import { Link } from 'react-router-dom';
import sendRequest from '../../../utils/send-request';

const HomePosts = (props) => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // MOUNTED : to prevent component update on unmounted component
    let mounted = true;
    let source = axios.CancelToken.source();

    const fetchPost = async () => {
      const res = await sendRequest(
        'http://localhost:3030/api/v1/posts?limit=6',
        { cancelToken: source.token }
      );
      return res;
    };

    fetchPost().then((responseData) => {
      // Handle success response
      if (responseData.status === 'success' && mounted) {
        setPosts(responseData.data.data.data);
      }
      // Handle error response
      if (responseData.status === 'error' && mounted) {
        setError(responseData.data);
      }

      // Remove loading state
      if (mounted) setIsLoading(false);
    });

    return () => {
      source.cancel();
      mounted = false;
    };
  }, []);

  let content;

  if (isLoading) {
    content = <h2>Loading...</h2>;
  }

  if (!isLoading && error) {
    content = <h2>Something went wrong...</h2>;
  }

  if (!isLoading && !error && posts.length === 0) {
    content = <h2>No post found!</h2>;
  }

  if (!isLoading && !error && posts.length !== 0) {
    content = posts.map((post) => {
      const readTime = calcuateReadTime(post.paragraphs);

      const date = formatDate(new Date(post.createdAt));
      return (
        <Post
          title={post.title}
          date={date}
          slug={post.slug}
          key={post._id}
          author={post.user}
          readTime={readTime}
        />
      );
    });
  }

  return (
    <Fragment>
      <div className={classes.posts}>{content}</div>
      <div className={classes['read-more']}>
        <Link to="/news" className={classes['read-more__link']}>
          View more
          <span className={classes['read-more__arrow']}>&rarr;</span>
        </Link>
      </div>
    </Fragment>
  );
};

export default HomePosts;
