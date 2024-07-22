import { defineStore } from "pinia";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { useDashboard } from "./Dashboard";

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
            dashboard:useDashboard()
        }
    },
    actions: {
        deleteArticle: async function (id) {
            await axios.delete(`/api/article/${id}`).then(res => {
                this.dashboard.article = this.dashboard.article.filter(e=>e.id != id)
                return res
            })
        },
        postaAticle: async function () {
            return await axios.post("/api/article", {
                article: this.models
            }).then(res => {
                this.models = [];
                return res;
            })
        }
    },
    getters: {
    }
});