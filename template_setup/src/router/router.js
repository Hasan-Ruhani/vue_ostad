import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/homePage.vue'
import About from '../views/aboutPage.vue'
import Blog from '../views/blogPage.vue'
import Service from '../views/sercicePage.vue'
import Contact from '../views/contactPage.vue'

import Feature from '../views/featurePage.vue'
import Product from '../views/productPage.vue'
import Team from '../views/teamPage.vue'
import Testimonial from '../views/testimonialPage.vue'
import Error from '../views/404Page.vue'

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },

    {
        path: '/about',
        name: 'about',
        component: About
    },
    {
        path: '/blog',
        name: 'blog',
        component: Blog
    },
    
    {
        path: '/service',
        name: 'service',
        component: Service
    },

    {
        path: '/contact',
        name: 'contact',
        component: Contact
    },
    {
        path: '/feature',
        name: 'feature',
        component: Feature
    },
    {
        path: '/product',
        name: 'product',
        component: Product
    },
    {
        path: '/team',
        name: 'team',
        component: Team
    },
    {
        path: '/testimonial',
        name: 'testimonial',
        component: Testimonial
    },
    {
        path: '/error',
        name: '404',
        component: Error
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

export default router