import { useState, useRef } from 'react';
import Button from '../../../UI/Button/Button';
import ButtonWithIcon from '../../../UI/ButtonWithIcon/ButtonWithIcon';
import btnClasses from '../../../UI/Button/Button.module.css';
import classes from './PostForm.module.css';
import { AiOutlineForm } from 'react-icons/ai';
import ConfirmationModal from '../../../UI/ConfirmationModal/ConfirmationModal';

const ParagraphForm = ({
  paragraphSubmitHandler,
  closeForm,
  type,
  paragraphData,
  deleteHandler,
}) => {
  const check = type === 'update';

  const [image, setImage] = useState();
  const [imageName, setImageName] = useState(
    check && paragraphData.image ? paragraphData.image.name : ''
  );
  const [imageDescription, setImageDescription] = useState(
    check && paragraphData.image ? paragraphData.image.description : ''
  );
  const [paragraph, setParagraph] = useState(
    check && paragraphData.text ? paragraphData.text : ''
  );
  const [subHeading, setSubHeading] = useState(
    check && paragraphData.subHeading ? paragraphData.subHeading : ''
  );

  const [showModal, setShowModal] = useState(false);

  const realFileRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const form = new FormData();
    // It is best practice to attach the file last because there might be some problem if it is not
    form.append('text', paragraph);
    if (image) form.append('image', image);
    if (imageDescription) form.append('imageDescription', imageDescription);
    if (subHeading) form.append('subHeading', subHeading);

    paragraphSubmitHandler(form);
  };

  // Image change handler
  const imageChangeHandler = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  // Paragraph Text change handler
  const paragraphChangeHandler = (event) => {
    const { value } = event.target;
    setParagraph(value);
  };

  // Image Upload Handler
  const imageUploadHandler = () => {
    realFileRef.current.click();
  };

  // Image Description change handler
  const imageDescriptionHandler = (event) => {
    setImageDescription(event.target.value);
  };

  // Sub-Heading change handler
  const subHeadingHandler = (event) => setSubHeading(event.target.value);

  return (
    <>
      <form onSubmit={submitHandler} className={classes.form}>
        <div className={classes.form__group}>
          <input
            type="file"
            id="image"
            ref={realFileRef}
            onChange={imageChangeHandler}
            className={classes['real-file']}
          />
          <div className={classes['custom-file']}>
            <ButtonWithIcon
              Icon={AiOutlineForm}
              onClick={imageUploadHandler}
              className="mr-small"
            >
              Upload Image
            </ButtonWithIcon>
            <span className={classes['custom-file__label']}>
              {imageName ? imageName : 'No File Uploaded!'}
            </span>
          </div>
        </div>

        <div className={classes.form__group}>
          <label htmlFor="image-description" className={classes.form__label}>
            Image Description
          </label>
          <input
            type="text"
            id="image-description"
            className={classes['form__image-description']}
            value={imageDescription}
            onChange={imageDescriptionHandler}
          />
        </div>

        <div className={classes.form__group}>
          <label htmlFor="sub-heading" className={classes.form__label}>
            Heading
          </label>
          <input
            type="text"
            id="sub-heading"
            className={classes.form__heading}
            value={subHeading}
            onChange={subHeadingHandler}
          />
        </div>
        <div className={classes.form__group}>
          <label htmlFor="paragraph" className={classes.form__label}>
            New Paragraph
          </label>
          <textarea
            id="paragraph"
            className={classes.form__paragraph}
            onChange={paragraphChangeHandler}
            value={paragraph}
          ></textarea>
        </div>
        <div className={classes.form__cta}>
          <Button className="mr-medium" type="submit">
            {type === 'update' ? 'Update Paragraph' : 'Create Paragraph'}
          </Button>
          <Button
            className={btnClasses['btn-outline--danger']}
            onClick={() => closeForm(false)}
          >
            Cancel
          </Button>
          {type === 'update' && !showModal && (
            <div className={classes.form__delete}>
              <Button
                className={btnClasses['btn--danger']}
                onClick={() => setShowModal(true)}
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </form>
      <ConfirmationModal
        header="Delete Paragraph"
        description="Are you sure you want to delete paragraph?"
        confirmHandler={deleteHandler}
        closeModal={() => setShowModal(false)}
        isOpen={showModal}
      />
    </>
  );
};

export default ParagraphForm;
