import axios from 'axios'
import Cookies from 'js-cookie';
import { reactive } from "vue";
import { serverURL } from './server';
import router from "../router/router";
import { showToast } from "./Toast";


const auth = reactive({
    user: JSON.parse(localStorage.getItem('user')) || null,
    authenticate(login, password) {
        fetch(`${serverURL}/user-login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ login, password }),
        })
        .then(res => {
            if (!res.ok) {
                return res.json().then(err => { throw err });
            }
            return res.json();
        })
        .then(res => {
            if (res.status === 'success') {
                Cookies.set('cookieName', 'value');

// Get a cookie
let cookieValue = Cookies.get('cookieName');
console.log(cookieValue);
                this.user = res;
                localStorage.setItem('user', JSON.stringify(res));
                localStorage.setItem('token', res.token);

                if (res.role === 'admin65') {
                    showToast('success', 'Admin Login Successfully');
                    setTimeout(() => {
                        router.push('/');
                    }, 500);
                } else {
                    showToast('success', res.message);
                    setTimeout(() => {
                        router.push('/forms');
                    }, 500);
                }
            } else {
                throw res;
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

    isAuthenticated() {
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user'));

        if (!token || !user) {
            return false; // No token or user stored
        }

        // Optionally, you could validate the token expiration here by making a request to a protected endpoint
        return user;
    },

    checkTokenValidity() {
        return fetch(`${serverURL}/token`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include',
        })
        .then(response => {
            if (response.status === 401) {
                // Token expired or invalid, log the user out
                this.logout();
                showToast('error', 'Session expired. Please log in again.');
                router.push('/login');
            }
            return response.json();
        })
        .catch(error => {
            console.error('Token validation error:', error);
            this.logout();
            router.push('/login');
        });
    },

    logout() {
        axios.get(`${serverURL}/user-logout`)
        .then(res => {
            Cookies.remove('token');
            if (res.data.status === 'success') {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                this.user = null;
                showToast('success', res.data.message);
                setTimeout(() => {
                    router.push('/login');
                }, 1000);
            } else {
                showToast('error', 'Logout failed. Please try again.');
            }
        })
        .catch(error => {
            showToast('error', 'An error occurred during logout.');
            console.error('Logout error:', error);
        });
    },
});


export { auth }