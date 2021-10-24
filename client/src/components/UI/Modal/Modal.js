import React, { Fragment } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onClose}></div>;
};

const ModalOverlay = (props) => {
  return (
    <div className={`${classes.overlay} ${props.className}`}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const Modal = ({ children, onClose, overlayClass }) => {
  const portalElement = document.getElementById('overlays');
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay className={overlayClass}>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
