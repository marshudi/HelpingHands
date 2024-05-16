import { useState,useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardBody, CardImg, CardTitle } from "reactstrap";



function getUser() {
    let user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    } else {
        return null; // Return null if user data is not found in local storage
    }
}



const Home = () => {
    // const [user,setUser]=useState(getUser);

    const userFromRedux = useSelector((state) => state.users.user);
    const servicesFromRedux = useSelector((state) => state.users.servicesCat);
    const user = getUser() || userFromRedux; // Check local storage first, then Redux state
    const services = servicesFromRedux;

    // const user = useSelector((state) => state.users.user);
    // const services = useSelector((state) => state.users.services);
    
    
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("services", JSON.stringify(services));
    }, [user, services]); // Only re-run the effect if user or services change

    if (!user) {
        // Redirect or handle the case where user data is not available
        return (<></>)
    }


    return (
        <div>
            {/* <h1>Welcome to {user.username}</h1>
            <img src={user.pic} alt="User" /> */}

            <div className="home-page">
                
                <div className="services">
                    {/* Map over the services array to generate Card components */}
                    {services.map((service, index) => (
                        <Link to={`/AdminPanel/services/${service.name.toLowerCase()}`} key={index}>
                            <Card className="service-item">
                                <CardImg top src={service.imageUrl} alt={service.name} />
                                <CardBody>
                                    <CardTitle tag="h5">{service.name}</CardTitle>
                                </CardBody>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
