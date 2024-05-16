import { Row, Col, Table, Modal, ModalHeader, ModalBody, ModalFooter, Input, FormGroup, Label, Button } from "reactstrap";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProfile, updateIsActive } from "../../Features/ServiceSlice";


function getProfilesLocal() {
    let profiles = localStorage.getItem("profiles");
    try {
        if (profiles) {
            return JSON.parse(profiles);
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
  
  






const Reserved=()=>{
    const userFromRedux = useSelector((state) => state.users.user);
    const user = getUser() || userFromRedux; // Check local storage first, then Redux state
    const [filteredProfiles, setFilteredProfiles] = useState([]); //filter profiels according to userid=user._id
    const ProfilesRedux = useSelector((state) => state.services.profiles);
    const [profiles,setProfiles]=useState([]);
    
    const profilesFilter= getProfilesLocal() || ProfilesRedux;

    const dispatch=useDispatch();
    useEffect(() => {
       
        if (profilesFilter) {
            const filtered = profilesFilter.filter(profile => profile.userid === user._id);
            setFilteredProfiles(filtered);
        }
    }, [profiles, user._id]);
    
    
    useEffect(() => {
        dispatch(getProfile());
    }, [profiles]);
    


    const handleDeactive=(profileid)=>{
        const pdata = {
            isActive:false,
            profileid:profileid
          };
          dispatch(updateIsActive(pdata));
          dispatch(getProfile())
          

          window.location.reload();

    }

    return(

        <>
            <h2>Reserved Services</h2>
            <div className="paddingForPages">
            <Table >
                <tbody>
                 
                {filteredProfiles.map((profile,index) => (
                        <tr key={profile._id}>
                            <td>{index + 1}</td>
                            <td><img src={profile.pic} alt={profile.name} style={{ width: '50px', height: "50px", borderRadius:"50%"}} /></td>
                            <td>{profile.name} : {profile.category}</td>
                            <td>{profile.price}</td>

                            <td>
                            
                            {profile.isActive ? <Button color="primary" onClick={() => handleDeactive(profile._id)} >Cancel</Button> : null}  
                            </td>
                            <td>
                                <span style={{ display: 'inline-block', width: '20px', height: '20px', borderRadius: '50%', backgroundColor: profile.isActive ? 'green' : 'red', marginRight: '10px' }}></span>
                                    {profile.isActive ? 'Active' : 'Inactive'}
                            </td>
                           
                        </tr>
                    ))}
                  
                </tbody>
            </Table>
            </div>
     
        </>

    )
        
}


export default Reserved;