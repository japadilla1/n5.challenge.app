import axios from "axios";

export const permissionApi = axios.create({
    baseURL: "https://localhost:7019/api/"
});