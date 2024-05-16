import { Container, Form, FormGroup, Label, Input, Button, Row, Col} from "reactstrap";
import {LoginValid} from '../Validations/LoginValidation';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { login,validate } from "../Features/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

function Login(){

    //two state variable because has two form fild have
    let [username,setUsername]=useState("");
    let [pass,setPass]=useState("");

    const dispatch = useDispatch();
    const user=useSelector((state)=>state.users.user);
    const isSuccess=useSelector((state)=>state.users.isSuccess);
    const isError=useSelector((state)=>state.users.isError);
    const navigate=useNavigate();
    //object
    const { 
        register,
        handleSubmit: submitForm,
        formState:{errors},
    }=useForm({resolver: yupResolver(LoginValid)});

    useEffect(()=>{
        if(isSuccess){
            //alert("Welcome "+user.uname)

            if(user.isAdmin==true){
                // alert("Admin Page")
                navigate("/AdminPanel");
            }//admin page
            else{
                // alert("ClientPage")

                navigate("/Client");
            }//admin page
            
        }
        if(isError){
            alert("Invalid User..");
        }
    },[user, isSuccess, isError]); //automatic function

    const handleSubmit = (formData) => {
        const data={
            //sending the data 
            username:username, //from the state variable
            pass:pass
        }
        dispatch(login(data))
    };

    // const navigatToRegister=()=>{
    //     navigate("/registration")
    // }
    
    return(
        <Container fluid>
            <Row className="form-rowlogin">
                <Col md="6" className="column">
                    <form className="div-form">

                        <div style={{textAlign:"center"}}>
                            <p className="headingForm">Login to Helping Hands</p>
                            <p className="sloginForm">Fastest Way to Get Things Done.</p>
                        </div>

                        <FormGroup>
                            <Label for="username" className="smalltext">
                            username
                            </Label>
                            <input 
                                className="form-control"
                                id="username" 
                                name="username" 
                                placeholder="Enter your username" 
                                type="text"
                                {
                                    ...register('username',{
                                        // value:{email},
                                        onChange:(e)=>setUsername(e.target.value)
                                    })
                                }
                            />
                            <p className="error">{errors.username?.message}</p>
                        </FormGroup>

                        <FormGroup>
                            <Label for="Password" className="smalltext">
                            Password
                            </Label>
                            <input
                                className="form-control"
                                id="Password"
                                name="password"
                                placeholder="Enter your Password"
                                type="password"
                                {
                                    ...register('password',{
                                        // value:{pass},
                                        onChange:(e)=>setPass(e.target.value)
                                    })
                                }
                            />
                            <p className="error">{errors.password?.message}</p>
                        </FormGroup>
            
                        <FormGroup check>
                                <Input type="checkbox" className="smalltext"/>
                                <Label check className="smalltext">Remember Me</Label>
                        </FormGroup>

                        <FormGroup>
                            <Label className="smalltext">Forget Password</Label>
                        </FormGroup>
                        
                        <FormGroup>
                            <Button className="button" color="success" onClick={submitForm(handleSubmit)}>Submit</Button>
                        </FormGroup>
                        
                        
                        <FormGroup>
                            <Label className="smalltext">No Account? <Link to="/registration" className="linkStyle">Sign Up now.</Link></Label>
                        </FormGroup>
                    </form>
                </Col>
                <Col className="columndiv2" lg="6">
          <img src={Logo} className="loginImage" />
        </Col>
            </Row> 
        </Container>
    );
}
export default Login;