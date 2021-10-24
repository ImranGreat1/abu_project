import classes from './Handouts.module.css';
import Handout from './Handout';
import { useState, useEffect, useRef } from 'react';
import SearchInput from '../../UI/SearchInput/SearchInput';
import sendRequest from '../../../utils/send-request';
import { useSelector } from 'react-redux';
import useFetchData from '../../../hooks/use-fetch-data';
import useInfiniteScroll from '../../../hooks/use-infinite-scroll';
import useLibraryFunctions from '../../../hooks/use-library-functions';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import ProtectedRoute from '../../Layout/ProtectedRoute/ProtectedRoute';
import useCleanUp from '../../../hooks/use-clean-up';
import Alert from '../../UI/Alert/Alert';
const Handouts = () => {
  let { mounted } = useCleanUp();

  const [pageNumber, setPageNumber] = useState(0);
  const [searchValue, setSearchValue] = useState('');

  const token = useSelector((state) => state.auth.token);
  const message = useSelector((state) => state.message);
  const showMessage = message.message && message.forPage === 'handouts';
  const notLastHandoutRef = useRef();

  const urlParams = { limit: 10 };

  const {
    isLoading,
    error,
    docs: handouts,
    hasMore,
    userLibraryDocs: userLibraryHandouts,
  } = useFetchData(
    'http://localhost:3030/api/v1/handouts',
    urlParams,
    pageNumber,
    'handouts',
    mounted
  );

  // Library functions
  const { saveToLibrary, removeFromLibrary } = useLibraryFunctions('handout');

  // page increment function
  const incrementPageNumber = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  // Infinite scroll logic hook
  const lastHandoutRef = useInfiniteScroll(
    isLoading,
    hasMore,
    incrementPageNumber
  );

  // Search input handler
  const searchInputChangeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  // Handout search handler
  const getSearchedHandouts = async () => {
    const responseData = await sendRequest(
      'http://localhost:3030/api/v1/handouts',
      {
        headers: {
          Authorization: token,
        },
        params: { q: searchValue },
      }
    );

    // Success response
    if (responseData.status === 'success' && mounted) {
      // setHandouts(responseData.data.data.data);
    }

    // Error or Fail Response
    if (responseData.status === 'error' && mounted) {
      console.log(responseData.data);
    }
  };

  const searchSubmitHandler = () => {
    getSearchedHandouts();
  };

  let content;

  // Error state content
  if (error) {
    content = <h3>Something went wrong!</h3>;
  }

  // No handouts found content
  if (!isLoading && handouts && handouts.length === 0) {
    content = <h3>No Handouts Found!</h3>;
  }

  // Handouts content
  if (!isLoading && handouts && handouts.length !== 0) {
    content = handouts.map((handout, index) => {
      // Check if handout is in user library
      const found = userLibraryHandouts.find(
        (libHandout) => libHandout._id === handout._id
      );

      const lastHandoutElement = handouts.length === index + 1;

      return (
        <Handout
          handout={handout}
          key={handout._id}
          inLibrary={!!found}
          removeHandler={removeFromLibrary}
          saveHandler={saveToLibrary}
          ref={lastHandoutElement ? lastHandoutRef : notLastHandoutRef}
        />
      );
    });
  }

  return (
    <ProtectedRoute page={{ name: 'Handouts', url: 'handouts' }}>
      <div className={classes.handouts}>
        <header className={classes.handouts__header}>
          <h1 className={classes['handouts__header-text']}>Handouts</h1>
          <div className={classes['handout__search']}>
            <SearchInput
              searchDocuments={searchSubmitHandler}
              inputChangeHandler={searchInputChangeHandler}
              placeholder="Search Handouts"
            />
          </div>
        </header>
        {showMessage && <Alert message={message} />}
        <ul className={classes.handouts__list}>{content}</ul>
        {isLoading && (
          <p className={classes.handouts__loading}>
            <LoadingSpinner />
          </p>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Handouts;
