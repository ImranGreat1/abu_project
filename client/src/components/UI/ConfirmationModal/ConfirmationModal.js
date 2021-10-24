import { useState } from 'react';
import Modal from '../Modal/Modal';
import classes from './ConfirmationModal.module.css';
import Button from '../Button/Button';
import btnClasses from '../Button/Button.module.css';
import { AiOutlineDelete } from 'react-icons/ai';

const ConfirmationModal = ({
  header,
  description,
  actionBtnText,
  cancelBtnText,
  isOpen,
  closeModal,
  confirmHandler,
  overlayClass,
}) => {
  const modalConfirmHandler = async () => {
    await confirmHandler();
    closeModal();
  };

  return (
    <>
      {isOpen && (
        <Modal
          onClose={() => closeModal()}
          overlayClass={overlayClass ? overlayClass : classes.overlay}
        >
          <div className={classes.confirmation}>
            <div className={classes['confirmation__icon-wrapper']}>
              <i className={classes['confirmation__icon']}>
                <AiOutlineDelete
                  className={classes['confirmation__icon-svg']}
                />
              </i>
            </div>
            <p className={classes.confirmation__action}>{header}</p>
            <p className={classes.confirmation__text}>{description}</p>
            <div className={classes.confirmation__cta}>
              <Button
                onClick={() => closeModal()}
                className={`${btnClasses['btn-outline--primary']} ${btnClasses['no-hover']} mr-small`}
              >
                {cancelBtnText ? cancelBtnText : 'Cancel'}
              </Button>
              <Button
                onClick={modalConfirmHandler}
                className={`${btnClasses['btn--danger']} `}
              >
                {actionBtnText ? actionBtnText : 'Delete'}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ConfirmationModal;
