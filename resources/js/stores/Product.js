import axios from "axios";
import { defineStore } from "pinia";

export const useProduct = defineStore("Product", {
    state: () => {
        return {
            collect: []
        }
    },
    actions: {
        postProduct:async function (name,user_id) {
            return await axios.post('/api/products', {
                name,
                user_id
            }).then(res => {
                this.collect.push(res.data.product)
                return res
            })
        }
    },
    getters: {
    }
});