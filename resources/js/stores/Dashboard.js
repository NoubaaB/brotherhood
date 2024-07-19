import { defineStore } from "pinia";
import axios from "axios";
import { useAuth } from "./Auth";

export const useDashboard = defineStore("Dashboard", {
    state: () => {
        return {
            date_start: moment().subtract(6, "days").format("YYYY-MM-DD"),
            date_end: new Date().toISOString().substr(0, 10),
            items : [],
            capital: {},
            auth: useAuth(),
        }
    },
    actions: {
        getData: async function () {
            await axios.get("/api/items", {
                params: {
                    date_start: this.date_start,
                    date_end: this.date_end
                }
            }).then(response => {
                this.items = _.sortBy(response.data.items, "date");
                this.capital = response.data.capital;
            });
        }
    },
    getters: {
        amounts_none_private: (state) => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.items.filter(item => (
                    state.auth.getAuth.id == item.user_id
                    && item.date == date
                    && item.is_private == false)
                ), "price");
                data.push(sum)
            });
            return data;
        },
        amounts_private: (state) => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.items.filter(item => (
                    state.auth.getAuth.id == item.user_id
                    && item.date == date
                    && item.is_private)
                ), "price");
                data.push(sum)
            });
            return data;
        },
        amounts_all: (state) => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.items.filter(item => (
                    state.auth.getAuth.id == item.user_id
                    && item.date == date
                    && item.is_private == false)
                ), "price");
                data.push(sum)
            });
            return data;
        },
        amounts_brotherhood: (state) => {
            let data = [];
            state.dates.forEach(date => {
                let sum = _.sumBy(state.items.filter(item => (
                    state.auth.getAuth.id != item.user_id
                    && item.date == date
                    && item.is_private==false)
                ), "price");
                data.push(sum)
            });
            return data;
        },
        dates: (state) => {
            return [...new Set(state.items.map(item => item.date))];
        },
        dates_format: (state) => {
            return state.dates.map(e => moment(e).format("MM/DD/YYYY"));
        },
        total_none_private: (state) => {
            return _.sum(state.amounts_none_private);
        },
        total_private: (state) => {
            return _.sum(state.amounts_private);
        },
        total_all: (state) => {
            return _.sum(state.amounts_all);
        },
        total_brotherhood: (state) => {
            return _.sum(state.amounts_brotherhood);
        },
        total_global: (state) => {
            return _.sum([state.total_brotherhood, state.total_all]);
        }
    }
});