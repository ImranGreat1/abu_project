import classes from '../Assignments/Assignments.module.css';
import { useState, useEffect } from 'react';
import Assignment from '../Assignments/Assignment';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import useLibraryFunctions from '../../../hooks/use-library-functions';
import useGetDocs from '../../../hooks/use-get-docs';
import useCleanUp from '../../../hooks/use-clean-up';

// To stop state update when component unmount

const Assignments = () => {
  const { mounted } = useCleanUp();
  const [pageNumber, setPageNumber] = useState(0);

  const urlParams = { only: 'assignments' };
  const {
    isLoading,
    error,
    docs: assignments,
    setDocs: setAssignments,
  } = useGetDocs(
    'http://localhost:3030/api/v1/libraries',
    urlParams,
    pageNumber
  );

  const { removeFromLibrary } = useLibraryFunctions('assignment');

  // Remove handout to library handler
  const removeFromLibraryHandler = async (id) => {
    const removed = await removeFromLibrary(id);

    // Remove assignment from UI when removed successfully
    if (removed && mounted) {
      setAssignments((prevAssignment) => {
        return prevAssignment.filter((assignment) => assignment._id !== id);
      });
    }
    return true;
  };

  let content;

  if (!isLoading && error) {
    content = <h3>Something went wrong!</h3>;
  }

  if (!isLoading && assignments && assignments.length === 0) {
    content = <h3>No Assignments Found!</h3>;
  }

  if (assignments && assignments.length !== 0) {
    content = assignments.map((assignment) => {
      return (
        <Assignment
          key={assignment._id}
          assignmentData={assignment}
          inLibrary={true}
          removeHandler={removeFromLibraryHandler}
        />
      );
    });
  }

  return (
    <div className={classes.assignments}>
      <div className={classes.assignments__header}>
        <h3 className={classes['assignments__header-text']}>Assignments</h3>
      </div>
      <ul className={classes.assignments__list}>{content}</ul>
      {isLoading && (
        <p>
          <LoadingSpinner />
        </p>
      )}
    </div>
  );
};

export default Assignments;
