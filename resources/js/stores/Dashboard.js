import { defineStore } from "pinia";
import axios from "axios";

export const useDashboard = defineStore("Dashboard", {
    state: () => {
        return {
            amounts_to_brothers : [],
            amounts_to_self : [],
            amounts_to_all : [],
            houres : [],
        }
    },
    actions: {

    },
    getters: {

    }
});