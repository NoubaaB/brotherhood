import axios from "axios";
import { defineStore } from "pinia";

export const useSearch = defineStore("Search", {
    state: () => {
        return {
            search_dialog: false,
            text:"",
            articles: []
        }
    },
    actions: {
        searchArticles: async function () {
            return await axios.get("/api/articles", {
                params: {
                    text: this.text
                }
            }).then(response => {
                this.articles = response.data.articles;
            });
        }
    },
    getters: {
    }
});