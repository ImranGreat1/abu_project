import classes from './Assignments.module.css';
import InlineLink from '../../UI/InlineLink/InlineLink';
import btnClasses from '../../UI/Button/Button.module.css';
import { formatDate } from '../../../utils/index';
import { useState, forwardRef } from 'react';
import useCleanUp from '../../../hooks/use-clean-up';
import { alertMessage } from '../../../store/slices/message/message-action-creators';
import { useDispatch } from 'react-redux';

const Assignment = forwardRef((props, ref) => {
  const { courseCode, dateIssued, submissionDate, description, slug } =
    props.assignmentData;
  const [isLoading, setIsLoading] = useState(false);
  const [saved, setSaved] = useState(props.inLibrary);
  const { mounted } = useCleanUp();
  const dispatch = useDispatch();

  const assignmentId = props.assignmentData._id;

  //  Save handout to library handler
  const saveToLibrary = async () => {
    if (mounted) setIsLoading(true);
    const success = await props.saveHandler(assignmentId);

    if (success && mounted) {
      const message = {
        message: 'Added Assignment',
        description: 'Assignment has been added to your library',
        forPage: 'assignments',
      };
      dispatch(alertMessage(message));
      setSaved(true);
    }

    if (mounted) setIsLoading(false);
  };

  // Remove handout to library handler
  const removeFromLibrary = async () => {
    if (mounted) setIsLoading(true);
    const success = await props.removeHandler(assignmentId);

    if (success && mounted) {
      const message = {
        message: 'Removed Assignment',
        description: 'Assignment has been removed from your library',
        forPage: 'assignments',
      };
      dispatch(alertMessage(message));
      setSaved(false);
    }

    if (mounted) setIsLoading(false);
  };

  const btnStyle = `${btnClasses['btn']} ${btnClasses['btn--small']}`;

  const saveButton = (
    <button
      className={`${btnStyle} ${btnClasses['btn-outline--primary']}`}
      onClick={saveToLibrary}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Save to Library'}
    </button>
  );

  const removeButton = (
    <button
      className={`${btnStyle} ${btnClasses['btn--danger']}`}
      onClick={removeFromLibrary}
      disabled={isLoading}
    >
      {isLoading ? 'Loading...' : 'Remove from Library'}
    </button>
  );

  return (
    <li className={classes.assignment} ref={ref}>
      <div className={classes.assignment__header}>
        <span className={classes['assignment__course-code']}>{courseCode}</span>
        <span className={classes['assignment__date']}>
          {formatDate(new Date(dateIssued))}
        </span>
      </div>
      <p className={classes['assignment__submission']}>
        <span className={classes['assignment__submission-text']}>
          To be submitted on:
        </span>
        <span className={classes['assignment__submission-date']}>
          {submissionDate
            ? formatDate(new Date(submissionDate))
            : 'Not specified'}
        </span>
      </p>
      <p className={classes['assignment__desc']}>{description}</p>
      <div className={classes['assignment__cta']}>
        <InlineLink to={`assignments/${slug}`} className="btn-inline">
          view in details
        </InlineLink>
        {saved ? removeButton : saveButton}
      </div>
    </li>
  );
});

export default Assignment;
