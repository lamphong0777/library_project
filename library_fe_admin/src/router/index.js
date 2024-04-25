import { createWebHistory, createRouter } from "vue-router";
import bookHome from "../views/BookHome.vue";
import pubCompanyHome from "../views/PubCompanyHome.vue";
const routes = [
    // Home page views
    // {
    //     path: "/",
    //     name: "login",
    //     component: () => import("@/views/Login.vue"),
    // },
    {
        path: "/",
        name: "bookhome",
        component: bookHome,
    },
    {
        path: "/pubcompany",
        name: "pubcompanyhome",
        component: pubCompanyHome,
    },
    {
        path: "/staff",
        name: "staffHome",
        component: () => import("@/views/StaffHome.vue"),
    },
    {
        path: "/user",
        name: "userHome",
        component: () => import("@/views/UserHome.vue"),
    },
    {
        path: "/borrow",
        name: "bBookHome",
        component: () => import("@/views/BorrowedBookHome.vue"),
    },
    // Page not found
    {
        path: "/:pathMatch(.*)*",
        name: "notFount",
        component: () => import("@/views/NotFound.vue"),
    },
    // Edit Page
    {
        path: "/books/:id",
        name: "book.edit",
        component: () => import("@/views/BookEdit.vue"),
        props: true,
    },
    {
        path: "/pubcompany/:id",
        name: "pubcompany.edit",
        component: () => import("@/views/PubCompanyEdit.vue"),
        props: true,
    },
    {
        path: "/staff/:id",
        name: "staff.edit",
        component: () => import("@/views/StaffEdit.vue"),
        props: true,
    },
    {
        path: "/user/:id",
        name: "user.edit",
        component: () => import("@/views/UserEdit.vue"),
        props: true,
    },
    // Add page
    {
        path: "/books",
        name: "book.add",
        component: () => import("@/views/BookAdd.vue"),
    },
    {
        path: "/pubcompany/add",
        name: "pubcompany.add",
        component: () => import("@/views/PubCompanyAdd.vue"),
    },
    {
        path: "/staff/add",
        name: "staff.add",
        component: () => import("@/views/StaffAdd.vue"),
    },
];


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;