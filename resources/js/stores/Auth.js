import { defineStore } from "pinia";
import axios from "axios";
import { useProduct } from "@/stores/Product"
import { useNotification } from "@/stores/Notification";
import { useUser } from "@/stores/User";
import { establish } from "@/plugins/handleSocket";
import { useDashboard } from "@/stores/Dashboard";


export const useAuth = defineStore("Auth", {
    state: () => {
        return {
            model: {
                name: null,
                address: null,
                image: null,
                email: null,
                password: null,
                confirmPassword: null
            },
            drawer: null,
            user: null,
            token: null,
            dashboard: useDashboard(),
            product: useProduct(),
            _user: useUser(),
            notification: useNotification(),
        }
    },
    actions: {
        attemp: async function () {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
            this.dashboard.fetching = true;
            return await axios.get("/api/me").then(async response => {
                this.user = response.data.user;
                this.dashboard.bills_dates = response.data.bills_dates;
                this.dashboard.article_marks = response.data.article_marks;
                this.dashboard.count_non_bill_articles = response.data.count_non_bill_articles;
                this.dashboard.count_invoices_not_checked = response.data.count_invoices_not_checked;
                if (!this.user.activate) {
                    this.dashboard.fetching = false;
                    return 0;
                }
                this._user.users = response.data.users.map(user => {
                    user.activate = !!user.activate;
                    return user;
                });
                this.product.collect = response.data.products;
                if (this.user) {
                    this.notification.init();
                    establish();
                    this.subscribe();
                }
                this.dashboard.fetching = false;
                return this.user;
            })
        },
        login: async function () {
            return axios.post("/api/login", {
                email: this.model.email,
                password: this.model.password,
            }).then(async response => {
                this.user = response.data.user;
                this._user.users = response.data.users;
                this.product.collect = response.data.products;
                this.token = response.data.token;
                localStorage.setItem('token', this.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                if (this.user) {
                    this.notification.init();
                    establish();
                    this.subscribe();
                }
                return response.data;
            });
        },
        set_user: function (user) {
            this.user = user;
        },
        logout: async function () {
            console.log("logout");
            return await axios.post("/api/logout", {
                params: {
                    auth_key: JSON.parse(localStorage.getItem("web_push"))?.keys?.auth
                }
            }).then(response => {
                this.user = null;
                this.token = null;
                localStorage.removeItem("web_push");
                return response.data;
            });
        },
        subscribe: async function () {
            // Subscribe Users to Push Notifications
            await Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    // get service worker
                    if (localStorage.getItem("web_push") == null) {
                        navigator.serviceWorker.ready.then((sw) => {
                            // subscribe
                            sw.pushManager.subscribe({
                                userVisibleOnly: true,
                                // applicationServerKey: import.meta.env.VAPID_PUBLIC_KEY,
                                applicationServerKey: import.meta.env.VITE_WEB_PUSH_PUBLIC_KEY,
                            }).then(async (subscription) => {
                                localStorage.setItem("web_push", JSON.stringify(subscription))
                                await axios.post("/api/save-push-notification-sub", {
                                    'subscription': JSON.stringify(subscription)
                                })
                            });
                        });
                    }
                }
            });
        }
    },
    getters: {
        getAuth: (state) => {
            return state.user;
        },
        is_auth: (state) => {
            return state.user != null;
        },
        is_activate: (state) => {
            return state?.user?.activate;
        },
        get_full_name: (state) => {
            return state.user.name;
        },
    }
});