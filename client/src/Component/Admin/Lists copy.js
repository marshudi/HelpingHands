import React, { useState, useEffect } from "react";
import { useSelector,useDispatch } from "react-redux";
import { Row, Col, Button,Table,  Modal,ModalHeader,ModalBody,ModalFooter, Input} from "reactstrap";
import { delService, getService,updatService } from "../../Features/ServiceSlice";
import { Link,useNavigate } from "react-router-dom";



function getServiceLocal() {
    let service = localStorage.getItem("service");
    try {
        // Attempt to parse the JSON string from localStorage
        if (service) {
            return JSON.parse(service);
        } else {
            return null; // Return null if user data is not found in local storage
        }
    } catch (error) {
        console.error("Error parsing JSON from localStorage:", error);
        return null; // Return null in case of error
    }
}





const Lists = ({ category }) => {
  const servicesFromRedux = useSelector((state) => state.users.servicesCat);
  const [filteredServices, setFilteredServices] = useState([]);
  const serviceRedux = useSelector((state) => state.services.service);
  const service = getServiceLocal() || serviceRedux;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getService());
    console.log()

  }, [service]);

  let [modal, setModal] = useState(false);
const [category,setCategory]=useState("");
const [name,setName]=useState("");
const [description,setDescription]=useState("");
const [price,setPrice]=useState("");
const [pic,setPic]=useState("");

const [serviceid,setServiceid]=useState("");

  const handleDelete=(serviceid)=>{
    dispatch(delService(serviceid));
    window.location.reload();


  }



  const handleUpdate = () => {
    const pdata = {
      category: category,
      name: name,
      description:description,
      price:price,
      pic:pic,
      serviceid:serviceid,
    };
    dispatch(updatService(pdata));
    dispatch(getService());
    window.location.reload();
  };


  const toggle = (category, name,description,price,pic,serviceid) => {
    setModal(!modal);
    setCategory(category);
    setName(name);
    setDescription(description);
    setPrice(price);
    setPic(pic);
    setServiceid(serviceid);
  };


  useEffect(() => {
    // Filter services based on the selected category
    const filtered = servicesFromRedux.filter(
      (service) => service.name.toLowerCase() === category.toLowerCase()
    );
    setFilteredServices(filtered);
  }, [category, servicesFromRedux]);

  return (
    <div className="paddingForPages">
      {/* <h2>{category}</h2> */}
      <Row>
        {filteredServices.map((service, index) => (
            <>
            <Row>
            <Col md="4">
            <img src={service.imageUrl} className="servicesImg"/>
            </Col>
            <Col>
            <p className="serviceTitle">{service.name}</p>
            </Col>
            </Row>
          </>
        ))}
      </Row>
      <hr/>

      <div className="paddingForPages">
            <Table bordered >

                 
            {service &&
            service
                .filter((x) => x.category.toLowerCase() === category.toLowerCase())
                .map((item, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td><img src={item.pic} alt={item.name} style={{ width: '50px', height:"50px" }}/></td>
                        <td>{item.name}</td>

                        <Button color="success" onClick={() => toggle(item.category,item.name,item.description,item.price,item.pic, item._id)}>Edit</Button>
                        <Button color="danger" onClick={()=>handleDelete(item._id)}>Delete</Button>


                    </tr>
                    
                ))}
            



            </Table>
        </div>

        <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}>Update Service</ModalHeader>
        <ModalBody>
          {/* <Input
            id="share"
            name="share"
            type="textarea"
            value={postMsg}
            onChange={(e) => {
              setpostMsg(e.target.value);
            }}
          /> */}
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
