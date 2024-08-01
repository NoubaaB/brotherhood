import axios from "axios";
import { defineStore } from "pinia";
export const useUser = defineStore("User", {
    state: () => {
        return {
            users: [],
            is_fetch:false
        }
    },
    actions: {
        updateUser: async function (user_id, form) {
            this.is_fetch = true;
            await axios.patch(`/api/users/${user_id}`, {
                ...form
            }).then(res => {
                let user = this.users.find(user => user.id == user_id);
                if (user) {
                    user.name = res.data.user.name;
                    user.email = res.data.user.email;
                    user.avatar = res.data.user.avatar;
                    user.created_at = res.data.user.created_at;
                }
                this.is_fetch = false;
                return res.data.user;
            })
        },
        postUser: async function (form) {
            this.is_fetch = true;
            await axios.post("/api/users", {
                ...form
            }).then(res => {
                this.users.push(res.data.user);
                this.is_fetch = false;
                return res.data.user;
            })
        }
    },
    getters: {
    }
});