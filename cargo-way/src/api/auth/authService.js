import { API_URL } from '../config';

export const login = async (formData) => {
    const response = await fetch(`${API_URL}/v1/auth/login/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) throw new Error("Ошибка авторизации");

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    console.log(data)
    return data;
};

export const logout = async () => {
    await fetch(`${API_URL}/v1/auth/logout/`, {
        method: "POST",
        credentials: "include"
    });
    localStorage.removeItem("accessToken");
};

export const refreshToken = async () => {
    const response = await fetch(`${API_URL}/v1/auth/refresh-token/`, {
        method: "POST",
        credentials: "include"
    });

    if (!response.ok) {
        localStorage.removeItem("accessToken");
        window.location.href = "/login"; //переход на страницу login
        throw new Error("Не удалось обновить токен");
    }

    const data = await response.json();
    localStorage.setItem("accessToken", data.accessToken);
    return data.accessToken;
};

export const fetchWithAuth = async (url, options = {}) => {
    let accessToken = localStorage.getItem("accessToken");

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    if (response.status === 401) { // Если accessToken истёк
        accessToken = await refreshToken();
        return fetchWithAuth(url, options); // Повторный запрос
    }

    return response.json();
};