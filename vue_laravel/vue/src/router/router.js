import { createRouter, createWebHistory } from "vue-router";
import { auth } from '../store/auth';
import Dashboard from '../views/dashboard.vue';
import Projects from '../views/projectList.vue';
import createProject from '../views/projectForms.vue';
import updateProject from '../views/projectUpdate_form.vue'
import Form from '../views/forms.vue';
import Login from '../views/login.vue';
import Registration from '../views/registration.vue';

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: Dashboard,
        meta: { requiresAuth: true }
    },
    {
        path: '/projects',
        name: 'projects',
        component: Projects,
        meta: { requiresAuth: true, rolesAllowed: ['admin65'] } // Only admin can access
    },
    {
        path: '/create-project',
        name: 'createProject',
        component: createProject,
        meta: { requiresAuth: true, rolesAllowed: ['admin65'] } // Only admin can access
    },
    {
        path: '/update-project/:id',
        name: 'updateProject',
        component: updateProject,
        meta: { requiresAuth: true, rolesAllowed: ['admin65'] } // Only admin can access
    },
    {
        path: '/forms',
        name: 'forms',
        component: Form,
        meta: { requiresAuth: true } // Both admin and user can access
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
];

const router = createRouter({
    history: createWebHistory(),
    routes: routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const user = auth.isAuthenticated();
        
        if (!user) {
            // No user is authenticated, redirect to login
            next('/login');
        } else {
            // Check the token validity before proceeding
            auth.checkTokenValidity().then(() => {
                // If the route has role restrictions
                if (to.meta.rolesAllowed && !to.meta.rolesAllowed.includes(user.role)) {
                    // If the user doesn't have the required role, redirect to a default route (e.g., home)
                    next('/');
                } else {
                    // If the user has the required role, proceed to the route
                    next();
                }
            }).catch(() => {
                // If the token is invalid or expired, log out and redirect to login
                next('/login');
            });
        }
    } else {
        // If the route doesn't require authentication, proceed as usual
        next();
    }
});



export default router;
