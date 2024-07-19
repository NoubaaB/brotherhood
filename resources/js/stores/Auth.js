import { defineStore } from "pinia";
import axios from "axios";

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
            token: null
        }
    },
    actions: {
        attemp: async function () {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("token")}`;
            return await axios.get("/api/me").then(async response => {
                this.user = response.data.user;
                return this.user;
            })
        },
        login: async function () {
            return axios.post("/api/login", {
                email: this.model.email,
                password: this.model.password,
            }).then(async response => {
                this.user = response.data.user;
                this.token = response.data.token;
                localStorage.setItem('token', this.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`;
                return response.data;
            });
        },
        set_user: function (user) {
            this.user = user;
        },
        logout: async function () {
            console.log("logout");
            return await axios.post("/api/logout",).then(response => {
                this.user = null;
                this.token = null;
                return response.data;
            });
        },
    },
    getters: {
        getAuth: (state) => {
            return state.user;
        },
        is_auth: (state) => {
            return state.user != null;
        },
        get_full_name: (state) => {
            return state.user.name;
        },
    }
});