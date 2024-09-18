import axios from "axios";
import { defineStore } from "pinia";
import { useDashboard } from "@/stores/Dashboard";

export const useInvoice = defineStore("Invoice", {
    state: () => {
        return {
            invoices: [],
            dashboard:useDashboard()
        }
    },
    actions: {
        getInvoice: async function (id) {
            this.dashboard.fetching = true;
            return await axios.get(`/api/invoices/${id}`).then(res => {
                this.dashboard.fetching = false;
                return res.data.bill_id
            })
        },
        getInvoices: async function () {
            this.dashboard.fetching = true;
            return await axios.get(`/api/invoices/`).then(res => {
                this.invoices = res.data.invoices;
                this.dashboard.fetching = false;
                return res.data.invoices
            })
        },
    },
    getters: {
    }
});