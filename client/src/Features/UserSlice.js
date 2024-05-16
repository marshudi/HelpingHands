import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import Users from "../ExampleData";
import axios from "axios";


export const login=createAsyncThunk(
    "users/login",
    async (userData)=>{
        try{
            const response=await axios.post("https://helpinghands-server.onrender.com/login",{
                rusername:userData.username,
                rpassword:userData.pass,
            });
            console.log(response.data.User);
            localStorage.setItem("user",JSON.stringify(response.data.User))
            return response.data.User;
        }
        catch(error){
            alert("Invalid Creditials...")
        }
    }
);

export const registerUser = createAsyncThunk(
    "users/registerUser",
    async (userData) => {
        try {
            const response = await axios.post("https://helpinghands-server.onrender.com/registerUser", {
                rusername:userData.username,
                remail:userData.email,
                rpassword:userData.pass,
                rpic:userData.pic,
                risAdmin:userData.isAdmin, 
                rdate:userData.date, 
            }
        
        );
            
            return response.data.User;
        } catch (error) {
            alert("Registration failed");
        }
    }
);



export const updatProfile = createAsyncThunk(
    "service/updatProfile",
    async (profileData) => {
      try {
        const response = await axios.post("https://helpinghands-server.onrender.com/updatProfile", {
            rusername:profileData.username,
            remail:profileData.email,
            rpassword:profileData.pass,
            rpic:profileData.pic,
            profileid:profileData.profileid
        });
  
        return response.data.User;
      } catch (error) {
        console.log(error);
      }
    })


const initVal = {
    user:[],
    isSuccess: false,
    isError: false,
    isLoading:false,
    servicesCat : [
        { name: "Drivers", imageUrl: "https://cdn-icons-png.flaticon.com/512/1535/1535791.png", },
        { name: "Nurse", imageUrl: "https://cdn-icons-png.flaticon.com/512/2785/2785554.png" },
        { name: "Chef", imageUrl: "https://cdn-icons-png.flaticon.com/512/3063/3063420.png" },
        { name: "Cleaners", imageUrl: "https://cdn-icons-png.flaticon.com/512/3581/3581139.png" },
        { name: "Massages", imageUrl: "https://cdn-icons-png.flaticon.com/256/8119/8119629.png" },
        { name: "Spa", imageUrl: "https://cdn-icons-png.flaticon.com/512/3464/3464663.png" },
        { name: "Organizers", imageUrl: "https://cdn-icons-png.flaticon.com/512/4098/4098840.png" },
        { name: "Baby Sitters", imageUrl: "https://cdn-icons-png.flaticon.com/512/10491/10491612.png" },
    ],

    isSuccessReg: false,
    isErrorReg: false,
    isLoadingReg:false
}

export const UserSlice = createSlice({
    name: "users",
    initialState:initVal,
    reducers:{
    
    },
    extraReducers:(builder)=>{
        builder
            .addCase(login.pending,(state)=>{
                state.isLoading=true;
                
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.user=action.payload;
                
                state.isSuccess=true;
                state.isLoading=false;
                state.isError=false;
            })
            .addCase(login.rejected,(state)=>{
                state.isLoading=false;
                state.isError=true;
            })

        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoadingReg = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isSuccessReg = true;
                state.isLoadingReg = false;
                state.isErrorReg = false;
            })
            .addCase(registerUser.rejected, (state) => {
                state.isSuccessReg = false;
                state.isLoadingReg = false;
                state.isErrorReg = true;
            });
    }
});

//export const {validate} = UserSlice.actions;
export default UserSlice.reducer;