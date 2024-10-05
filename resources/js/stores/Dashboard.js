import { defineStore } from "pinia";
import axios from "axios";
import { useAuth } from "./Auth";

export const useDashboard = defineStore("Dashboard", {
    state: () => {
        return {
            date_start: moment().subtract(6, "days").format("YYYY-MM-DD"),
            date_end: new Date().toISOString().substr(0, 10),
            articles : [],
            bills: [],
            bills_dates: [],
            score_bills:[],
            capital: {},
            is_fetch:false,
            fetching:false,
            delete_dialog: false,
            delete_model_name:"",
            deleteModel:null,
            auth: useAuth(),
        }
    },
    actions: {
        getData: async function () {
            if (this.is_fetch==false) {
                this.is_fetch = true;
                this.fetching = true;
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
                    this.fetching = false;
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
                data.push(+sum.toFixed(2))
            });
            return data;
        },
        isLessThanTwoDays:function (date) {
            const now = moment(); // Get the current date and time
            const diffInDays = now.diff(moment(date), 'days'); // Calculate the difference in days
            return diffInDays < 2
        }
    },
    getters: {
        amounts_private: (state) => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.articles.filter(article => (
                    state.auth.getAuth.id == article.user_id
                    && article.date == date
                    && article.is_private)
                ), "price");
                data.push(+sum.toFixed(2));
            });
            return data;
        },
        amount_you_spent: (state) => {
            let data = [];
            state.dates.forEach(date => {
                let articles = state.articles.filter(article => article.date == date);
                let _data = [];
                articles.forEach(article => {
                    let _bill = state.bills.find(bill => bill.id == article.bill_id);
                    if (_bill) {
                        _data.push(article.price / _bill.invoices.length);
                    }
                });
                let sum = _.sum(_data);
                data.push(+sum.toFixed(2));
            });
            return data;
        },
        amount_you_spent_raw: (state) => {
            let data = [];
            state.dates.forEach(date => {
                let articles = state.articles.filter(article => 
                    state.auth.getAuth.id == article.user_id
                    && article.date == date
                    && article.is_private == false
                );
                let sum = _.sumBy(articles,"price");
                data.push(+sum.toFixed(2));
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
                data.push(+sum.toFixed(2));
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
                data.push(+sum.toFixed(2));
            });
            return data;
        },
        amount_bills: state => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.bills.filter(bill => (bill.date == date)
                ), "amount");
                data.push(+sum.toFixed(2));
            });
            return data;
        },
        amount_articles: state => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.articles.filter(article => (article.date == date && !article.is_private)
                ), "price");
                data.push(+sum.toFixed(2));
            });
            return data;
        },
        dates: (state) => {
            return _.uniq([...new Set(state.articles.map(article => article.date)), ...new Set(state.bills.map(bill => bill.date))]);
        },
        dates_format: (state) => {
            return state.dates.map(e => moment(e).format("YYYY-MM-DD"));
        },
        total_bills: (state) => {
            return _.sum(state.amount_bills);
        },
        total_articles: (state) => {
            return _.sum(state.amount_articles);
        },
        total_compare: (state) => {
            return (state.total_articles-state.total_bills);
        },
        total_global: (state) => {
            return (state.total_amount_you_spent + state.total_brotherhood);
        },
        total_amount_you_spent: (state) => {
            return _.sum(state.amount_you_spent_raw);
        },
        total_amount_private: (state) => {
            return _.sum(state.amounts_private);
        },
        total_all: (state) => {
            return (state.amount_you_spent_raw + state.total_amount_private);
        },
        total_brotherhood: (state) => {
            return _.sum(state.amounts_brotherhood);
        },
        get_grouping_labels: (state) => {
            return _.uniqBy(state.articles.map(articel => {
                return {
                    product_id:articel.product_id,
                    name:articel.product.name,
                }
            }),"product_id");
        },
        get_grouping_series: (state) => {
            let data = [];
            state.get_grouping_labels.forEach(e => {
                let total = state.articles.filter(article => (article.product_id == e.product_id)).map(article => {
                    if (article.is_private) {
                        return article.price;
                    }
                    return article.price / (article.users_id.length > 0 ? article.users_id.length : 1);
                });
                data.push(_.sum(total));
            });
            return data;
        }
    }
});