import classes from './Assignments.module.css';
import sendRequest from '../../../utils/send-request';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../../utils/index';

const AssignmentDetail = () => {
  let mounted;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assignment, setAssignment] = useState(null);

  const token = useSelector((state) => state.auth.token);
  const slug = useParams().slug;

  useEffect(() => {
    const source = axios.CancelToken.source();
    mounted = true;

    const fetchAssignment = async () => {
      const res = await sendRequest(
        `http://localhost:3030/api/v1/assignments/${slug}`,
        {
          cancelToken: source.token,
          headers: {
            Authorization: token,
          },
        }
      );
      return res;
    };

    fetchAssignment().then((responseData) => {
      // Handle success response
      if (responseData.status === 'success' && mounted) {
        setAssignment(responseData.data.data.data);
      }

      // Handle error response
      if (responseData.status === 'error' && mounted) {
        setError(responseData.data);
      }

      if (mounted) setIsLoading(false);
    });

    // Clean up
    return () => {
      mounted = false;
      source.cancel();
    };
  }, []);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (!isLoading && error) {
    return <h3>Something went wrong!</h3>;
  }

  if (!isLoading && !assignment) {
    return <h3>No Assignment found with that slug!</h3>;
  }

  return (
    <div className={classes['assignment-detail']}>
      <div className={classes['assignment-detail__header']}>
        <p className={classes['assignment-detail__course-code']}>
          {assignment.courseCode.toUpperCase()}
        </p>
        <div className={classes['assignment-detail__info']}>
          <span className={classes['assignment-detail__sub-date']}>
            <span className={classes['assignment__submission-text']}>
              To be submitted on:
            </span>
            <span className={classes['assignment__submission-date']}>
              {assignment.submissionDate
                ? formatDate(new Date(assignment.submissionDate))
                : 'Not specified'}
            </span>
          </span>
          <span className={classes['assignment-detail__date']}>
            {formatDate(new Date(assignment.dateIssued))}
          </span>
        </div>
      </div>
      <p className={classes['assignment-detail__desc']}>
        {assignment.description}
      </p>
    </div>
  );
};

export default AssignmentDetail;
