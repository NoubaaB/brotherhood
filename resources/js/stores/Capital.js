import axios from "axios";
import moment from "moment";
import { defineStore } from "pinia";
export const useCapital = defineStore("Capital", {
    state: () => {
        return {
            capitals: [],
            is_fetch: false
        }
    },
    actions: {
        getData:async function () {
            await axios.get("/api/capitals").then(res =>{
                this.capitals = res.data.capitals;
            })
        },
        updateCapital: async function (capital_id, form) {
            this.is_fetch = true;
            if (form.date_start) {
                form.date_start = moment(form.date_start).format("YYYY-MM-DD")
            }
            if (form.date_end) {
                form.date_end = moment(form.date_end).format("YYYY-MM-DD")
            }
            return await axios.patch(`/api/capitals/${capital_id}`, {
                ...form
            }).then(res => {
                let capital = this.capitals.find(capital => capital.id == capital_id);
                if (capital) {
                    capital.amount = res.data.capital.amount;
                    capital.date_start = res.data.capital.date_start;
                    capital.date_end = res.data.capital.date_end;
                }
                this.is_fetch = false;
                return res.data.capital;
            })
        },
        postCapital: async function (form) {
            this.is_fetch = true;
            if (form.date_start) {
                form.date_start = moment(form.date_start).format("YYYY-MM-DD")
            }
            if (form.date_end) {
                form.date_end = moment(form.date_end).format("YYYY-MM-DD")
            }
            await axios.post("/api/capitals", {
                ...form
            }).then(res => {
                this.capitals.push(res.data.capital);
                this.is_fetch = false;
                return res.data.capital;
            })
        },
        deleteCapital: async function (capital_id) {
            await axios.delete(`/api/capitals/${capital_id}`).then(res => {
                this.capitals = this.capitals.filter(capital => capital_id != capital.id);
                return res
            })
        }
    },
    getters: {
    }
});