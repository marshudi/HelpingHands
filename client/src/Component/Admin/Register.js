import React, { useState } from 'react';
import { Button, Form, FormGroup, Label, Input, FormText,Col } from 'reactstrap';
import { registerService } from '../../Features/ServiceSlice';
import { useSelector, useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
const Register = () => {

    let [category,setCategory]=useState("");
    let [name,setName]=useState("");
    let [description,setDescription]=useState("");
    let [price,setPrice]=useState();
    let [pic,setPic]=useState("");

    const dispatch = useDispatch(); //every time we want to call an action, make an action happen
    const navigate = useNavigate(); //declares a constant variable named navigate and assigns it the value returned by the useNavigate() hook.

    const handleSubmit = (data) => {
        if(category==""){
            alert("Please Select a category!")
        }
        else{
             const serviceData={
            category:category,
            name:name,
            description:description,
            price:price,
            pic:pic,

      }
      console.log(serviceData);
      dispatch(registerService(serviceData))
            
        }
        
      
          };

    return (
<>
<Col></Col>

<Col>
        <Form  className='paddingForPages'>
            <h1 className="text-center mt-5">Register</h1>
            <FormGroup>
                <Label for="category">Category</Label>
                <Input type="select" name="category" id="category" onChange={(e)=>setCategory(e.target.value)}>
                    <option value="">**Select Category**</option>
                    <option value="Drivers">Drivers</option>
                    <option value="Nurse">Nurse</option>
                    <option value="Chef">Chef</option>
                    <option value="Cleaners">Cleaners</option>
                    <option value="Massages">Massages</option>
                    <option value="Spa">Spa</option>
                    <option value="Organizers">Organizers</option>
                    <option value="Baby Sitters">Baby Sitters</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="name">Name</Label>
                <Input type="text" name="name" id="name" onChange={(e)=>setName(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description" onChange={(e)=>setDescription(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="price">Price</Label>
                <Input type="number" name="price" id="price" onChange={(e)=>setPrice(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="pic">Picture</Label>
                <Input type="text" name="pic" id="pic" onChange={(e)=>setPic(e.target.value)} />
            </FormGroup>
            <FormGroup className='ButtonCneter'>
            <Button type="submit" className='button' color="primary" onClick={handleSubmit}>Submit</Button>
            </FormGroup>
        </Form>
        </Col>

        <Col></Col>
        </>
    );
};

export default Register;
