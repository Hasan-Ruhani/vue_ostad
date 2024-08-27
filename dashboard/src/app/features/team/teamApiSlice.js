import axios from "axios";
import { serverURI } from "../../../utilities/server";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';



export const getAllTeam = createAsyncThunk("team/getAllTeam", async () => {

    try{


        const response = await axios.get(`${serverURI}/admin/userList`, {
            withCredentials: true
        });

        return response.data;
        

    }catch(err){
        
        throw new Error(err.response.data.message);

    }

})


export const getTeamDetails = createAsyncThunk("team/getTeamDetails", async (id) => {

    try{


        const response = await axios.get(`${serverURI}/profileDetail/${id}`, {
            withCredentials: true
        });

        return response.data;
        

    }catch(err){
        
        throw new Error(err.response.data.message);

    }

})


export const createTeam = createAsyncThunk("team/createTeam", async (data) => {

    try{


        const response = await axios.post(`${serverURI}/user-registration`, data, {
            withCredentials: true
        });

        return response.data;
        

    }catch(err){
        
        throw new Error(err.response.data.message);

    }

})


export const createTeamProfile = createAsyncThunk("team/createTeamProfile", async ({id, input}) => {

    try{

        const response = await axios.post(`${serverURI}/admin/createProfile/${id}`, input, {
            withCredentials: true
        });

        return response.data;
        

    }catch(err){
        
        let errorMessage = "";
        console.log(err.response.data.errors);
        if (err.response && err.response.data.errors) {
            Object.keys(err.response.data.errors).forEach(field => {
                errorMessage += err.response.data.errors[field].join(", ") + ". ";
            });
        } else {
            errorMessage = err.message;
        }
        throw new Error(errorMessage);

    }

})



export const updateTeamStatus = createAsyncThunk("team/updateTeamStatus", async ({id, status}) => {

    try{

        const updatedStatus = (status === "active") ? "inactive" : "active";
        const response = await axios.post(`${serverURI}/admin/status/${id}`, {status: updatedStatus}, {
            withCredentials: true
        });

        return response.data;
        

    }catch(err){
        
        // throw new Error(err.response.data.message);
        let errorMessage = "";
        if (err.response && err.response.data.errors) {
            Object.keys(err.response.data.errors).forEach(field => {
                errorMessage += err.response.data.errors[field].join(", ") + ". ";
            });
        } else {
            errorMessage = err.message;
        }
        throw new Error(errorMessage);

    }

})


export const updateTeam = createAsyncThunk("team/updateTeam", async ({id, input}) => {

    try{

        
        const response = await axios.post(`${serverURI}/admin/updateProfile/${id}`, input, {
            withCredentials: true
        });

        if (response.data.status === "success") {
            Swal.fire({
                title: "Updated!",
                text: "Your file has been updated.",
                icon: "success"
            });
        }

        return response.data;
        

    }catch(err){
        
        // throw new Error(err.response.data.message);
        console.log(err.response.data);
        let errorMessage = "";
        if (err.response && err.response.data.errors) {
            Object.keys(err.response.data.errors).forEach(field => {
                errorMessage += err.response.data.errors[field].join(", ") + ". ";
            });
        } else {
            errorMessage = err.message;
        }
        throw new Error(errorMessage);

    }

})


export const deleteTeam = createAsyncThunk("team/deleteTeam", async (id) => {

    try{


        const response = await axios.delete(`${serverURI}/admin/deleteProfile/${id}`, {
            withCredentials: true
        });

        if (response.data.status === "success") {
            Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }

        return response.data;
        

    }catch(err){
        
        throw new Error(err.response.data.message);

    }

})

