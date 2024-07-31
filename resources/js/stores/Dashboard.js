import { defineStore } from "pinia";
import axios from "axios";
import { useAuth } from "./Auth";

export const useDashboard = defineStore("Dashboard", {
    state: () => {
        return {
            date_start: moment().subtract(6, "days").format("YYYY-MM-DD"),
            date_end: new Date().toISOString().substr(0, 10),
            articles : [],
            bills : [],
            capital: {},
            is_fetch:false,
            auth: useAuth(),
        }
    },
    actions: {
        getData: async function () {
            if (this.is_fetch==false) {
                this.is_fetch = true;
                await axios.get("/api/articles", {
                    params: {
                        date_start: this.date_start,
                        date_end: this.date_end
                    }
                }).then(response => {
                    this.articles = _.sortBy(response.data.articles, "date");
                    this.bills = _.sortBy(response.data.bills, "date");
                    this.capital = response.data.capital;
                    this.is_fetch = false;
                });
            }
        },
        get_amounts: function (user_id) {
            let data = [];
            this.dates.forEach(date => {
                let sum = _.sumBy(this.articles.filter(article => (
                    !article.is_private
                    && article.user_id == user_id
                    && article.date == date)
                ), "price");
                data.push(sum)
            });
            return data;
        }
    },
    getters: {
        amounts_none_private: (state) => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.articles.filter(article => (
                    state.auth.getAuth.id == article.user_id
                    && article.date == date
                    && article.is_private == false)
                ), "price");
                data.push(sum)
            });
            return data;
        },
        amounts_private: (state) => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.articles.filter(article => (
                    state.auth.getAuth.id == article.user_id
                    && article.date == date
                    && article.is_private)
                ), "price");
                data.push(sum)
            });
            return data;
        },
        amounts_all: (state) => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.articles.filter(article => (
                    state.auth.getAuth.id == article.user_id
                    && !article.is_private
                    && article.date == date)
                ), "price");
                data.push(sum)
            });
            return data;
        },
        amounts_brotherhood: (state) => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.articles.filter(article => (
                    state.auth.getAuth.id != article.user_id
                    && article.date == date
                    && article.is_private==false)
                ), "price");
                data.push(sum)
            });
            return data;
        },
        amount_bills: state => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.bills.filter(bill => (bill.date == date)
                ), "amount");
                data.push(sum)
            });
            return data;
        },
        amount_articles: state => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.articles.filter(article => (article.date == date && !article.is_private)
                ), "price");
                data.push(sum)
            });
            return data;
        },
        dates: (state) => {
            return [...new Set(state.articles.map(article => article.date))];
        },
        dates_format: (state) => {
            return state.dates.map(e => moment(e).format("MM/DD/YYYY"));
        },
        total_bills: (state) => {
            return _.sum(state.amount_bills);
        },
        total_articles: (state) => {
            return _.sum(state.amount_articles);
        },
        total_compare: (state) => {
            return state.total_articles-state.total_bills;
        },
        total_none_private: (state) => {
            return _.sum(state.amounts_none_private);
        },
        total_private: (state) => {
            return _.sum(state.amounts_private);
        },
        total_all: (state) => {
            return state.total_none_private + state.total_private;
        },
        total_brotherhood: (state) => {
            return _.sum(state.amounts_brotherhood);
        },
        total_global: (state) => {
            return _.sum([state.total_brotherhood, state.total_all]);
        },
    }
});