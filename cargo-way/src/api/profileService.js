import { fetchWithAuth } from './commonService';
import { API_URL } from './config';

export const getProfileData = async () => {
    try {
        const data = await fetchWithAuth("/api/v1/profile/", { method: "GET" });
        return data;
    } catch (error) {
        console.error("Ошибка полученя данных:", error);
        throw error;
    }
};

export const updateProfileData = async (updatedData) => {
    try {
        const data = await fetchWithAuth("/api/v1/profile/", {
            method: "PATCH",
            body: JSON.stringify(updatedData)
        })
        return data;
    } catch (error) {
        console.log("Ошибка обновления груза: ", error);
        throw error;
    }
};
