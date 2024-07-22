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
            article_filter: 0,
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
            await axios.post(`/api/articles/${_article.id}`).then(res => {
                let article = this.dashboard.articles.find(e => e.id == _article.id);
                article.date = res.data.article.date;
                article.name = res.data.article.name;
                article.description = res.data.article.description;
                article.price = res.data.article.price;
                article.is_private = res.data.article.is_private;
                article.product_id = res.data.article.product_id;
            })
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
            if (state.article_filter == 0) {
                return state.dashboard.articles.filter(article => (!article.is_private &&
                    state.auth.getAuth.id != article.user_id)
                    || (article.user_id == state.auth.getAuth.id));
            }
            else if (state.article_filter == 1) {
                return state.dashboard.articles.filter(article => (!article.is_private &&
                    state.auth.getAuth.id != article.user_id)
                    || (article.user_id == state.auth.getAuth.id)
                    && (article.is_private));
            }
            else {
                return state.dashboard.articles.filter(article => (!article.is_private &&
                    state.auth.getAuth.id != article.user_id)
                    || (article.user_id == state.auth.getAuth.id)
                    && (!article.is_private));
            }
        }
    }
});