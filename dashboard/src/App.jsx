import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { getAdminProfile } from './app/features/admin/adminApiSlice';
import { setMessageEmpty } from './app/features/admin/adminSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, getAllProject } from './app/features/project/projectApiSlice';
import { getAllTeam } from './app/features/team/teamApiSlice';



function App() {
 
  const dispatch = useDispatch();
  const { error, message } = useSelector(state => state.admin);

  useEffect(() => {
    if(error){
        dispatch(setMessageEmpty());
    }
    if(message){
        dispatch(setMessageEmpty());
    }
  }, [error, message]);

  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getAllCategory());
    dispatch(getAllTeam());
  }, [dispatch]);

  useEffect(() => {
    if(localStorage.getItem("admin")){
      dispatch(getAdminProfile());
    }
  }, [dispatch]);

  return (
    <>

      <ToastContainer
        style={{zIndex:"9999999"}}
        hideProgressBar={true}
        position="bottom-left"
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
      />
     
      <RouterProvider router={router}/>

    </>
  )
}

export default App
