import { useSelector, useDispatch } from "react-redux";
import { deleteUser, registerUser, updateUser } from "../Features/UserSlice";
import { useEffect,useState } from "react";
import { userSchemaValidation } from "../Validations/UserValidation";

import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import Logo from "../assets/logo.png";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link,useNavigate } from "react-router-dom";

const Register = () => {
  const userList = useSelector((state) => state.users.value);
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const dispatch = useDispatch(); //every time we want to call an action, make an action happen
  const navigate = useNavigate(); //declares a constant variable named navigate and assigns it the value returned by the useNavigate() hook.
 
  const isSuccess=useSelector((state)=>state.users.isSuccessReg);
  const isError=useSelector((state)=>state.users.isErrorReg);


  //For form validation using react-hook-form


  const {
    register,
    handleSubmit: submitForm, //submitForm will be called when the form is submitted
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchemaValidation), //Associate your Yup validation schema using the resolver
  });

  useEffect(()=>{
    if(isSuccess){
        alert("Register Successfully..");
        navigate("/login");

    }
    if(isError || alert=="Registration failed"){
        alert("Invalid Register..");
        navigate("/registration")
    }
},[userList, isSuccess, isError]); //automatic function


  const handleSubmit = (data) => {
    const userData={
      username:username,
      email:email,
      pass:password,
      pic:"https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
      isAdmin:false,
      date:new Date().toLocaleDateString()
  }
  console.log(userData);
  dispatch(registerUser(userData))
  
      };

    return (
    <Container fluid>
      <Row className="form-row">
        <Col className="column" lg="6">
          <form className="div-form">
            <div style={{textAlign:"center"}}>
            <p className="headingForm">Register to Helping Hands</p>
                            <p className="sloginForm">Fastest Way to Get Things Done.</p>
            </div>
            <section className="form">
            <Label for="username" className="smalltext">
                            username
            </Label>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your username"
                  //register this input to the react-hook
                  {...register("username", {
                    value: username,
                    onChange: (e) => setUsername(e.target.value),
                  })}
                />
              </div>
              <p className="error">{errors.username?.message}</p>
              <Label for="Email" className="smalltext">
                          Email
            </Label>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  {...register("email", {
                    value: email,
                    onChange: (e) => setemail(e.target.value),
                  })}
                />
              </div>
              <p className="error">{errors.email?.message}</p>
              <Label for="Password" className="smalltext">
              Password
            </Label>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  //register this input to the react-hook
                  {...register("password", {
                    value: password,
                    onChange: (e) => setpassword(e.target.value),
                  })}
                />
              </div>
              <p className="error">{errors.password?.message}</p>
              <Label for="ConfirmPassword" className="smalltext">
                          Confirm Password
            </Label>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  placeholder="Confirm your password"
                  //register this input to the react-hook
                  {...register("confirmPassword", {
                    value: confirmPassword,
                    onChange: (e) => setconfirmPassword(e.target.value),
                  })}
                />
              </div>
              <p className="error">{errors.confirmPassword?.message}</p>
              <Button
                color="success"
                className="button"
                onClick={submitForm(handleSubmit)} //Validate first the form data by invoking submitForm, if all is good execute handleSubmit
              >
                Register
              </Button>
              <FormGroup>
                            <Label className="smalltext">Have an Account? <Link to="/login" className="linkStyle">Sign in now.</Link></Label>
              </FormGroup>
            </section>
          </form>
        </Col>
        <Col className="columndiv2" lg="6">
          <img src={Logo} className="loginImage" />
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
