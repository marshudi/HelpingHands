import React,{ useEffect,useState} from "react";
import { useSelector } from "react-redux";

function getUser() {
    let user = localStorage.getItem("user");
    if (user) {
        return JSON.parse(user);
    } else {
        return null; // Return null if user data is not found in local storage
    }
}

export const ShowFooter=({children})=>{
    const userFromRedux = useSelector((state) => state.users.user);
    // const user = useSelector((state) => state.users.user);
    const user = getUser() || userFromRedux;
    const [show,setShow]=useState(false);
   

    useEffect(()=>{

        if(user.isAdmin==true || user.isAdmin==false){
            setShow(true);
        }
        else{
            setShow(false)
        }

    },[user])

    return(
        <div>{show && children}</div>
    )

}

export const ShowNavAdmin=({children})=>{
    const userFromRedux = useSelector((state) => state.users.user);
    // const user = useSelector((state) => state.users.user);
    const user = getUser() || userFromRedux;
    const [show,setShow]=useState(false);
  

    useEffect(()=>{

        if(user.isAdmin==true ){
            setShow(true);
        }
        else{
            setShow(false)
        }

    },[user])
    
    return(
        <div>{show && children}</div>
    )

}

export const ShowNavClient=({children})=>{
    const userFromRedux = useSelector((state) => state.users.user);
    // const user = useSelector((state) => state.users.user);
    const user = getUser() || userFromRedux;
    const [show,setShow]=useState(false);


    useEffect(()=>{

        if(user.isAdmin==false ){
            setShow(true);
        }
        else{
            setShow(false)
        }

    },[user])

    return(
        <div>{show && children}</div>
    )

}


// export default {ShowFooter, ShowNavAdmin, ShowNavClient};