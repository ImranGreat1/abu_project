import { useState, useRef, useEffect, Fragment } from 'react';
import classes from './Login.module.css';
import Card from '../../UI/Card/Card';
import Modal from '../../UI/Modal/Modal';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';


const Login = props => {

  const [error, setError] = useState(null);
  const usernameRef = useRef();
  const passwordRef = useRef();

  const { login } = props;

  const formSubmitHandler = (event) => {
    
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    // Validate inputs
    // if (username.trim().length === 0 || password.trim().length === 0)
    // {
    //   setError({
    //     status: 'error', 
    //     title: 'Login Error',
    //     message: 'Please provide all fields!'
    //   });
    //   return;
    // }

    login(true);
  };

  useEffect(() => {
    // Persist loggin state on page reload
    if (localStorage.getItem('isLoggedIn') === '1')
    {
      login(true);
    }

  }, [login]); 

  // Input Options
  const passwordInputOption = {
    type:'password' ,
    id:'password',
    placeholder: 'Password'
  };

  const usernameInputOption = {
    type: "text", 
    id: "username",
    placeholder: 'Email or Phone Number'
  };

  return (
    <Fragment>
      { 
        error && 
        <Modal 
          status={error.status} 
          title={error.title} 
          message={error.message}
          onDismiss={() => setError(null)} 
        />  
      }
      <form onSubmit={formSubmitHandler} className={classes.form}>
        <Input 
          input={usernameInputOption}
          label="Username"
          className=""
          ref={usernameRef}
        />

        <Input 
          input={passwordInputOption}
          label="Password"
          className=""
          ref={passwordRef}
        />

        <Button type="submit" className={classes.form__btn} >
          Log In
        </Button>
      </form>
    </Fragment>
  );
};

export default Login;