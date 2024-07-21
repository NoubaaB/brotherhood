import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "./stores/Auth";

const routes = [
    {
        path: "/error/404",
        name: "error404",
        component: () => import("@/components/error/404.vue"),
    },
    
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        beforeEnter: function (to, from, next) {
            next({ name: "error404" })
        }
    },
    {
        path: "/",
        meta: { keeplive: true },
        children: [
            {
                path: "/",
                name: "dashbaord",
                beforeEnter: function (to, from, next) {
                    if (useAuth().is_auth) next();
                    else next({ name: "login" });
                },
                children: [
                    {
                        path: "/",
                        name: "index",
                        component: () => import("@/components/dashboard/index.vue"),
                    },
                    {
                        path: "/items",
                        redirect: { name: 'items.list' },
                        children: [
                            {
                                path: "list",
                                name: "items.list",
                                component: () => import("@/components/items/List.vue"),
                            },
                            {
                                path: "create",
                                name: "items.create",
                                component: () => import("@/components/items/Create.vue"),
                            },
                            {
                                path: "update/:id",
                                name: "items.update",
                                component: () => import("@/components/items/Update.vue"),
                            },
                        ],
                    },
                ]
            },
            {
                path: "auth",
                name: "auth",
                redirect: { name: 'login' },
                beforeEnter: function (to, from, next) {
                    if (useAuth().is_auth) next({ name: 'index' });
                    next();
                },
                children: [
                    {
                        path: "login",
                        name: "login",
                        component: () => import("@/components/auth/Layout.vue"),
                    }
                ]
            },
        ]
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
