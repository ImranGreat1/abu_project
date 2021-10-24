import { useEffect } from 'react';
import classes from './Alert.module.css';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';

const Alert = ({ message }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const messageTime = setTimeout(() => {
      setIsOpen(false);
    }, 5000);

    return () => {
      clearTimeout(messageTime);
    };
  }, []);

  if (!isOpen) return null;

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
        <i
          className={classes.notification__close}
          onClick={() => setIsOpen(false)}
        >
          <AiOutlineClose />
        </i>
      </span>
    </span>
  );
};

export default Alert;
