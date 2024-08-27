import { createRouter, createWebHistory } from "vue-router";

import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Contact from '../components/Contact.vue';
import Product from '../components/Product.vue';
import Products from '../components/Products.vue';
import Sidebar from '../components/Sidebar.vue';
import Protected from '../components/Protected.vue';
import Admin from '../components/Admin.vue';
import Editor from '../components/Editor.vue';
import Cart from '../components/Cart.vue';
import Orders from '../components/Orders.vue';
import Login from '../components/Login.vue';

import { authStore } from "../store/store";

const routes = [
    {
        path: '/',
        components: {
            default: Home,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/about',
        components: {
            default: About,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/admin',
        components: {
            default: Admin,
            LeftSideBar: Sidebar
        },
        meta:{                              
            requiresAuth: true
        }
    },
    {
        path: '/editor',
        components: {
            default: Editor,
            LeftSideBar: Sidebar
        },
        meta:{                              
            requiresAuth: true
        }
    },
    {
        path: '/login',
        components: {
            default: Login,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/contact',
        components: {
            default: Contact,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/products',
        components: {
            default: Products,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/products/:id',
        components: {
            default: Product,
            LeftSideBar: Sidebar
        },
        name: 'product',
    },
    {
        path: '/cart',
        components: {
            default: Cart,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/orders',
        components: {
            default: Orders,
            LeftSideBar: Sidebar
        }
    },
    {
        path: '/protected',
        components: {
            default: Protected,
            LeftSideBar: Sidebar
        },
        name: 'protected',
        meta:{                               
            requiresAuth: true
        }
    }
]

// const isAuthenticated = () => {
//     return localStorage.getItem('token') == '123';
// }

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

router.beforeEach((to, from, next) => {
    if(to.meta.requiresAuth && !authStore.isAuthenticated){
        next('/login');
    }
    else{
        next();
    }
});

export default router;