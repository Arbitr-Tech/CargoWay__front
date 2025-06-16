import { API_URL } from '../api/config';
import { userStore } from '../stores/UserStore';
import { toast } from "react-toastify";
import { logout } from './authService';

let hasShownToast = false;

export const loadFile = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/api/v1/images/upload/`, {
        method: "POST",
        body: formData
    });

    if (!response.ok) throw new Error("Ошибка загрузки файла");

    const data = await response.json();
    return data;
};

export const deleteFile = async (id) => {
    try {
        const response = await fetch(`${API_URL}/api/v1/images/${id}/`, {
            method: "DELETE"
        });
        return response;
    } catch (error) {
        console.error("Ошибка удаления файла:", error.message);
        throw error;
    }
};

export const refreshToken = async () => {
    try {
        const response = await fetch(`${API_URL}/api/v1/auth/refresh-token/`, {
            method: "POST",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Не удалось обновить токен");
        }

        hasShownToast = false;
    } catch (error) {
        userStore.setRole('');
        await logout();

        if (!hasShownToast) {
            toast.error("Сессия истекла. Войдите снова.");
            hasShownToast = true;
        }

        throw new Error("Сессия истекла. Войдите снова.");
    }
};

export const fetchWithAuth = async (url, options = {}) => {
    const defaultHeaders = {};

    if (options.body) {
        defaultHeaders["Content-Type"] = "application/json";
    }

    const response = await fetch(`${API_URL}${url}`, {
        ...options,
        headers: { ...defaultHeaders, ...(options.headers || {}) },
        credentials: "include"
    });

    if (response.status === 403) {
        console.log("403: Access Forbidden");
        try {
            await refreshToken();
            return fetchWithAuth(url, options); 
        } catch (error) {
            return Promise.reject(error);
        }
    }

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json();
    } else {
        return null;
    }
};

export const getCargoListOfLatest = async () => {
    const response = await fetch(`${API_URL}/api/v1/cargos/last5/`, {
        method: "GET",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Ошибка ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    return data;
};