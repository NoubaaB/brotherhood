import { defineStore } from "pinia";
import axios from "axios";

export const useItem = defineStore("Item", {
    state: () => {
        return {
            model: {
                date: new Date().toISOString().substr(0, 10),
                description: "",
                price: null,
                is_private: false,
                product_id: null,
            },
            products:[]
        }
    },
    actions: {
        
    },
    getters: {
    }
});