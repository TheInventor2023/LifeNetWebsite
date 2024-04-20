import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // basic navigation
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/home',
            name: 'homepath',
            component: () => import( '@/views/HomeView.vue'),
        },
        {
            path: '/contact',
            name: 'contact',
            component: () => import( '@/views/ContactView.vue'),
        },
        {
            path: '/my-account',
            name: 'my-account',
            component: () => import( '@/views/users/UserHome.vue'),
        },
        {
            path: '/goodbye',
            name: 'goodbye',
            component: () => import( '@/views/misc/Goodbye.vue'),
        },

        // auth stuff
        {
            path: '/auth/login',
            name: 'login',
            component: () => import( '@/views/auth/LoginPage.vue'),
        },
        {
            path: '/auth/register',
            name: 'registration',
            component: () => import( '@/views/auth/RegistrationPage.vue'),
        },

        // legal stuff
        {
            path: '/legal/tos',
            name: 'termsofservice',
            component: () => import( '@/views/legal/TermsOfService.vue'),
        },
        {
            path: '/legal/privacy',
            name: 'privacypolicy1',
            component: () => import( '@/views/legal/PrivacyPolicy.vue'),
        },
        {
            path: '/legal/privacy-policy',
            name: 'privacypolicy2',
            component: () => import( '@/views/legal/PrivacyPolicy.vue'),
        },

        // admin
        {
            path: '/admin/home',
            name: 'adminhome',
            component: () => import( '@/views/admin/AdminHome.vue'),
        },
        {
            path: '/admin/roles',
            name: 'editroles',
            component: () => import( '@/views/admin/EditUserRoles.vue'),
        },
        // catchall
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/views/misc/NotFound.vue') },
    ],
});

export default router;
