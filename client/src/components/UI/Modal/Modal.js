import React, { Fragment } from 'react';
import classes from './Modal.module.css';
import ReactDOM from 'react-dom';

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}


const ModalOverlay = props => {
    return (
        <div className={`${classes.overlay} ${props.className}`}>
            <div className={classes.content}>
                { props.children }
            </div>
        </div>
    );
}

const Modal = ({ children, onClose }) => {
    const portalElement = document.getElementById('overlays');
    return (
        <Fragment>
            { ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement) }
            { ReactDOM.createPortal(
                <ModalOverlay>{children}</ModalOverlay>,
                portalElement
            )}
        </Fragment>
    );
}


export default Modal;