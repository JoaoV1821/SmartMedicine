import axios from "axios";

const instance = axios.create({
    baseURL: "https://livraria-api-v2.onrender.com", 
});

export const getUsers = async () => {
    const response = await instance.get("/users");
    const json = await response.data;
    return json;
};


