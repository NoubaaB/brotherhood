import { defineStore } from "pinia";

export const useAuth = defineStore("Auth", {
    state: () => { 
        return {
            user: null,
            email:"",
            password: "test",
            drawer : null
        }
    },
    actions: {
        
    },
    getters: {
        
    }
});