import { defineStore } from "pinia";

export const useUser = defineStore("User", {
    state: () => {
        return {
            users: []
        }
    },
    actions: {

    },
    getters: {
    }
});