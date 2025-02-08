import { API_URL } from '../config';

export const login = async (formData) => {
    const response = await fetch(`${API_URL}/api/v1/auth/login/`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) throw new Error("Ошибка авторизации");

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    console.log(data)
    return data;
};

export const getProfileRole = async (access_token) => {
    const response = await fetch(`${API_URL}/api/v1/profile/`, {
        method: "GET",
        credentials: "include",
        headers: {
            "Authorization": `Bearer ${access_token}`
        }
    });

    if (response.status === 401) { // Если access_token истёк
        access_token = await refreshToken();
        return getProfileRole(access_token); // Повторный запрос
    }

    const data = await response.json();

    return data.role;
};

export const refreshToken = async () => {
    const response = await fetch(`${API_URL}/api/v1/auth/refresh-token/`, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('access_token')}`
        }
    });

    if (!response.ok) {
        localStorage.removeItem("access_token");
        window.location.href = "/login"; //переход на страницу login
        throw new Error("Не удалось обновить токен");
    }

    const data = await response.json();
    localStorage.setItem("access_token", data.access_token);
    return data.access_token;
};

export const fetchWithAuth = async (url, options = {}) => {
    let access_token = localStorage.getItem("access_token");

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        },
        credentials: "include"
    });

    if (response.status === 401) { // Если access_token истёк
        access_token = await refreshToken();
        return fetchWithAuth(url, options); // Повторный запрос
    }

    return response.json();
};