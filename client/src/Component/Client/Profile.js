import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Container, Row, Col,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import { useSelector,useDispatch } from "react-redux";
import { updatProfile } from '../../Features/UserSlice';
// import bcrypt from "bcrypt";


function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
      return JSON.parse(user);
  } else {
      return null; // Return null if user data is not found in local storage
  }
}




function Profile() {
  const dispatch = useDispatch();
  const userFromRedux = useSelector((state) => state.users.user);
  const servicesFromRedux = useSelector((state) => state.users.servicesCat);
  const user = getUser() || userFromRedux; // Check local storage first, then Redux state
  const services = servicesFromRedux;


  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const [oldpassword, setOldpassword] = useState("");
  const [newpassword, setNewpassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [userid,setUserId]= useState("");
  const [pic, setPic] = useState("");



  const toggle2 = (pic,userid) => {
    setModal1(!modal1);
    setPic(pic);
    setUserId(userid);
  };


  const toggle1 = (password,userid) => {
    setModal(!modal);
    setOldpassword(password);
    setNewpassword(newpassword);
    setconfirmPassword(confirmPassword);
    setUserId(userid);
  };


/// its not working for this 
  const handleUpdatePassword = () => {
    // const isMatch = await bcrypt.compare(oldpassword, user.password);
    if(user.password==oldpassword){
      if(newpassword==confirmPassword){
      const pdata = {
        pass: setNewpassword,
        profileid: userid,
  
      };
      dispatch(updatProfile(pdata));
      dispatch(getUser());
      window.location.reload();
      }
      else{
        alert("Password does not match");
      }
    }

    else{
      alert("Old Password is incorrect");
    }
};


const handleUpdateUserDetails = () => {
  const pdata = {
    username: username,
    email: email,
    pic: user.pic,
    pass: user.password,
    profileid: user._id,
  };
  dispatch(updatProfile(pdata));
  localStorage.setItem("user", JSON.stringify({ ...user, username, email }));
  window.location.reload();
};

const handleUpdateUserProfile = () => {
  const pdata = {
    pic: pic,
    username: user.username,
    email: user.email,
    pass: user.password,
    profileid: userid,
  };
  dispatch(updatProfile(pdata));
  // Update local storage
  localStorage.setItem("user", JSON.stringify({ ...user, pic }));
  window.location.reload();
};






  return (

    <div>
    <Container>
      <Row className="justify-content-center">
        <Col xs="auto">
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img
              src={user.pic} // Replace with your profile image URL
              alt="Profile"
              style={{ width: '150px', height: '150px', borderRadius: '50%' }}
            />
            <div>
              <Button onClick={() => toggle2(user.pic, user._id)}>Edit Profile Image</Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
            <FormGroup>
              <Label for="name">Username:</Label>
              <Input type="text" name="username" id="username" value={username}  onChange={(e)=>setUsername(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email:</Label>
              <Input type="email" name="email" id="email" value={email}  onChange={(e)=>setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup >
            <Button color="primary" onClick={handleUpdateUserDetails}>Save Changes</Button>{' '}
            <Button color="info" onClick={() => toggle1(user.password, user._id)}>Change Password</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      
    </Container>


<Modal isOpen={modal} toggle={toggle1} centered>
                <ModalHeader toggle={toggle1}>Change Password</ModalHeader>
                <ModalBody>
              <FormGroup>
                <Label for="oldPassword">Old Password</Label>
                <Input type="password" name="oldPassword" id="oldPassword"  onChange={(e)=>setOldpassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="password">New Password</Label>
                <Input type="password" name="password" id="password" onChange={(e)=>setNewpassword(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input type="password" name="confirmPassword" id="confirmPassword"  onChange={(e)=>setconfirmPassword(e.target.value)} />
            </FormGroup>
            
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            handleUpdatePassword();
                            toggle1();
                        }}
                    >
                        UPDATE
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle1}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>


            <Modal isOpen={modal1} toggle={toggle2} centered>
                <ModalHeader toggle={toggle2}>Change Profile Picture</ModalHeader>
                <ModalBody>
              <FormGroup>
                <Label for="pic">Image URL</Label>
                <Input type="text" name="pic" id="pic" value={user.pic}  onChange={(e)=>setPic(e.target.value)} />
            </FormGroup>
           
            
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            handleUpdateUserProfile();
                            toggle2();
                        }}
                    >
                        UPDATE
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle2}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>

</div>

  );
}

export default Profile;
