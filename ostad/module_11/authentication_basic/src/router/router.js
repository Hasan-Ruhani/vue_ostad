import {createRouter, createWebHistory} from 'vue-router';

import Home from '../components/Home.vue'
import About from '../components/About.vue'
import Contact from '../components/Contact.vue'
import Blogs from '../components/Blogs.vue'
import Blog from '../components/Blog.vue'
import RightSidebar from '../components/RightSidebar.vue'
import Protected from '../components/Protected.vue'
import Login from '../components/login.vue'
import { authStore } from '../store/store';

const routes = [
    {
        path: '/',
        component: Home,
        name: 'home'
    },
    {
        path: '/about',
        component: About,
        name: 'about'
    },
    {
        path: '/contact',
        component: Contact,
        // name: 'contact'
    },
    {
        path: '/blogs',
        components:{
            default: Blogs,
            right: RightSidebar
        },
        meta:{
            requiresAuth: true
        }
        // name: 'blog'
    },
    {
        path: '/blogs/tag/:tag',     // :tag use for pass dynamic url
        components:{
            default: Blogs,
            right: RightSidebar
        },
        name: 'category'
    },
    {
        path: '/blogs/:id',   
        component: Blog,
        name: 'blog'
    },
    {
        path: '/protected',
        component: Protected,
        name: 'protected',
        meta:{
            requiresAuth: true
        }
    },
    {
        path: '/login',
        component: Login,
        name: 'login'
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !authStore.isAuthenticated){
        next('/login');
    }
    else{
        next();
    }
});

export default router

