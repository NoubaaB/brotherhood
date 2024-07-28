import axios from "axios";
import { defineStore } from "pinia";

export const useNotification = defineStore("Notification", {
    state: () => {
        return {
            notifications: [],
            next_page_url: "/api/notifications",
            current_page_num: 1,
            unread: 0,
        }
    },
    actions: {
        init: async function () {
            if (this.next_page_url) {
                return await axios.get(this.next_page_url).
                    then(res => {
                        this.notifications.push(...res.data.notifications.data);
                        this.unread = res.data.count;
                        this.current_page_num = res.data.notifications.current_page;
                        this.next_page_url = res.data.notifications.next_page_url;
                        return this.notifications.length;
                    })
            }
            return false
        },
        decrementNotificationCounter: function () {
            let notifications = this.notifications.filter(notification => notification.read == false);
            if (notifications.length) {
                this.unread -= notifications.length;
                this.postReadNotification();
                notifications.map(notification => notification.read = true);
            }
        },
        postReadNotification: function () {
            if (this.current_page_num) {
                axios.post(`/api/notifications?page=${this.current_page_num}`)
            }
        }
    },
    getters: {
        length: state => {
            return state.notifications.length;
        }
    }
});