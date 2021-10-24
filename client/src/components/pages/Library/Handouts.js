import { useState } from 'react';
import Handout from '../Handouts/Handout';
import classes from './Library.module.css';
import LoadingSpinner from '../../UI/LoadingSpinner/LoadingSpinner';
import useLibraryFunctions from '../../../hooks/use-library-functions';
import useGetDocs from '../../../hooks/use-get-docs';
import useCleanUp from '../../../hooks/use-clean-up';

const Handouts = () => {
  let { mounted } = useCleanUp();
  const [pageNumber, setPageNumber] = useState(0);

  const urlParams = { only: 'handouts' };
  const {
    isLoading,
    error,
    docs: handouts,
    setDocs: setHandouts,
  } = useGetDocs(
    'http://localhost:3030/api/v1/libraries',
    urlParams,
    pageNumber
  );

  const { removeFromLibrary } = useLibraryFunctions('handout');

  const removeFromLibraryHandler = async (id) => {
    const removed = await removeFromLibrary(id);
    // Update the UI if successful
    if (removed && mounted) {
      setHandouts((prevHandouts) => {
        return prevHandouts.filter((handout) => handout._id !== id);
      });
    }
    return removed;
  };

  let content;

  if (!isLoading && error) {
    const errorMessage =
      error.isOperational && error.message
        ? error.message
        : 'Something went wrong!';
    content = <h2>{errorMessage}</h2>;
  }

  if (!isLoading && handouts.length === 0) {
    content = <h2>You haven't save any handout</h2>;
  }

  if (handouts && handouts.length !== 0) {
    content = handouts.map((handout) => {
      return (
        <Handout
          handout={handout}
          key={handout._id}
          inLibrary={true}
          removeHandler={removeFromLibraryHandler}
        />
      );
    });
  }

  return (
    <div className={classes.handouts}>
      <p className={classes['handouts__header-text']}>Handouts</p>
      <ul className={classes.handouts__list}>{content}</ul>
      {isLoading && (
        <p className="mb-medium">
          <LoadingSpinner />
        </p>
      )}
    </div>
  );
};

export default Handouts;
