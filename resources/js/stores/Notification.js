import axios from "axios";
import moment from "moment";
import { defineStore } from "pinia";

export const useNotification = defineStore("Notification", {
    state: () => {
        return {
            notifications: [],
            avatars: [
                {
                    model: "Article",
                    avatar: "/storage/article.gif"
                },
                {
                    model: "Bill",
                    avatar: "/storage/bill.gif"
                },
                {
                    model: "Capital",
                    avatar: "/storage/capital.gif"
                },
            ],
            operations: [
                {
                    operation: "Edit",
                    icon: "mdi-pencil",
                    color: "green",
                },
                {
                    operation: "Create",
                    icon: "mdi-star",
                    color: "amber",
                },
                {
                    operation: "Delete",
                    icon: "mdi-delete-alert",
                    color: "red",
                },
            ],
            snackBar:null,
            next_page_url: "/api/notifications",
            current_page_num: 1,
            unread: 0,
            is_fetch:false
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
        },
        addToSnackBar: function (notification) {
            let message = {
                "type": "info",
                "title": `${notification.trigger_user.name} has ${notification.operation} an ${notification.model}`,
                "text": moment(notification.created_at).fromNow(),
                "duration": 3000,
                "avatar": this.avatars.find(avatar => avatar.model == notification.model).avatar,
                "icon": this.operations.find(operation => operation.operation == notification.operation),
            };
            this.snackBar.add(message);
        }
    },
    getters: {
        length: state => {
            return state.notifications.length;
        },
        getNotifications: state => {
            return _.orderBy(state.notifications, ["created_at", "model"], ["desc","desc"])
        }
    }
});