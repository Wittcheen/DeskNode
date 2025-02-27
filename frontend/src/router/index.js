import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: () => import("@/views/Dashboard.vue"),
            meta: { requiresAuth: true }
        },
        {
            path: "/auth/login",
            component: () => import("@/views/Login.vue")
        }
    ]
});

export default router
