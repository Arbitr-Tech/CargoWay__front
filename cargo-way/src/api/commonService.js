import { API_URL } from '../api/config';

export const loadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/api/v1/file/`, {
        method: "POST",
        body: formData
    });

    if (!response.ok) throw new Error("Ошибка загрузки файла");

    const data = await response.json();
    console.log(data);
    return data;
};

export const refreshToken = async () => {
    const response = await fetch(`${API_URL}/api/v1/auth/refresh-token/`, {
        method: "POST",
        credentials: "include",
    });

    if (!response.ok) {
        localStorage.removeItem("accessToken");
        throw new Error("Не удалось обновить токен");
    }

    const data = await response.json();
    console.log(data.access_token);
    localStorage.setItem("accessToken", data.access_token);
    return data.accessToken;
};

export const fetchWithAuth = async (url, options = {}) => {
    let accessToken = localStorage.getItem("accessToken");

    const defaultHeaders = {
        "Authorization": `Bearer ${accessToken}`,
    };

    if (options.body) {
        defaultHeaders["Content-Type"] = "application/json";
    }

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: { ...defaultHeaders, ...(options.headers || {}) },
    });

    if (response.status === 403) { 
        console.log("403: Access Forbidden"); 
        accessToken = await refreshToken();
        return fetchWithAuth(url, options); // Повторный запрос
    }

    // ❗️ Проверяем `response.ok` перед `response.json()`
    if (!response.ok) {
        const errorText = await response.text(); // Читаем текст ошибки с бэка
        throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }

    return response.json();
};
