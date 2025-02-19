import { fetchWithAuth } from './commonService';

export const addAuto = async (formData) => {
    try {
        const data = await fetchWithAuth("/api/v1/transports/", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка создания транспорта:", error.message);
        throw error; // Прокидываем ошибку дальше
    }
};

export const getAutoListOfLatest = async () => {
    try {
        const data = await fetchWithAuth(`/api/v1/transports/count/5/`, {
            method: "GET"
        })
        return data;
    } catch (error) {
        console.log("Ошибка обновления груза: ", error);
        throw error;
    }
};