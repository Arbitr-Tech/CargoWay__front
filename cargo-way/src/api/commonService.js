import { API_URL } from '../api/config';
import { userStore } from '../stores/UserStore';
import { toast } from "react-toastify";

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

        const data = await response.json();
        localStorage.setItem("accessToken", data.access_token);
        hasShownToast = false;
        return data.access_token;
    } catch (error) {
        localStorage.removeItem("accessToken");
        userStore.setRole('');

        // if (!hasShownToast) { // Показываем ошибку только один раз
        //     toast.error("Сессия истекла. Войдите снова.");
        //     hasShownToast = true;
        // }

        throw new Error("Сессия истекла. Войдите снова.");
    }
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
        try {
            accessToken = await refreshToken();
            return fetchWithAuth(url, options); // Повторный запрос
        } catch (error) {
            return Promise.reject(error);
        }
    }

    // Проверяем, успешен ли запрос
    if (!response.ok) {
        const errorText = await response.text(); // Читаем текст ошибки с бэка
        throw new Error(`Ошибка ${response.status}: ${errorText}`);
    }

    // Проверяем, есть ли тело в ответе
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.includes("application/json")) {
        return response.json(); // Возвращаем JSON, если тело есть
    } else {
        return null; // Возвращаем null, если тело отсутствует
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
        const errorData = await response.text(); // Читаем текст ошибки
        throw new Error(`Ошибка ${response.status}: ${errorData}`);
    }

    const data = await response.json();
    return data;
};