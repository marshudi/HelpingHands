import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Button, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label } from "reactstrap";
import { delService, getService, updatService } from "../../Features/ServiceSlice";
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

const Lists = ({ category }) => {
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
    const [modalCategory, setModalCategory] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [pic, setPic] = useState("");
    const [serviceid, setServiceid] = useState("");

    const handleDelete = (serviceid) => {
        dispatch(delService(serviceid));
        window.location.reload();
    }

    const handleUpdate = () => {
        const pdata = {
            category: modalCategory,
            name: name,
            description: description,
            price: price,
            pic: pic,
            serviceid: serviceid,
        };
        dispatch(updatService(pdata));
        
            // Update local storage
    const serviceFromLocalStorage = getServiceLocal();
    if (serviceFromLocalStorage) {
        const updatedService = serviceFromLocalStorage.map((item) => {
            if (item.serviceid === serviceid) {
                return { ...item, ...pdata };
            }
            return item;
        });
        localStorage.setItem("service", JSON.stringify(updatedService));
    }

     dispatch(getService());



        window.location.reload();
    };

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
                                    <Button color="success" onClick={() => toggle(item.category, item.name, item.desc, item.price, item.pic, item._id)}>Edit</Button>
                                    <Button color="danger" onClick={() => handleDelete(item._id)}>Delete</Button>
                                </tr>
                            ))}
                </Table>
            </div>

            <Modal isOpen={modal} toggle={toggle} centered>
                <ModalHeader toggle={toggle}>Update Service</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input type="number" name="price" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="pic">Picture</Label>
                        <Input type="text" name="pic" id="pic" value={pic} onChange={(e) => setPic(e.target.value)} />
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        onClick={() => {
                            handleUpdate();
                            toggle();
                        }}
                    >
                        UPDATE
                    </Button>{" "}
                    <Button color="secondary" onClick={toggle}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default Lists;
