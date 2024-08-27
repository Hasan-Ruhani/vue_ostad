import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { serverURI } from "../../../utilities/server";



export const adminLogin = createAsyncThunk("admin/adminLogin", async (data) => {

    try{

        const response = await axios.post(`${serverURI}/user-login`, data, {
            withCredentials: true
        });
        return response.data; 

    }catch(err){
        throw new Error(err.response.data.message);
    }

})


export const getAdminProfile = createAsyncThunk("admin/getAdminProfile", async () => {

    try{

        const response = await axios.get(`${serverURI}/admin-me`, {
            withCredentials: true
        });
        return response.data; 

    }catch(err){
        throw new Error(err.response.data.message);
    }

})


export const adminLogout = createAsyncThunk("admin/adminLogout", async () => {

    try{

        const response = await axios.get(`${serverURI}/user-logout`, {
            withCredentials: true
        });
        return response.data;

    }catch(err){
        throw new Error(err.response.data.message);
    }

})

