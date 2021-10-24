import ParagraphForm from './ParagraphForm';

const NewParagraphForm = ({ paragraphSubmitHandler, closeForm }) => {
  return (
    <ParagraphForm
      paragraphSubmitHandler={paragraphSubmitHandler}
      closeForm={closeForm}
    />
  );
};

export default NewParagraphForm;
