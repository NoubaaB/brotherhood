import { createRouter, createWebHistory } from "vue-router";
import { useAuth } from "./stores/Auth";

const routes = [
    {
        path: "/error/404",
        name: "error404",
        meta: { title: 'Error 404' },
        component: () => import("@/components/error/404.vue"),
    },
    {
        path: "/account_deactivate",
        name: "accountDeactivate",
        meta: { title: 'Account Deactivated' },
        component: () => import("@/components/error/accountDeactivate.vue"),
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        meta: { title: 'Error 404' },
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
                meta: { title: 'Authentication' },
                beforeEnter: function (to, from, next) {
                    if (useAuth().is_auth) {
                        if (!useAuth().is_activate) {
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
                        meta: { title: 'Home' },
                        component: () => import("@/components/dashboard/index.vue"),
                    },
                    {
                        path: "/articles",
                        meta: { title: 'Articles' },
                        redirect: { name: 'articles.list' },
                        children: [
                            {
                                path: "list",
                                name: "articles.list",
                                meta: { title: 'List Articles' },
                                component: () => import("@/components/articles/List.vue"),
                            },
                            {
                                path: "create",
                                name: "articles.create",
                                meta: { title: 'Create Article' },
                                component: () => import("@/components/articles/Create.vue"),
                            },
                            {
                                path: "update/:id",
                                name: "articles.update",
                                meta: { title: 'Update Article' },
                                component: () => import("@/components/articles/Update.vue"),
                            },
                            {
                                path: "view/:id",
                                name: "articles.view",
                                meta: { title: 'View Article' },
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
                                meta: { title: 'View Bill' },
                                component: () => import("@/components/bills/View.vue"),
                            },
                            {
                                path: "list",
                                name: "bills.list",
                                meta: { title: 'List Bills' },
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
                                meta: { title: 'List Capital' },
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
                        meta: { title: 'Users' },
                        redirect: { name: 'users.list' },
                        children: [
                            {
                                path: "list",
                                name: "users.list",
                                meta: { title: 'List Users' },
                                component: () => import("@/components/users/List.vue"),
                            },
                            {
                                path: "view/:id",
                                name: "users.view",
                                meta: { title: 'View User' },
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
                                meta: { title: 'View Invoice' },
                                component: () => import("@/components/invoices/View.vue"),
                            }
                        ]
                    }
                ]
            },
            {
                path: "auth",
                name: "auth",
                meta: { title: 'Authentication Required' },
                redirect: { name: 'login' },
                beforeEnter: function (to, from, next) {
                    if (useAuth().is_auth) next({ name: 'index' });
                    next();
                },
                children: [
                    {
                        path: "login",
                        name: "login",
                        meta: { title: 'Authentication' },
                        component: () => import("@/components/auth/Layout.vue"),
                    }
                ]
            },
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    // Set the document title from the route meta
    document.title = `${import.meta.env.VITE_APP_NAME} App - ${to.meta.title}`;
    next();
});

export default router;