import axios from "axios";
import { defineStore } from "pinia";

export const useNotification = defineStore("Notification", {
    state: () => {
        return {
            notifications: [],
            page: 1,
            unread: 1,
            domain:"127.0.0.1:8000"
        }
    },
    actions: {
        init: async function () {
            return await axios.get("/api/notifications", {
                params: {
                    page : this.page,
                    domain : this.domain
                }
            }).then(res => {
                console.log("res.data.notifications.data", res.data.notifications.data)
                this.notifications = res.data.notifications.data;
                this.unread = res.data.count;
                return this.notifications.length;
            })
        }

    },
    getters: {
        length: state => {
            return state.notifications.length;
        }
    }
});