import React, { useState, useEffect } from 'react';
import classes from './Posts.module.css';
import Post from './Post/Post';
import { formatDate, calcuateReadTime } from '../../../utils';
import SearchInput from '../../UI/SearchInput/SearchInput';
import axios from 'axios';
import useGetDocs from '../../../hooks/use-get-docs';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';

const Posts = () => {
  let mounted = true;
  const [pageNumber, setPageNumber] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const urlParams = { limit: 4 };

  const {
    isLoading,
    error,
    docs: posts,
    hasMore,
  } = useGetDocs('http://localhost:3030/api/v1/posts', urlParams, pageNumber);

  const searchSource = axios.CancelToken.source();

  const searchSubmitHandler = async (event) => {
    // const responseData = await sendRequest(
    //   `http://localhost:3030/api/v1/posts?search=${searchValue}`,
    //   { cancelToken: searchSource.token }
    // );
    // // Handle success
    // if (responseData.status === 'success' && mounted) {
    //   setPosts(responseData.data.data.data);
    // }
    // // Handle error
    // if (responseData.status === 'error' && mounted) {
    //   setError(responseData.data);
    //   console.log(responseData.data);
    // }
    // // remove Loading state
    // if (mounted) setIsLoading(false);
  };

  const searchInputChangeHandler = (event) => {
    // setSearchValue(event.target.value);
    // searchSubmitHandler();
  };

  useEffect(() => {
    mounted = true;

    return () => {
      // Cancel request
      searchSource.cancel();
      mounted = false;
    };
  }, []);

  if (error) {
    return <h1>Something went wrong...</h1>;
  }

  if (!isLoading && posts && posts.length === 0) {
    return <h1>No post found!</h1>;
  }

  let renderedPosts;

  if (posts && posts.length !== 0) {
    renderedPosts = posts.map((post) => {
      const date = formatDate(new Date(post.createdAt));

      const readTime = calcuateReadTime(post.paragraphs);

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
    <section className={classes['section-posts']}>
      <header className={classes['section-posts__header']}>
        <ul className={classes['filter-links']}>
          <li className={classes['filter-links__item']}>
            <a
              href="#"
              className={`${classes['filter-links__link']} ${classes.current}`}
            >
              Department
            </a>
          </li>
          <li className={classes['filter-links__item']}>
            <a href="#" className={classes['filter-links__link']}>
              Faculty
            </a>
          </li>
          <li className={classes['filter-links__item']}>
            <a href="#" className={classes['filter-links__link']}>
              School
            </a>
          </li>
        </ul>
        <div className={classes['section-posts__search']}>
          <SearchInput
            inputChangeHandler={searchInputChangeHandler}
            searchDocuments={searchSubmitHandler}
            placeholder="Search Posts"
          />
        </div>
      </header>
      <ul className={classes.posts}>{renderedPosts}</ul>
      {isLoading && (
        <p className={classes.posts__loading}>
          <LoadingSpinner />
        </p>
      )}
    </section>
  );
};

export default Posts;
