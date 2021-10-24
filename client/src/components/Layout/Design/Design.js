import { useState, useEffect } from 'react';
import classes from './Design.module.css';
import Button from '../../UI/Button/Button';
import btnClasses from '../../UI/Button/Button.module.css';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

const Design = ({ message, closeAlert }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const messageTime = setTimeout(() => {
      closeAlert(false);
    }, 5000);

    return () => {
      clearTimeout(messageTime);
    };
  }, []);

  return (
    <span className={classes.notification}>
      <i className={classes.notification__icon}>
        <AiOutlineCheck />
      </i>
      <span className={classes.notification__content}>
        <p className={classes.notification__header}>{message.message}</p>
        <p className={classes.notification__description}>
          {message.description && message.description}
        </p>
        <i className={classes.notification__close} onClick={() => closeAlert()}>
          <AiOutlineClose />
        </i>
      </span>
    </span>
  );
};

export default Design;
