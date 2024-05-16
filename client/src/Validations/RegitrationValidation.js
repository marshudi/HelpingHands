import * as yup from 'yup';
export const RegistraitonValidation = yup.object().shape({
    username: yup.string()
    .required('username should not be empty'),

    email: yup.string()
    .required('Email should not be empty')
    .email('Email should be well formated'),
    
    password: yup.string()
    .required('Password Can not Be Empty')
    .min(6),
    

    confirmPassword: yup.string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
    
    // Confirm Password should match to each other

});


