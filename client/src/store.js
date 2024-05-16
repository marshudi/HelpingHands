import { configureStore } from "@reduxjs/toolkit";
import UseReducer  from "./Features/UserSlice";
import SeviceReducer from "./Features/ServiceSlice"

export const store=configureStore({
    reducer:{
        users:UseReducer,
        services:SeviceReducer

    }
});