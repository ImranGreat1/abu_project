import classes from './LoadingSpinner.module.css';
import { BeatLoader } from 'react-spinners';
import { css } from '@emotion/react';

const LoadingSpinner = (props) => {
  // Loading spinner css
  const loaderCSS = css``;

  return (
    <span className={`${classes['loading-spinner']} ${props.className}`}>
      <BeatLoader color="green" css={loaderCSS} />
    </span>
  );
};

export default LoadingSpinner;
