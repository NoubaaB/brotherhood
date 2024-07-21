import { defineStore } from "pinia";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useDashboard } from "./Dashboard";

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
            dashboard:useDashboard()
        }
    },
    actions: {
        deleteItem: async function (id) {
            await axios.delete(`/api/items/${id}`).then(res => {
                this.dashboard.items = this.dashboard.items.filter(e=>e.id != id)
                return res
            })
        },
        postItems: async function () {
            return await axios.post("/api/items", {
                items: this.models
            }).then(res => {
                this.models = [];
                return res;
            })
        }
    },
    getters: {
    }
});