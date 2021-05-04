import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/dashboard',
        component: () => import('../views/dashboard/Header.vue'),
        children: [
            {
                path: 'team',
                name: 'Team',
                component: () => import('../views/dashboard/Team.vue')
            },
            {
                path: '',
                name: 'Dashboard',
                component: () => import('../views/dashboard/Dashboard.vue')
            },
        ]
    },
    {
        path: '/settings',
        component: () => import('../views/dashboard/Header.vue'),
        children: [
            {
                path: '',
                name: 'Settings',
                component: () => import('../views/dashboard/Settings.vue'),
                children: [
                    {
                        path: 'billing',
                        name: 'Billing',
                        component: () => import('../components/loggedIn/Billing.vue')
                    },
                ]
            },
        ]
    },
    {
        path: '/resetpassword',
        name: 'ResetPassword',
        component: () => import('../views/ResetPassword.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
