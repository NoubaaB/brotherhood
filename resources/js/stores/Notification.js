import axios from "axios";
import { defineStore } from "pinia";

export const useNotification = defineStore("Notification", {
    state: () => {
        return {
            notifications: [],
            next_page_url: "/api/notifications",
            unread: 0,
            domain:"127.0.0.1:8000"
        }
    },
    actions: {
        init: async function () {
            return await axios.get(this.next_page_url, {
                params: {
                    domain : this.domain
                }
            }).then(res => {
                this.notifications.push(...res.data.notifications.data);
                this.unread = res.data.count;
                this.next_page_url = res.data.notifications.next_page_url;
                return this.notifications.length;
            })
        },
        decrementNotificationCounter: function () {
            let notifications = this.notifications.filter(notification => notification.read == false);
            this.unread -= notifications.length;
            notifications.map(notification => notification.read = true);
        }
    },
    getters: {
        length: state => {
            return state.notifications.length;
        }
    }
});