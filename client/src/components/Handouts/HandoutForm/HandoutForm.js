import React, { useState, useRef, Fragment } from 'react';
import classes from './HandoutForm.module.css';
// import Card from '../../UI/Card/Card';
import Modal from '../../UI/Modal/Modal';

const HandoutForm = props => {

    const titleRef = useRef();
    const courseCodeRef = useRef();
    const [pdf, setPdf] = useState(null);
    const [error, setError] = useState(null);
    

    const pdfChangeHandler = event => {
        // console.log(Array.from(event.target.files));
        if (event.target.files.length === 0) {
            return;
        }
        // console.log('Changed');
        setPdf({ name: event.target.files[0].name });
    }

    const formSubmitHandler = event => {
        event.preventDefault();

        // Check if both title and courseCode are provided
        if (
            titleRef.current.value.trim().length === 0 || 
            courseCodeRef.current.value.trim().length === 0
            ) 
        {
            setError({
                title: 'Something went wrong', 
                message: 'Please provide all fields!'
            })
            return;
        }
        
        const data = {
            title: titleRef.current.value, 
            courseCode: courseCodeRef.current.value, 
            pdf 
        };

        props.addHandout(data);
        // Clear inputs. Use ref to manipulate the DOM only with input elements
        titleRef.current.value = '';
        courseCodeRef.current.value = '';
        setPdf(null);
    }

    let errorModal;
    if (error) {
        errorModal = (
            <Modal onClose={() => setError(null)}>
                <h3>{error.title}</h3>
                <p>{error.message}</p>
                <button onClick={() => setError(null)}>Okay</button>
            </Modal>
        );
    }

    return (
        <React.Fragment>
            {/* Error Modal Component */}
            {errorModal}
        
            <form className={classes.form} onSubmit={formSubmitHandler}>
                <div className={classes.form__group}>
                    <label htmlFor="title" className={classes.form__label}>Title</label>
                    <input 
                        type="text" 
                        id="title" 
                        ref={titleRef}
                        className={classes.form__input} 
                    />
                </div>
                <div className={classes.form__group}>
                    <label htmlFor="course code" className={classes.form__label}>Course Code</label>
                    <input
                        type="text" 
                        id="course code"
                        ref={courseCodeRef}
                        className={classes.form__input}
                    />
                </div>
                <div className={classes.form__group}>
                    <label htmlFor="pdf" className={classes['form__file-label']}>{ pdf ? 'Change PDF' : 'Select PDF' }</label>
                    <input type="file" id="pdf" className={classes['form__file-input']} onChange={pdfChangeHandler}/>
                    { pdf && <small className={classes['form__file-name']}>{pdf.name}</small> }
                </div>
                <div className={classes.form__group}>
                    <button type='submit' className={classes['form__submit-btn']}>Upload PDF</button>
                </div>
            </form>
        </React.Fragment>
    );
}

export default HandoutForm;