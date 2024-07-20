import { defineStore } from "pinia";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export const useItem = defineStore("Item", {
    state: () => {
        return {
            model: {
                id:uuidv4,
                date: new Date().toISOString().substr(0, 10),
                description: "",
                price: null,
                is_private: false,
                product_id: null,
            },
            models:[]
        }
    },
    actions: {
        deleteModel: function (id) {
            this.models = this.models.filter(e=>e.id != id)
        }
    },
    getters: {
    }
});