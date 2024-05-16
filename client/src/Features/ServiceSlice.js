import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
// import Users from "../ExampleData";
import axios from "axios";


export const getService = createAsyncThunk("service/getService", async (serviceData) => {
    try {
      const response = await axios.get("https://helpinghands-server.onrender.com/getService");
      localStorage.removeItem("service",JSON.stringify(response.data))
      localStorage.setItem("service",JSON.stringify(response.data))
      console.log(response.data)
      return response.data;
      
    } catch (error) {
      console.log(error);
    }
  });



export const registerService = createAsyncThunk(
    "service/registerService",
    async (serviceData) => {
        try {
            const response = await axios.post("https://helpinghands-server.onrender.com/registerService", {
                rcategory:serviceData.category,
                rname:serviceData.name,
                rdescription:serviceData.description,
                rprice:serviceData.price,
                rpic:serviceData.pic, 
            }
        
        );
            // localStorage.setItem("service",JSON.stringify(response.data.service))
            return response.data.service;
        } catch (error) {
            alert("Registration failed");
        }
    }
);

// for delete we copied from get
export const delService = createAsyncThunk("posts/delService", async (serviceid) => {
    try {
      await axios.delete(`https://helpinghands-server.onrender.com/delService/${serviceid}`);

      return serviceid;
    } catch (error) {
      console.log(error);
    }
  });



  export const updatService = createAsyncThunk(
    "service/updatService",
    async (serviceData) => {
      try {
        const response = await axios.post("https://helpinghands-server.onrender.com/updatService", {
            rcategory:serviceData.category,
            rname:serviceData.name,
            rdescription:serviceData.description,
            rprice:serviceData.price,
            rpic:serviceData.pic, 
            serviceid:serviceData.serviceid
        });
  
        const service = response.data.service;
        return service;
      } catch (error) {
        console.log(error);
      }
    }
  );


  export const RegisterProfile = createAsyncThunk(
    "prfiles/RegisterProfile",
    async (PrfoileData) => {
        try {
            const response = await axios.post("https://helpinghands-server.onrender.com/RegisterProfile", {
                rpackage:PrfoileData.package,
                rname:PrfoileData.name,
                risActive:PrfoileData.isActive,
                rcategory:PrfoileData.category,
                rprice:PrfoileData.price,
                rpic:PrfoileData.pic, 
                userid:PrfoileData.userid, 
            }
        
        );
            localStorage.setItem("profiles",JSON.stringify(response.data.prfile))
            return response.data.prfile;
        } catch (error) {
            alert("Registration failed");
        }
    }
);



export const updateIsActive = createAsyncThunk(
    "prfiles/updateIsActive",
    async (PrfoileData) => {
      try {
        const response = await axios.post("https://helpinghands-server.onrender.com/updateIsActive", {
            risActive:PrfoileData.isActive,
            profileid:PrfoileData.profileid

        });
  
        const profile = response.data.prfiles;
        return profile;
      } catch (error) {
        console.log(error);
      }
    }
  );


export const getProfile = createAsyncThunk("prfiles/getProfile", async (serviceData) => {
    try {
      const response = await axios.get("https://helpinghands-server.onrender.com/getProfile");
      localStorage.removeItem("profiles",JSON.stringify(response.data))
      localStorage.setItem("profiles",JSON.stringify(response.data))
      console.log(response.data)
      return response.data;
      
    } catch (error) {
      console.log(error);
    }
  });



const initVal = {
    service:[],
    prfiles:[],
    isSuccess: false,
    isError: false,
    isLoading:false,
    
}



export const ServiceSlice = createSlice({
    name: "services",
    initialState:initVal,
    reducers:{

    },
    extraReducers:(builder)=>{
                builder
            .addCase(registerService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(registerService.fulfilled, (state, action) => {
                state.service = action.payload;
                state.isSuccess = true;
                state.isLoading = false;
                state.isError = false;
            })
            .addCase(registerService.rejected, (state) => {
                state.isSuccess = false;
                state.isLoading = false;
                state.isError = true;
            });

    }
});


export default ServiceSlice.reducer;