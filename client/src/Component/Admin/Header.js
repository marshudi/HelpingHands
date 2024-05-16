import React, { useState } from 'react';
import { Navbar, Container, Nav,NavDropdown  } from 'react-bootstrap';
import Logo from "../../assets/logo.png";
import { FaHome, FaUserAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector } from "react-redux";
import {Label} from "reactstrap";


function getUser() {
  let user = localStorage.getItem("user");
  if (user) {
      return JSON.parse(user);
  } else {
      return null; // Return null if user data is not found in local storage
  }
}


function Header(){




  const userFromRedux = useSelector((state) => state.users.user);
  const servicesFromRedux = useSelector((state) => state.users.services);
  const user = getUser() || userFromRedux; // Check local storage first, then Redux state

    // State variable 
    // const [isOpen, setIsOpen] = useState(false);
    // const toggle = () => setIsOpen(!isOpen);

    return(
        <>
          {/* <NavbarBrand href="/">
                <img src={Logo} alt="Helping Hand Inc." className="logo" />
            </NavbarBrand> */}
      
      <Navbar className="navigation" data-bs-theme="dark">
        
        <Container>
        
          <Navbar.Brand href="/AdminPanel/Home/"><img src={Logo} alt="Helping Hand Inc." className="logo" /></Navbar.Brand>
          <Nav className="me-auto">
         
            <Nav.Link href="/AdminPanel/Home/">Home</Nav.Link>
            <Nav.Link href="/AdminPanel/Register">Register</Nav.Link>
          </Nav>

            <NavDropdown title={<img src={user.pic} alt="Profile" className="profile-image" />}  id="navbarScrollingDropdown" >
            
              <Label  className='username'>{user.username}</Label>
              <NavDropdown.Item href="/AdminPanel/Profile">
                Edit Profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/" className='logout' color='red' onClick={()=>{localStorage.removeItem("user");}} >
                Logout
              </NavDropdown.Item>
            </NavDropdown>
            
          
        </Container>
      </Navbar>
     
   
  </>
            


        
    );
}
export default Header;
