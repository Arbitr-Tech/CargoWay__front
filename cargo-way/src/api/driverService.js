import { fetchWithAuth } from './commonService';

export const addDriver = async (formData) => {
    try {
        const data = await fetchWithAuth("/api/v1/drivers/", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка создания водителя:", error.message);
        throw error; // Прокидываем ошибку дальше
    }
};