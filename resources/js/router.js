import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "./stores/Auth";

const routes = [
    {
        path: "/error/404",
        name: "error404",
        component: () => import("@/components/error/404.vue"),
    },
    {
        path: "/account_deactivate",
        name: "accountDeactivate",
        component: () => import("@/components/error/accountDeactivate.vue"),
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
                    if (useAuth().is_auth) {
                        if (!useAuth().user.activate) {
                            console.log("in")
                            next({ name: "accountDeactivate" })
                        } else {
                            next();
                        }
                    }
                    else next({ name: "login" });
                },
                children: [
                    {
                        path: "/",
                        name: "index",
                        component: () => import("@/components/dashboard/index.vue"),
                    },
                    {
                        path: "/articles",
                        redirect: { name: 'articles.list' },
                        children: [
                            {
                                path: "list",
                                name: "articles.list",
                                component: () => import("@/components/articles/List.vue"),
                            },
                            {
                                path: "create",
                                name: "articles.create",
                                component: () => import("@/components/articles/Create.vue"),
                            },
                            {
                                path: "update/:id",
                                name: "articles.update",
                                component: () => import("@/components/articles/Update.vue"),
                            },
                            {
                                path: "view/:id",
                                name: "articles.view",
                                component: () => import("@/components/articles/View.vue"),
                            },
                        ],
                    },
                    {
                        path: "/bills",
                        redirect: { name: 'bills.list' },
                        children: [
                            {
                                path: "view/:id",
                                name: "bills.view",
                                component: () => import("@/components/bills/View.vue"),
                            },
                            {
                                path: "list",
                                name: "bills.list",
                                component: () => import("@/components/bills/List.vue"),
                            },
                        ]
                    },
                    {
                        path: "/capital",
                        redirect: { name: 'capital.list' },
                        children: [
                            {
                                path: "list",
                                name: "capital.list",
                                component: () => import("@/components/capital/List.vue"),
                            },
                            // {
                            //     path: "view/:id",
                            //     name: "capital.view",
                            //     component: () => import("@/components/capital/View.vue"),
                            // }
                        ]
                    },
                    {
                        path: "/users",
                        redirect: { name: 'users.list' },
                        children: [
                            {
                                path: "list",
                                name: "users.list",
                                component: () => import("@/components/users/List.vue"),
                            },
                            {
                                path: "view/:id",
                                name: "users.view",
                                component: () => import("@/components/users/View.vue"),
                            }
                        ]
                    },
                    {
                        path: "/invoices",
                        redirect: { name: 'invoices.view' },
                        children: [
                            {
                                path: "view/:id",
                                name: "invoices.view",
                                component: () => import("@/components/invoices/View.vue"),
                            }
                        ]
                    }
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
