import axios from "axios";
import { defineStore } from "pinia";

export const useBill = defineStore("Bill", {
    state: () => {
        return {
            bills: [],
            date_start: moment().subtract(6, "days").format("YYYY-MM-DD"),
            date_end: new Date().toISOString().substr(0, 10),
            is_fetch:false
        }
    },
    actions: {
        getData: async function () {
            if (this.is_fetch == false) {
                this.is_fetch = true;
                await axios.get("/api/bills", {
                    params: {
                        date_start: this.date_start,
                        date_end: this.date_end
                    }
                }).then(response => {
                    this.bills = _.sortBy(response.data.bills, "date");
                    this.is_fetch = false;
                });
            }
        },
        getBill: async function (id) {
            return await axios.get(`/api/bills/${id}`).then(res => {
                return res.data.bill
            })
        },
        deleteBill: async function (bill_id) {
            return axios.delete(`/api/bills/${bill_id}`).then(res => {
                this.bills = this.bills.filter(e=>e.id != bill_id)
                return res
            })
        },
        deleteBills: async function () {
            let bills_ids = this.bills.filter(bill => bill.selected == true).map(bill => bill.id);
            return axios.post(`/api/bills_collect`, {
                bills: bills_ids
            }).then(res => {
                this.bills = this.bills.filter(e => !bills_ids.includes(e.id))
                return res
            })
        },
        toggleBill: function (bill_id) {
            let bill = this.bills.find(bill => bill.id == bill_id);
            if (bill) {
                bill.selected = !bill.selected;
            }
        },
        cancelBill: function () {
            
        },
        unBillArticle: async function (article_id,bill_id) {
            return axios.patch(`/api/articles/${article_id}`, {
                article: {
                    bill_id: null
                }
            }).then(res => {
                let bill = this.bills.find(bill => bill.id == bill_id)
                if (bill) {
                    bill.articles = bill.articles.filter(article => article.id != article_id)
                    return false
                } else {
                    return true
                }
            });
        }
    },
    getters: {
        getBillQueue: state => {
            return state.bills.filter(bill => bill.selected === true);
        },
        total_bills: (state) => {
            return _.sumBy(state.bills, "amount");
        },
    }
});