import { defineStore } from "pinia";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useDashboard } from "./Dashboard";
import { useAuth } from "./Auth";

export const useArticle = defineStore("Article", {
    state: () => {
        return {
            model: {
                id:uuidv4,
                date: new Date().toISOString().substr(0, 10),
                description: "",
                price: null,
                is_private: false,
                star: false,
                product_id: null,
            },
            models: [
                {
                    id: uuidv4(),
                    date: new Date().toISOString().substr(0, 10),
                    description: "",    
                    price: null,
                    is_private: false,
                    star: false,
                    product_id: null,
                }
            ],
            article_filter: ["0","3"],
            dashboard: useDashboard(),
            auth : useAuth()
        }
    },
    actions: {
        deleteArticle: async function (id) {
            await axios.delete(`/api/articles/${id}`).then(res => {
                this.dashboard.articles = this.dashboard.articles.filter(e=>e.id != id)
                return res
            })
        },
        postArticles: async function () {
            return await axios.post("/api/articles", {
                articles: this.models
            }).then(res => {
                this.models = [{
                    id: uuidv4(),
                    date: new Date().toISOString().substr(0, 10),
                    description: "",
                    price: null,
                    is_private: false,
                    star: false,
                    product_id: null,
                }];
                return res;
            }).catch(error => {
                console.log("error",error)
            })
        },
        getArticle: async function (id) {
            return await axios.get(`/api/articles/${id}`).then(res => {
                return res.data.article
            })
        },
        updateArticle: async function (_article) {
            await axios.patch(`/api/articles/${_article.id}`, {
                article:_article
            }).then(res => {
                let article = this.dashboard.articles.find(e => e.id == _article.id);
                if (article) {
                    article.date = res.data.article.date;
                    article.name = res.data.article.name;
                    article.description = res.data.article.description;
                    article.price = res.data.article.price;
                    article.is_private = res.data.article.is_private;
                    article.star = res.data.article.star;
                    article.product_id = res.data.article.product_id;
                }
            })
        },
        cancelBill: async function (_article) {
            await axios.patch(`/api/articles/${_article.id}`, {
                article: {
                    bill_id:null
                },
                update_bill: true
            }).then(res => {
                let article = this.dashboard.articles.find(e => e.id == _article.id);
                if (article) {
                    article.bill_id = res.data.article.bill_id;

                }
            })
        },
        makeBill: async function () {
            return await axios.post(`/api/bills`, {
                articles: this.getBillQueue.map(e => e.id),
            }).then(res => {
                this.getBillQueue.forEach(_bill_article => {
                    let article = this.dashboard.articles.find(e => e.id == _bill_article.id);
                    article.bill_id = res.data.bill.id;
                })
                return res.data.bill
            }).catch(error => {
                return true
                console.log("error", error)
            })
        },
        toggleBill: function (article_id) {
            let article = this.dashboard.articles.find(_article => _article.id == article_id);
            if (article) {
                article.bill_id = !article.bill_id
            }
        },
        toggleBills: function (value) {
            this.articles.forEach(article => article.bill_id = !value);
        },
        resetBillPlanning: function () {
            this.getBillQueue.map(article => article.bill_id = false)  
        },
        addArticle: function () {
            this.models.push(
                {
                    id: uuidv4(),
                    date: new Date().toISOString().substr(0, 10),
                    description: "",
                    price: null,
                    is_private: false,
                    star: false,
                    product_id: null,
                }
            )
        }
    },
    getters: {
        articles: (state) => {
            let data = [];
            if (state.article_filter.find(e => e == "0")) {
                data.push(...state.regular_articles.filter(article => (
                    state.auth.getAuth.id == article.user_id)));
            }
            if (state.article_filter.find(e => e == "1")) {
                data.push(...state.regular_articles.filter(article => (!article.is_private &&
                    (article.user_id != state.auth.getAuth.id))));
            }
            if (state.article_filter.find(e => e == "2")) {
                data = data.filter(article => article.bill_id);
            }
            if (state.article_filter.find(e => e == "3")) {
                data = data.filter(article => !article.is_private);
            } else {
                data = data.filter(article => article.is_private);
            }
            return _.orderBy(data, ["star", "date"], ["desc","desc"]);
        },
        total_articles: (state) => {
            return _.sumBy(state.articles, "price");
        },
        total_articles_selected: (state) => {
            return _.sumBy(state.getBillQueue, "price");
        },
        getBillQueue: (state) => {
            return state.regular_articles.filter(article=>article.bill_id === true)
        },
        regular_articles: (state) => {
            return state.dashboard.articles.filter(article => (article.user_id == state.auth.getAuth.id)
                || (article.user_id != state.auth.getAuth.id && !article.is_private))
        }
    }
});