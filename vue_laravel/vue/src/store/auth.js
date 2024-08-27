import axios from 'axios'
import { reactive } from "vue";
import router from "../router/router";
import { showToast } from "./Toast";

const auth = reactive({
    
    authenticate(login, password) {
        fetch('http://127.0.0.1:8000/user-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, password }),
        })
        .then(res => {
            if (!res.ok) {
                // If the HTTP status code is not 2xx, throw an error to be caught by .catch
                return res.json().then(err => { throw err });
            }
            return res.json();
        })
        .then(res => {
            if (res.status === 'success') {
                if (res.role === 'admin65') {
                    showToast('success', 'Admin Login Successfully');
                    setTimeout(() => {
                        router.push('/') 
                    }, 500)
                } else {
                    showToast('success', res.message);
                    setTimeout(() => {
                        router.push('/forms') 
                    }, 500)
                }
            } else {
                throw res; // If the status is not 'success', throw the response to be caught by .catch
            }
        })
        .catch(error => {
            if (error.errors) {
                error.errors.forEach(err => {
                    showToast('error', err);
                });
            } else {
                showToast('error', 'Incorrect login or something else went wrong.');
            }
        });
    },

    logout(){
        axios.get('http://127.0.0.1:8000/user-logout')
        .then(res => {
            if (res.data.status === 'success') {
                showToast('success', res.data.message);
                router.push('/login');
                console.log(res);
            } else {
                // Handle cases where the status is not 'success' but no error was thrown
                showToast('error', 'Logout failed. Please try again.');
            }
        })
        .catch(error => {
            // Enhanced error handling based on common axios error structures
            if (error.response) {
                // The request was made, and the server responded with a status code
                // that falls out of the range of 2xx
                if (error.response.data.errors) {
                    error.response.data.errors.forEach(err => {
                        showToast('error', err);
                    });
                } else {
                    showToast('error', error.response.data.message || 'An error occurred during logout.');
                }
            } else if (error.request) {
                // The request was made but no response was received
                showToast('error', 'No response from server. Please check your network.');
            } else {
                // Something happened in setting up the request that triggered an Error
                showToast('error', 'Error in setting up the request: ' + error.message);
            }
            console.error('Logout error:', error);
        });
    }
    
})

export { auth }