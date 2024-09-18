import axios from "axios";
import { defineStore } from "pinia";
import { useDashboard } from "@/stores/Dashboard";
import { useAuth } from "@/stores/Auth";

export const useBill = defineStore("Bill", {
    state: () => {
        return {
            date_start: moment().subtract(6, "days").format("YYYY-MM-DD"),
            date_end: new Date().toISOString().substr(0, 10),
            is_fetch: false,
            bill_checked: false,
            dashboard: useDashboard(),
            auth: useAuth(),
        }
    },
    actions: {
        getData: async function () {
            if (this.is_fetch == false) {
                this.is_fetch = true;
                this.dashboard.fetching = true;
                await axios.get("/api/bills", {
                    params: {
                        date_start: this.date_start,
                        date_end: this.date_end
                    }
                }).then(response => {
                    this.dashboard.bills = _.sortBy(response.data.bills, "date");
                    this.is_fetch = false;
                    this.dashboard.fetching = false;
                });
            }
        },
        getBill: async function (id) {
            this.dashboard.fetching = true;
            return await axios.get(`/api/bills/${id}`).then(res => {
                this.dashboard.fetching = false;
                return res.data.bill
            })
        },
        deleteBill: async function (bill_id) {
            return axios.delete(`/api/bills/${bill_id}`).then(res => {
                this.dashboard.bills = this.dashboard.bills.filter(e=>e.id != bill_id)
                return res
            })
        },
        deleteBills: async function () {
            let bills_ids = this.dashboard.bills.filter(bill => bill.selected == true).map(bill => bill.id);
            return axios.post(`/api/bills_collect`, {
                bills: bills_ids
            }).then(res => {
                this.dashboard.bills = this.dashboard.bills.filter(e => !bills_ids.includes(e.id))
                return res
            }).catch(error => {
                console.log("error", error)
            })
        },
        toggleBill: function (bill_id) {
            let bill = this.dashboard.bills.find(bill => bill.id == bill_id);
            if (bill) {
                bill.selected = !bill.selected;
            }
        },
        cancelBill: function () {
            
        },
        toggleInvoice: function (invoice_bill,checked) {
            axios.put(`/api/invoices/${invoice_bill}`, {
                checked
            })
        },
        unBillArticle: async function (article_id,bill_id) {
            return axios.patch(`/api/articles/${article_id}`, {
                article: {
                    bill_id: null
                },
                update_bill:true
            }).then(res => {
                let bill = this.dashboard.bills.find(bill => bill.id == bill_id)
                if (bill) {
                    bill.articles = bill.articles.filter(article => article.id != article_id)
                    bill.amount = _.sumBy(bill.articles, "price");
                    return false
                } else {
                    return true
                }
            });
        }
    },
    getters: {
        getBillQueue: state => {
            return state.dashboard.bills.filter(bill => bill.selected === true);
        },
        total_bills: (state) => {
            return _.sumBy(state.dashboard.bills, "amount");
        },
        total_bills_filtred: (state) => {
            return _.sumBy(state.bills, "amount");
        },
        bills: state => {
            return _.orderBy(state.dashboard.bills, ["date", "id"], ["desc", "desc"]);
        }
    }
});