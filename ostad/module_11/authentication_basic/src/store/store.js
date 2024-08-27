import {ref, reactive} from 'vue'
const authStore = reactive ({
    isAuthenticated: false,
    authenticate(){
        authStore.isAuthenticated = true
    },
    logout(){
        authStore.isAuthenticated = false
    }
});

export {authStore}