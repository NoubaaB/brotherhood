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
                product_id: null,
            },
            models: [
                {
                    id: uuidv4(),
                    date: new Date().toISOString().substr(0, 10),
                    description: "",
                    price: null,
                    is_private: false,
                    product_id: null,
                }
            ],
            article_filter: [0,1],
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
        postArticle: async function () {
            return await axios.post("/api/articles", {
                article: this.models
            }).then(res => {
                this.models = [];
                return res;
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
                    article.product_id = res.data.article.product_id;
                }
            })
        },
        cancelBill: async function (_article) {
            await axios.patch(`/api/articles/${_article.id}`, {
                article: {
                    total_id:null
                }
            }).then(res => {
                let article = this.dashboard.articles.find(e => e.id == _article.id);
                if (article) {
                    article.total_id = res.data.article.total_id;

                }
            })
        },
        makeBill: async function () {
            return await axios.post(`/api/totals`, {
                articles: this.getBillQueue.map(e=>e.id)
            }).then(res => {
                this.getBillQueue.forEach(_bill_article => {
                    let article = this.dashboard.articles.find(e => e.id == _bill_article.id);
                    article.total_id = res.data.total.id;
                })
                return res.data.total
            })
        },
        toggleBill: function (article_id) {
            let article = this.dashboard.articles.find(_article => _article.id == article_id);
            article.total_id = !article.total_id
        },
        resetBillPlanning: function () {
            this.getBillQueue.map(article => article.total_id = false)  
        },
        addArticle: function () {
            this.models.push(
                {
                    id: uuidv4(),
                    date: new Date().toISOString().substr(0, 10),
                    description: "",
                    price: null,
                    is_private: false,
                    product_id: null,
                }
            )
        }
    },
    getters: {
        articles: (state) => {
            let data = [];
            if (state.article_filter.find(e => e == 0)) {
                data.push(...state.dashboard.articles.filter(article => (
                    state.auth.getAuth.id == article.user_id)));
            }
            if (state.article_filter.find(e => e == 1)) {
                data.push(...state.dashboard.articles.filter(article => (!article.is_private &&
                    (article.user_id != state.auth.getAuth.id))));
            }
            if (state.article_filter.find(e => e == 2)) {
                data = data.filter(article => article.total_id);
            }
            return data;
        },
        total_articles: (state) => {
            return _.sumBy(state.articles, "price");
        },
        getBillQueue: (state) => {
            return state.dashboard.articles.filter(article=>article.total_id === true)
        }
    }
});