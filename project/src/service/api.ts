import axios from "axios";

export const API = axios.create({
    baseURL: "/mocks",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
 