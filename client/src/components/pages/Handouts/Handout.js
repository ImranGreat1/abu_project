import classes from './Handouts.module.css';
import { useState, useEffect, forwardRef } from 'react';
import btnClasses from '../../UI/Button/Button.module.css';
import { useDispatch } from 'react-redux';
import { alertMessage } from '../../../store/slices/message/message-action-creators';
import useCleanUp from '../../../hooks/use-clean-up';

const Handout = forwardRef(
  ({ handout, inLibrary, saveHandler, removeHandler }, ref) => {
    const [isLoading, setIsLoading] = useState(false);
    const [saved, setSaved] = useState(inLibrary);
    const dispatch = useDispatch();
    const { mounted } = useCleanUp();

    const message = {
      forPage: 'handouts',
    };

    //  Save handout to library handler
    const saveToLibrary = async () => {
      setIsLoading(true);
      const success = await saveHandler(handout._id);

      if (success && mounted) {
        message.message = 'Added Handout';
        message.description = 'Handout has been added to your library';
        dispatch(alertMessage(message));
        setSaved(true);
      }

      if (mounted) setIsLoading(false);
    };

    // Remove handout to library handler
    const removeFromLibrary = async () => {
      const success = await removeHandler(handout._id);

      if (success && mounted) {
        message.message = 'Removed Handout';
        message.description = 'Handout has been removed from your library';
        dispatch(alertMessage(message));
        setSaved(false);
      }

      if (mounted) setIsLoading(false);
    };

    const btnStyle = `${btnClasses['btn']} ${btnClasses['btn-outline--primary']} ${btnClasses['btn--small']}`;

    const libraryActionBtn = !saved ? (
      <button
        className={`${btnStyle} mr-small`}
        onClick={saveToLibrary}
        disabled={isLoading}
      >
        {!isLoading ? 'Save to Library' : 'Loading...'}
      </button>
    ) : (
      <button
        className={`${btnClasses['btn']} mr-small ${btnClasses['btn--danger']} ${btnClasses['btn--small']}`}
        onClick={removeFromLibrary}
        disabled={isLoading}
      >
        {!isLoading ? 'Remove from Library' : 'Loading...'}
      </button>
    );

    return (
      <li className={classes.handout} ref={ref}>
        <p
          className={classes['handout__course-code']}
        >{`${handout.courseCode}`}</p>
        <div>
          <p className={classes.handout__title}>{handout.title}</p>
          <div className={classes['call-to-actions']}>
            <a
              className={`${btnStyle} mr-small`}
              href={`/pdfs/handouts/${handout.pdf}`}
              target="_blank"
            >
              Read
            </a>
            {libraryActionBtn}
            <a
              className={btnStyle}
              href={`/pdfs/handouts/${handout.pdf}`}
              target="_blank"
              download={true}
            >
              Download
            </a>
          </div>
        </div>
      </li>
    );
  }
);

export default Handout;
