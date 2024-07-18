import { defineStore } from "pinia";
import axios from "axios";

export const useDashboard = defineStore("Dashboard", {
    state: () => {
        return {
            date_start: new Date().toISOString().substr(0, 10),
            date_end: moment().subtract(7, "days").format("YYYY-MM-DD"),
            amounts_to_brothers: [2,8,69,35,4,8,45,36,2],
            amounts_to_self : [0,6,74,85,2,1,2,3,1],
            amounts_to_all : [3,4,9,7,2,52,32,14,53],
            houres : [1,2,3,4,5,6,7,8,9],
        }
    },
    actions: {

    },
    getters: {

    }
});