import * as yup from 'yup'; 

//create schema
export const LoginValid=yup.object().shape({
    //required check if empty or not 
    username: yup.string() .required("username cannot be empty"), 
    password: yup.string() .required("Password cannot be empty") .min(6),
});