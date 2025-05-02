import axios from "axios";

function get(endPoint) {
    const config = getAxiosConfig();

    return axios.get(endPoint, config).catch((error) => handleError(error));
}

function post(endPoint, payload, config) {
    config = config ? config : getAxiosConfig();

    return axios.post(endPoint, payload, config).catch((error) => handleError(error));
}

function handleError(error) {
    console.log(error);
    return Promise.reject(error);
}

function getAxiosConfig() {
    return {
        baseURL: "https://localhost:7268",
        withCredentials: false,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Accepts-version": "1.0",
        },
        timeout: 600000,
    };
}
export default {
    get,
    post,
};