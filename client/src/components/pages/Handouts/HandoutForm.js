import classes from './Handouts.module.css';
import btnClasses from '../../UI/Button/Button.module.css';
import Button from '../../UI/Button/Button';
import { useRef, useState } from 'react';
import { AiOutlineForm } from 'react-icons/ai';
import ButtonWithIcon from '../../UI/ButtonWithIcon/ButtonWithIcon';

const HandoutForm = ({ handoutFormSubmitHandler, type, handoutData }) => {
  const check = type === 'update';

  const [courseCode, setCourseCode] = useState(
    check && handoutData.courseCode ? handoutData.courseCode : ''
  );
  const [title, setTitle] = useState(
    check && handoutData.title ? handoutData.title : ''
  );
  const [pdf, setPdf] = useState();
  const [pdfName, setPdfName] = useState(
    check && handoutData.pdf ? handoutData.pdf : ''
  );

  const realPdfRef = useRef();

  const courseCodeChangeHandler = ({ target }) => setCourseCode(target.value);
  const titleChangeHandler = ({ target }) => setTitle(target.value);
  const pdfChangeHandler = ({ target }) => {
    setPdf(target.files[0]);
    setPdfName(target.files[0].name);
  };

  // PDF Upload Handler
  const pdfUploadHandler = () => {
    realPdfRef.current.click();
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    const form = new FormData();
    form.append('courseCode', courseCode);
    form.append('title', title);
    form.append('pdf', pdf);

    handoutFormSubmitHandler(form);
  };

  return (
    <div className={classes['handout-form']}>
      <div className={classes['handout-form__header']}>
        <h2 className={classes['handour-form__header-text']}>Create Handout</h2>
      </div>
      <form onSubmit={formSubmitHandler} className={classes.form}>
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

        {/* TITLE */}
        <div className={classes.form__group}>
          <label htmlFor="title" className={classes.form__label}>
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={titleChangeHandler}
            className={classes.form__input}
          />
        </div>

        {/* PDF */}
        <div className={classes.form__group}>
          <input
            type="file"
            ref={realPdfRef}
            onChange={pdfChangeHandler}
            className={classes['real-file']}
          />
          <div className={classes['custom-file']}>
            <ButtonWithIcon
              Icon={AiOutlineForm}
              onClick={pdfUploadHandler}
              className="mr-small"
            >
              Upload Image
            </ButtonWithIcon>
            <span className={classes['custom-file__label']}>
              {pdfName ? pdfName : 'No File Uploaded!'}
            </span>
          </div>
        </div>

        <div className={classes.form__cta}>
          <Button className={btnClasses['btn-outline--primary']} type="submit">
            {type === 'update' ? 'Update Handout' : 'Create Handout'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HandoutForm;
