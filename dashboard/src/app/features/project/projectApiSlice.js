import axios from "axios";
import { serverURI } from "../../../utilities/server";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Swal from 'sweetalert2';


/**
 * get all category
 */

export const getAllCategory = createAsyncThunk("project/getAllCategory", async () => {

    try{


        const response = await axios.get(`${serverURI}/admin/allCategory`, {
            withCredentials: true
        });

        return response.data;
        

    }catch(err){
        
        throw new Error(err.response.data.message);

    }

})

/**
 * create category
 */

export const createCategory = createAsyncThunk("project/createCategory", async (data) => {

    try{


        const response = await axios.post(`${serverURI}/createCategory`, data, {
            withCredentials: true
        });

        return response.data;
        

    }catch(err){
        
        throw new Error(err.response.data.message);

    }

})

/**
 * update category status
 */

export const updateCategoryStatus = createAsyncThunk("team/updateCategoryStatus", async ({id, status}) => {

    try{

        const updatedStatus = (status === "active") ? "inactive" : "active";
        const response = await axios.post(`${serverURI}/category/status/${id}`, {status: updatedStatus}, {
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

/**
 * update category
 */

export const updateCategory = createAsyncThunk("project/updateCategory", async ({id, input}) => {

    try{


        const response = await axios.post(`${serverURI}/update-category/${id}`, input, {
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

/**
 * delete category
 */

export const deleteCategory = createAsyncThunk("project/deleteCategory", async (id) => {

    try{


        const response = await axios.delete(`${serverURI}/deleteCategory/${id}`, {
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

/**
 * create project
 */

export const createProject = createAsyncThunk("project/createProject", async ({formData, id}) => {

    try{

        const response = await axios.post(`${serverURI}/admin/portfolioItem/${id}`, formData, {
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

/**
 * get all project
 */

export const getAllProject = createAsyncThunk("project/getAllProject", async () => {

    try{


        const response = await axios.get(`${serverURI}/admin/allPortfolio`, {
            withCredentials: true
        });

        return response.data;
        

    }catch(err){
        
        throw new Error(err.response.data.message);

    }

})

/**
 * get single project
 */

export const getSingleProject = createAsyncThunk("project/getSingleProject", async (id) => {

    try{


        const response = await axios.get(`${serverURI}/admin/portfolioDetail/${id}`, {
            withCredentials: true
        });

        return response.data;
        

    }catch(err){
        
        throw new Error(err.response.data.message);

    }

})

/**
 * update project status
 */

export const updateProjectStatus = createAsyncThunk("team/updateProjectStatus", async ({id, status}) => {

    try{

        const updatedStatus = (status === "active") ? "inactive" : "active";
        const response = await axios.post(`${serverURI}/portfolio/status/${id}`, {status: updatedStatus}, {
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

/**
 * update project
 */

export const updateProject = createAsyncThunk("project/updateProject", async ({id, input}) => {

    try {
    
        const response = await axios.post(`${serverURI}/admin/portfolioItem_update/${id}`, input, {
            withCredentials: true
        });

        if (response.data.data) {
            Swal.fire({
                title: "Updated!",
                text: "Your file has been deleted.",
                icon: "success"
            });
        }

        return response.data;

    } catch (err) {
        // console.error("API Call Failed:", err.response ? err.response.data : err.message);
        
        // throw new Error(err.response ? err.response.errors[0] : err.message);

        // throw new Error(err.response ? err.response.data.errors[Object.keys(err.response.data.errors)[0]][0] : err.message);

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

/**
 * delete project
 */

export const deleteProject = createAsyncThunk("project/deleteProject", async (id) => {

    try {
        const response = await axios.delete(`${serverURI}/deletePortfolio/${id}`, {
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

    } catch (err) {
        console.error("API Call Failed:", err.response ? err.response.data : err.message);

        throw new Error(err.response ? err.response.data.message : err.message);
    }

})

