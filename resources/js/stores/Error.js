import axios from "axios";
import { defineStore } from "pinia";

export const useError = defineStore("Error", {
    state: () => {
        return {
            text: "",
            image: "",
        }
    },
});