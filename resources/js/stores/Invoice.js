import axios from "axios";
import { defineStore } from "pinia";

export const useInvoice = defineStore("Invoice", {
    state: () => {
        return {
        }
    },
    actions: {
        getInvoice: async function (id) {
            return await axios.get(`/api/invoices/${id}`).then(res => {
                return res.data.bill_id
            })
        }
    },
    getters: {
    }
});