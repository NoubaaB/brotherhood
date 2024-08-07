import axios from "axios";
import { defineStore } from "pinia";
export const useUser = defineStore("User", {
    state: () => {
        return {
            users: [],
            connected_users: [],
            is_fetch:false
        }
    },
    actions: {
        updateUser: async function (user_id, form) {
            this.is_fetch = true;
            return await axios.patch(`/api/users/${user_id}`, {
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
        join: function (user) {
            this.connected_users.push(user);  
        },
        leave: function (user) {
            let index = this.connected_users.findIndex(
                (u) => u.id == user.id
            );
            this.connected_users.splice(index, 1);
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
        },
        deleteUser: async function (user_id) {
            await axios.delete(`/api/users/${user_id}`).then(res => {
                this.users = this.users.filter(user => user_id != user.id);
                return res
            })
        },
        getUserImage: function (user_id) {
            return this.users.find(u=>u.id == user_id)?.image
        }
    },
    getters: {
    }
});