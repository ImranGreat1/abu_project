import classes from './Assignments.module.css';
import Assignment from './Assignment';
import { useState, useRef } from 'react';
import useFetchData from '../../../hooks/use-fetch-data';
import useInfiniteScroll from '../../../hooks/use-infinite-scroll';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import useLibraryFunctions from '../../../hooks/use-library-functions';
import ProtectedRoute from '../../Layout/ProtectedRoute/ProtectedRoute';
import useCleanUp from '../../../hooks/use-clean-up';
import Alert from '../../UI/Alert/Alert';
import { useSelector } from 'react-redux';

const Assignments = () => {
  const [pageNumber, setPageNumber] = useState(0);
  // To only update state when component is mounted
  let { mounted } = useCleanUp();

  // This is to not set a ref attribute to undefined
  const notLastAssignmentRef = useRef();

  const message = useSelector((state) => state.message);

  // Define any url params
  const urlParams = { limit: 6 };

  // Assignment data
  const {
    isLoading,
    error,
    docs: assignments,
    hasMore,
    userLibraryDocs: userLibraryAssignments,
  } = useFetchData(
    'http://localhost:3030/api/v1/assignments',
    urlParams,
    pageNumber,
    'assignments',
    mounted
  );

  // Library functions
  const { saveToLibrary, removeFromLibrary } =
    useLibraryFunctions('assignment');

  // page increment function
  const incrementPageNumber = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  // Infinite scroll logic hook
  const lastAssignmentRef = useInfiniteScroll(
    isLoading,
    hasMore,
    incrementPageNumber
  );

  let content;

  // Error state content
  if (error) {
    content = <h3>Something went wrong!</h3>;
  }

  // No assignments found content
  if (!isLoading && assignments && assignments.length === 0) {
    content = <h3>No Assignments Found!</h3>;
  }

  if (assignments && assignments.length !== 0 && userLibraryAssignments) {
    content = assignments.map((assignment, index) => {
      // Check if handout is in user library
      const found = userLibraryAssignments.find(
        (libAssignment) => libAssignment._id === assignment._id
      );

      const isLastElement = assignments.length === index + 1;

      return (
        <Assignment
          key={assignment._id}
          inLibrary={found}
          saveHandler={saveToLibrary}
          removeHandler={removeFromLibrary}
          assignmentData={assignment}
          ref={isLastElement ? lastAssignmentRef : notLastAssignmentRef}
        />
      );
    });
  }

  const showMessage = message.message && message.forPage === 'assignments';

  return (
    <ProtectedRoute page={{ name: 'Assignments', url: 'assignments' }}>
      <div className={classes.assignments}>
        <div className={classes.assignments__header}>
          <h3 className={classes['assignments__header-text']}>Assignments</h3>
        </div>
        {showMessage && <Alert message={message} />}
        <ul className={classes.assignments__list}>{content}</ul>
        {isLoading && (
          <p className={classes.assignments__loading}>
            <LoadingSpinner />
          </p>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default Assignments;
