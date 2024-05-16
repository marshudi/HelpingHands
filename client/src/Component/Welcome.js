import { Container, Form, FormGroup, Label, Input, Button, Row, Col} from "reactstrap";
import {LoginValid} from '../Validations/LoginValidation';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux"; 
import { login,validate } from "../Features/UserSlice";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";

function Welcome(){
    const navigate=useNavigate();
    
    return(
        <Container fluid>
            <Row className="form-rowWelcome">
            <form className="div-formWelcome">
                <Row>
                
                <img src={Logo} className="WelcomeImage" />
                <Label className="WelcomeSign">Helping Hands</Label>
                <br/><br/>
                <FormGroup>
                            <Link to="/login"><Button className="buttonWelcome" color="info" >Login</Button></Link>
                            
                </FormGroup>
                <br/>
                <FormGroup>
                            <Link to="/registration"><Button className="buttonWelcome" color="info" >Register</Button></Link>
                            
                </FormGroup>
                
                </Row>

            </form>
            </Row> 
        </Container>
    );
}
export default Welcome;