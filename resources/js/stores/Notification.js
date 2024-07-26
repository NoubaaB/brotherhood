import axios from "axios";
import { defineStore } from "pinia";

export const useNotification = defineStore("Notification", {
    state: () => {
        return {
            notifiactions: [],
            page: 1,
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
                this.notifiactions = res.data.notifiactions;
                return this.notifiactions.length;
            })
        }

    },
    getters: {
        length: state => {
            return state.notifiactions.length;
        }
    }
});