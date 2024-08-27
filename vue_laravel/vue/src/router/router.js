import { createRouter, createWebHistory } from "vue-router";
import Dashboard from '../views/dashboard.vue'
import Projects from '../views/projectList.vue'
import createProject from '../views/projectForms.vue'
import Form from '../views/forms.vue'

import Login from '../views/login.vue'
import Registration from '../views/registration.vue'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard
    },

    {
        path: '/projects',
        name: 'projects',
        component: Projects
    },

    {
        path: '/create-project',
        name: 'createProject',
        component: createProject
    },

    {
        path: '/forms',
        name: 'forms',
        component: Form
    },

    {
        path: '/login',
        name: 'login',
        component: Login
    },

    {
        path: '/create',
        name: 'registration',
        component: Registration
    },
]



const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;