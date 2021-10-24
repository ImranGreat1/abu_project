import HandoutForm from './HandoutForm';

const UpdateHandoutForm = () => {
  const dummyData = {
    courseCode: 'Cosc202',
    title: 'This is a test title',
    pdf: 'cosc202-dnd.pdf',
  };

  const handoutFormSubmitHandler = (formData) => {
    console.log(formData);
  };

  return (
    <HandoutForm
      handoutFormSubmitHandler={handoutFormSubmitHandler}
      type="update"
      handoutData={dummyData}
    />
  );
};

export default UpdateHandoutForm;
