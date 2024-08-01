import axios from "axios";
import { defineStore } from "pinia";

export const useProduct = defineStore("Product", {
    state: () => {
        return {
            collect: []
        }
    },
    actions: {
        postProduct:async function (name) {
            await axios.post('/api/products', {
                name
            }).then(res => {
                this.collect.push(res.data.product)
                return res
            })
        }
    },
    getters: {
    }
});