import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Container, Row} from 'reactstrap';
import Footer from './Component/Footer';
import Login from './Component/Login';
import { Provider } from 'react-redux';
import { store } from './store';
import { useState,useEffect } from 'react';
import Welcome from './Component/Welcome';

// ************************

// 
import AdminNav from "./Component/Admin/Header";
import AdminHome from "./Component/Admin/Home"
import AdminProfile from "./Component/Admin/Profile"
import AdminLists from "./Component/Admin/Lists"
import AdminRegister from "./Component/Admin/Register"

// ***********************

// 
import ClientNav from "./Component/Client/Header";
import ClientHome from "./Component/Client/Home";
import ClientLists from "./Component/Client/Lists";
import ClientProfile from "./Component/Client/Profile";
import ClientReserved from "./Component/Client/Reserved";

import {ShowFooter,ShowNavAdmin,ShowNavClient} from "./MaybeShow/MaybeShow"

import { BrowserRouter, Routes, Route, Link,useParams  } from 'react-router-dom';
import Register from './Component/Register';
import { useSelector } from "react-redux";





function App() 
{



  return (
    <Provider store={store}>

   <>
      <Container fluid>
        <BrowserRouter>
          <Row>

              <ShowNavAdmin>
                <AdminNav/>
              </ShowNavAdmin>
              
              <ShowNavClient>
                <ClientNav/>
              </ShowNavClient>


          </Row>
          <Row className="main">
            <Routes>
              <Route path='/registration' element={<Register/>}></Route>
              <Route path='/login' element={<Login/>}></Route>
              <Route path='/' element={<Welcome/>}></Route>


              <Route path='/AdminPanel' element={<AdminHome/>}></Route>
              <Route path='/AdminPanel/Home' element={<AdminHome/>}></Route>
              <Route path='/AdminPanel/Profile' element={<AdminProfile/>}></Route>
              <Route path='/AdminPanel/Register' element={<AdminRegister/>}></Route>
              <Route path='/AdminPanel/services/:category' element={<ServiceList />}></Route>


              <Route path='/Client' element={<ClientHome/>}></Route>
              <Route path='/Client/Home' element={<ClientHome/>}></Route>
              <Route path='/Client/services/:category' element={<ServiceListClient />}></Route>
              <Route path='/Client/profile' element={<ClientProfile/>}></Route>
              <Route path='/Client/reserved' element={<ClientReserved/>}></Route>

             </Routes>
          </Row>


          <Row>
            <ShowFooter>
              <Footer/>
            </ShowFooter>
          </Row>
        </BrowserRouter>
      </Container>
    </>
    </Provider>
  )
}


const ServiceList = () => {
  const { category } = useParams(); // Assuming you use react-router-dom's useParams to get the category
  return <AdminLists category={category} />;
};


const ServiceListClient = () => {
  const { category } = useParams(); // Assuming you use react-router-dom's useParams to get the category
  return <ClientLists category={category} />;
};

export default App;
