import {ref, reactive} from 'vue';
import router from '../router/router';
const authStore = reactive({
    isAuthenticated: localStorage.getItem('auth') == 1,
    user: JSON.parse(localStorage.getItem('user')),
    authenticate(username, password){
        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        }).then(res => res.json())
        .then(res => {
            if(res.user){
                authStore.isAuthenticated = true
                authStore.user = res.user
                localStorage.setItem('auth', 1)
                localStorage.setItem('user', JSON.stringify(res.user))
                router.push('/')
            }
        })
    },
    logout(){
        authStore.isAuthenticated = false;
        authStore.user = {}
        localStorage.setItem('auth', 0);
        localStorage.setItem('user', '{}');
        router.push('/login');
    }
});

export {authStore}