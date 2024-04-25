import { createWebHistory, createRouter } from "vue-router";
const routes = [
    // Home page views
    {
        path: "/",
        name: "bookHome",
        component: () => import("@/views/BookHome.vue"),
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/register",
        name: "register",
        component: () => import("@/views/Register.vue"),
    },
    {
        path: "/bookBorrow/:id",
        name: "bookBorrow",
        component: () => import("@/views/BookBorrow.vue"),
        props: true,
    },
    // Page not found
    {
        path: "/:pathMatch(.*)*",
        name: "notFount",
        component: () => import("@/views/NotFound.vue"),
    },
    // Book details
    {
        path: "/details/:id",
        name: "bookDetails",
        component: () => import("@/views/BookDetails.vue"),
        props: true,
    }
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;