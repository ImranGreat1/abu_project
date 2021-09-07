export const INITIAL_STATE = {
  email: '',
  password: '',
  isValidEmail: null,
  isValidPassword: null,
  showEmailErrorMessage: false,
  showPasswordErrorMessage: false,
};

export const reducer = (state, action) => {
  switch(action.type)
  {
    case 'EMAIL_CHANGED':
      return  {
              ...state, 
              email: action.payload,
              showEmailErrorMessage: false
              };
    case 'PASSWORD_CHANGED':
      return { 
              ...state,
              password: action.payload,
              showPasswordErrorMessage: false,
             };
    case 'EMAIL_IS_VALID':
      return { ...state, isValidEmail: action.payload.includes('@') }
    case 'PASSWORD_IS_VALID':
      return { ...state, isValidPassword: action.payload.length > 7 }
    case 'EMAIL_BLURED':
      return { ...state,  isValidEmail: state.email.includes('@') };
    case 'PASSWORD_BLURED':
      return { ...state,  isValidPassword: state.password.length > 7 };
    case 'FORM_VALIDATION':
      return { ...state, isValidForm: action.payload };
    case 'ERROR_MESSAGE':
      return { 
              ...state, 
              showEmailErrorMessage: !state.email.includes('@'), 
              showPasswordErrorMessage: !(state.password.length > 7)
            };
  }
  // Return initial state when a case doesn't match
  return INITIAL_STATE;
}
