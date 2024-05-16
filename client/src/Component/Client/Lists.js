import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Container } from "reactstrap";
import { getService, RegisterProfile } from "../../Features/ServiceSlice";
import { Link, useNavigate } from "react-router-dom";

function getServiceLocal() {
    let service = localStorage.getItem("service");
    try {
        if (service) {
            return JSON.parse(service);
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        return null;
    }
}


function getUser() {
    let user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    } else {
        return null; // Return null if user data is not found in local storage
    }
  }

const Lists = ({ category }) => {


    const userFromRedux = useSelector((state) => state.users.user);
    const user = getUser() || userFromRedux; // Check local storage first, then Redux state

    const servicesFromRedux = useSelector((state) => state.users.servicesCat);
    const [filteredServices, setFilteredServices] = useState([]);
    const serviceRedux = useSelector((state) => state.services.service);
    const [service, setService] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getService());
    }, [service]);

    useEffect(() => {
        const serviceFromLocalStorage = getServiceLocal();
        const serviceData = serviceFromLocalStorage || serviceRedux;
        if (Array.isArray(serviceData)) {
            setService(serviceData);
        } else {
            console.error("Service data is not an array:", serviceData);
        }
    }, [serviceRedux]);

    const [modal, setModal] = useState(false);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [modalCategory, setModalCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState();
    const [pic, setPic] = useState("");
    const [serviceid, setServiceid] = useState("");
    const [spackage, setPackage] = useState("");
   
    const [newprice, setNewPrice] = useState("");


    const toggle = (category, name, description, price, pic, serviceid) => {
        setModal(!modal);
        setModalCategory(category);
        setName(name);
        setDescription(description);
        setPrice(price);
        setPic(pic);
        setServiceid(serviceid);
    };

    useEffect(() => {
        const filtered = servicesFromRedux.filter(
            (service) => service.name.toLowerCase() === category.toLowerCase()
        );
        setFilteredServices(filtered);
    }, [category, servicesFromRedux]);


    const togglePaymentModal = () => {
        

        if(spackage=="One-Time"){

            setNewPrice(`total One-Time/ ${price} OMR`)
            setPaymentModalOpen(!paymentModalOpen);
        }
        else if(spackage=="Daily"){

            setNewPrice(`total Daily/ ${price} OMR`)
            setPaymentModalOpen(!paymentModalOpen);
        }
        else if(spackage=="Weekly"){
            setNewPrice(`total Weekly/ ${price*7} OMR`)
            setPaymentModalOpen(!paymentModalOpen);
        }
        else if(spackage=="Monthly"){
            setNewPrice(`total Monthly/ ${price*30} OMR`)
            setPaymentModalOpen(!paymentModalOpen);
        }
        else{
            alert("Please choose a package")
        }


    };





    const handlePayment = () => {
        const pdata = {

            package: spackage,
            name:name,
            isActive: true,
            category: category,
            price: newprice,
            pic: pic,
            userid: user._id,
        };
        dispatch(RegisterProfile(pdata));
        
            // Update local storage
  




        window.location.reload();
    };

    return (
        <div className="paddingForPages">
            <Row>
                {filteredServices.map((service, index) => (
                    <Row key={index}>
                        <Col md="4">
                            <img src={service.imageUrl} className="servicesImg" alt={service.name} />
                        </Col>
                        <Col>
                            <p className="serviceTitle">{service.name}</p>
                        </Col>
                    </Row>
                ))}
            </Row>
            <hr />

            <div className="paddingForPages">
                <Table bordered>
                    {service &&
                        service
                            .filter((x) => x.category.toLowerCase() === category.toLowerCase())
                            .map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td><img src={item.pic} alt={item.name} style={{ width: '50px', height: "50px" }} /></td>
                                    <td>{item.name}</td>
                                    <Button color="success" onClick={() => toggle(item.category, item.name, item.desc, item.price, item.pic, item._id)}>Select</Button>
                                   
                                </tr>
                            ))}
                </Table>
            </div>

            <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>Update Service</ModalHeader>
                <ModalBody>


                    
                    <Row>

                        <Col md="4">
                            <img src={pic} className="servicesImg" alt={name} />
                            
                        </Col>
                        <Col>
                        <p className="serviceTitle">{name}</p>
                            <Input type="select" name="spackage" id="spackage" onChange={(e)=>setPackage(e.target.value)}>
                    <option value="">**Choose Package**</option>
                    <option value="One-Time">One-Time</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>

                </Input>
                        </Col>
                    </Row>
                    <hr />
                    <Row>
                        <Col>{description}</Col>
                    
                    </Row>


                </ModalBody>
                <ModalFooter>
                    <div  className="displayPrice">
                    <p className="displayPrice">Price per/d : <span className="priceColor">{price} </span>OMR</p>
                    </div>
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                    <Button color="success" onClick={togglePaymentModal}>
                        Select
                    </Button>

                </ModalFooter>
            </Modal>




            <Modal isOpen={paymentModalOpen} toggle={togglePaymentModal} centered>
                <ModalHeader toggle={togglePaymentModal}>Payment Details for <span>{category}</span></ModalHeader>
                <ModalBody>
                    {/* Add input fields for payment details here */}

                    <FormGroup>
                        <Label for="cardNumber">Card Number</Label>
                        <Input type="text" name="cardNumber" placeholder="1234 5678 9123 456" id="cardNumber" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="expiryDate">Expiry Date</Label>
                        <Input type="text" name="expiryDate" placeholder="12/25" id="expiryDate" />
                    </FormGroup>
                    {/* Add more payment input fields as needed */}
                    <p className="displayPrice">{newprice}</p>
                </ModalBody>
                <ModalFooter>
                
                    <Button color="secondary" onClick={togglePaymentModal}>
                        Cancel
                    </Button>

                    <Button color="success" onClick={handlePayment}>
                        Confirm Payment
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Lists;
