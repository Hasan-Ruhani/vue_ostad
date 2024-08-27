import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaGoogle } from "react-icons/fa";
import createToast from '../../utilities/createToast';
import { adminLogin } from '../../app/features/admin/adminApiSlice';
import { setMessageEmpty } from '../../app/features/admin/adminSlice';



const Login = () => {

    const [input, setInput] = useState({
        login: "",
        password: "",
        rememberPass: false
    });
    const dispatch = useDispatch();
    const { error, message } = useSelector((state) => state.admin);
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        setInput((prevState) => ({
            ...prevState,
            [event.target.name] : event.target.value
        }));
    }

    const handleLoginFormSubmit = async (e) => {
        e.preventDefault();
        if(!input.login || !input.password){
            createToast("All fields are required!", "warn");
        }else{
            if(input.rememberPass){
                await dispatch(adminLogin({login: input.login, password: input.password})).unwrap().then(() => {
                    window.location.reload();
                });
                
                setInput({
                    login: "",
                    password: "",
                    rememberPass: false
                })
                // document.getElementById("signup-form").reset();
            }else{
                await dispatch(adminLogin({login: input.login, password: input.password})).unwrap().then(() => {
                    window.location.reload();
                });
                
                setInput({
                    login: "",
                    password: "",
                    rememberPass: false
                })
                // document.getElementById("signup-form").reset();
            }
        }
    }

    useEffect(() => {
        if(error){
            createToast(error, "warn");
            dispatch(setMessageEmpty());
        }
        if(message){
            createToast(message, "success");
            dispatch(setMessageEmpty());
        }
    }, [error, message]);
    
    return (
        <>
            
            <div className="main-wrapper login-body">
                <div className="login-wrapper">
                    <div className="container">
                        <div className="loginbox">
                            <div className="login-left">
                                <h1 className="text-center font-weight-bold font-size-lg text-white">CFS</h1>
                            </div>
                            <div className="login-right">
                                <div className="login-right-wrap">
                                    <h1>LOGIN</h1>
                                    <p className="account-subtitle">Access to our dashboard</p>
                                    
                                    <form onSubmit={handleLoginFormSubmit}>
                                        <div className="form-group">
                                            <input name="login" value={input.login} onChange={handleInputChange} className="form-control" type="text" placeholder="Email or Username"/>
                                        </div>
                                        <div className="form-group">
                                            <input name="password" value={input.password} onChange={handleInputChange} className="form-control" type="password" placeholder="Password"/>
                                        </div>
                                        <div className="form-group mb-0">
                                            <button className="btn btn-danger btn-block" type="submit">Login</button>
                                        </div>
                                    </form>
                                    
                                    <div className="login-or">
                                        <span className="or-line"></span>
                                        <span className="span-or">or</span>
                                    </div>
                                    
                                    <div className="social-login">
                                        <span>Login with</span>
                                        <a href="#" className="facebook"><FaFacebookF /></a><a href="#" className="google"><FaGoogle /></a>
                                    </div>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export default Login
