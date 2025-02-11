import { fetchWithAuth } from './commonService';
import { API_URL } from './config';

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
    localStorage.setItem("accessToken", data.access_token);
    console.log(data)
    return data;
};

export const getProfileRole = async () => {
    try {
        const data = await fetchWithAuth("/api/v1/profile/", {method: "GET"});
        return data.role;
    }  catch (error) {
        console.error("Ошибка полученя роли:", error);
        throw error;
    }
};
