import axios from "axios";
import { defineStore } from "pinia";
import { useAuth } from "./Auth";

export const useError = defineStore("Error", {
    state: () => {
        return {
            text: "",
            image: "",
            text_deactivated: `Dear ${useAuth().user.name}, Your Account Has been Deactivated 😥`,
            image_deactivated: "/deactivated.gif",
        }
    },
});