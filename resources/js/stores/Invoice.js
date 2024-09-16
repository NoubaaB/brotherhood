import axios from "axios";
import { defineStore } from "pinia";

export const useInvoice = defineStore("Invoice", {
    state: () => {
        return {
            invoices : [],
        }
    },
    actions: {
        getInvoice: async function (id) {
            return await axios.get(`/api/invoices/${id}`).then(res => {
                return res.data.bill_id
            })
        },
        getInvoices: async function () {
            return await axios.get(`/api/invoices/`).then(res => {
                this.invoices = res.data.invoices;
                return res.data.invoices
            })
        },
    },
    getters: {
    }
});