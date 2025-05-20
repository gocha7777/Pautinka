import axios from "axios";
import { API_BASE_URL } from "./config";

function get(endPoint) {
    const config = getAxiosConfig();
    return axios.get(endPoint, config).catch((error) => handleError(error));
}

function post(endPoint, payload, config) {
    if (endPoint.startsWith("/")) {
        endPoint = endPoint.slice(1);
    }

    const baseConfig = getAxiosConfig(); // ✅ получаем конфиг с baseURL
    const finalConfig = { ...baseConfig, ...(config || {}) }; // ✅ объединяем

    console.log("POST to:", endPoint);
    console.log("With config:", finalConfig);

    return axios.post(endPoint, payload, finalConfig).catch((error) => handleError(error));
}

function put(endPoint, payload, config) {
    config = config ? config : getAxiosConfig();
    return axios.put(endPoint, payload, config).catch((error) => handleError(error));
}

function patch(endPoint, payload, config) {
    if (endPoint.startsWith("/")) {
        endPoint = endPoint.slice(1);
    }
    // Всегда используем getAxiosConfig как базу
    config = { ...getAxiosConfig(), ...(config || {}) };
    console.log("PATCH endpoint:", endPoint);
    console.log("PATCH config:", config);
    return axios.patch(endPoint, payload, config).catch((error) => handleError(error));
}

function deleteRequest(endPoint, config) {
    if (endPoint.startsWith("/")) {
        endPoint = endPoint.slice(1);
    }
    const finalConfig = { ...getAxiosConfig(), ...(config || {}) };
    console.log("DELETE endpoint:", endPoint);
    console.log("DELETE config:", finalConfig);
    return axios.delete(endPoint, finalConfig).catch((error) => handleError(error));
}

function handleError(error) {
    console.error("Ошибка:", error);
    return Promise.reject(error);
}

function getAxiosConfig() {
    return {
        baseURL: API_BASE_URL,
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
    put,
    patch,
    delete: deleteRequest, // 👈 добавлен метод delete
};
