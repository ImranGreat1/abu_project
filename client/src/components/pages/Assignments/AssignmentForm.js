import classes from './Assignments.module.css';
import { useState, useRef } from 'react';
import { AiOutlineForm } from 'react-icons/ai';
import ButtonWithIcon from '../../UI/ButtonWithIcon/ButtonWithIcon';
import btnClasses from '../../UI/Button/Button.module.css';
import Button from '../../UI/Button/Button';
import ConfirmationModal from '../../UI/ConfirmationModal/ConfirmationModal';
// description, courseCode, submissionDate, toBeSubmittedTo, active, image

const AssignmentForm = ({
  closeForm,
  type,
  assignmentSubmitHandler,
  assignmentData,
  deleteHandler,
}) => {
  // Check the form type
  const checkType = (field, newValue = '') => {
    // For nested fields
    if (type === 'update' && field.split(' ').length > 1) {
      const [field1, field2] = field.split(' ');
      if (assignmentData[field1] && assignmentData[field1][field2]) {
        return assignmentData[field1][field2];
      }
      return [field2];
    }
    if (type === 'update' && assignmentData[field]) {
      return assignmentData[field];
    }
    return newValue;
  };

  const [courseCode, setCourseCode] = useState(checkType('courseCode'));
  const [description, setDescription] = useState(checkType('description'));
  const [submissionDate, setSubmissionDate] = useState(
    checkType('submissionDate')
  );
  const [active, setActive] = useState(checkType('active', 'active'));
  const [image, setImage] = useState();
  const [imageName, setImageName] = useState(checkType('image'));
  const [showModal, setShowModal] = useState(false);

  const realFileRef = useRef();

  // INPUT CHANGE HANDLERS
  const courseCodeChangeHandler = ({ target }) => setCourseCode(target.value);
  const descriptionChangeHandler = ({ target }) => setDescription(target.value);
  const submissionDateChangeHandler = ({ target }) => {
    setSubmissionDate(target.value.split('T')[0]);
  };
  const activeChangeHandler = ({ target }) => {
    setActive(target.value);
  };
  const imageChangeHandler = (event) => {
    const file = event.target.files[0];
    setImage(file);
    setImageName(file.name);
  };

  // Image Upload Handler
  const imageUploadHandler = () => {
    realFileRef.current.click();
  };

  // Form Submit Handler
  const formSubmitHandler = async (event) => {
    event.preventDefault();

    const form = new FormData();
    form.append('description', description);
    const isActive = active === 'active' ? true : false;
    form.append('active', isActive);
    form.append('submissionDate', submissionDate);
    form.append('courseCode', courseCode);
    if (image) form.append('image', image, imageName);

    assignmentSubmitHandler(form);
  };

  return (
    <div className={classes['assignment-form']}>
      <div className={classes['assignment-form__header']}>
        <h2 className={classes['assignment-form__header-text']}>
          {type === 'update' ? 'Update Assignment' : 'Create Assignment'}
        </h2>
      </div>
      <form className={classes.form} onSubmit={formSubmitHandler}>
        {/* COURSE CODE */}
        <div className={classes.form__group}>
          <label htmlFor="course-code" className={classes.form__label}>
            Course Code
          </label>
          <input
            type="text"
            id="course-code"
            value={courseCode}
            onChange={courseCodeChangeHandler}
            className={classes.form__input}
          />
        </div>

        {/* DESCRIPTION */}
        <div className={classes.form__group}>
          <label htmlFor="description" className={classes.form__label}>
            Description
          </label>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={descriptionChangeHandler}
            className={classes.form__description}
          ></textarea>
        </div>

        {/* TO BE SUBMITTED ON */}
        <div className={classes['form__inline-group']}>
          <div className={classes.form__group}>
            <label htmlFor="submission-date" className={classes.form__label}>
              To be submitted on:
            </label>
            <input
              type="date"
              id="submission-date"
              value={submissionDate}
              onChange={submissionDateChangeHandler}
              className={classes.form__input}
            />
          </div>

          {/* ACTIVE */}
          <div
            className={`${classes.form__group} ${classes['form__active-group']}`}
          >
            <label htmlFor="active" className={classes.form__label}>
              Active
            </label>
            <select
              onChange={activeChangeHandler}
              value={active}
              id="active"
              className={classes.form__active}
            >
              <option value={'active'}>Active</option>
              <option value={'inactive'}>Not Active</option>
            </select>
          </div>
        </div>

        {/* IMAGE UPLOAD INPUT */}
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

        {/* CTA BUTTONS */}
        <div className={classes.form__cta}>
          <Button
            className={`${btnClasses['btn-outline--primary']} mr-medium`}
            type="submit"
          >
            {type === 'update' ? 'Update Assignment' : 'Create Assignment'}
          </Button>
          <Button
            className={btnClasses['btn-outline--danger']}
            onClick={() => closeForm()}
          >
            Cancel
          </Button>
        </div>
        {type === 'update' && (
          <>
            <div className={classes.form__delete}>
              <Button
                className={btnClasses['btn--danger']}
                onClick={() => setShowModal(true)}
              >
                Delete
              </Button>
            </div>
            <ConfirmationModal
              closeModal={() => setShowModal(false)}
              confirmHandler={deleteHandler}
              header="Delete Assignment"
              description="This action cannot be reversed!"
              isOpen={showModal}
            />
          </>
        )}
      </form>
    </div>
  );
};

export default AssignmentForm;
