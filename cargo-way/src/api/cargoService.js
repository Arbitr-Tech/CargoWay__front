import { fetchWithAuth } from './commonService';

export const addCargo = async (formData) => {
    try {
        const data = await fetchWithAuth("/api/v1/cargos/", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        console.log("Успешный ответ:", data);
        return data;
    } catch (error) {
        console.error("Ошибка создания груза:", error.message);
        throw error; // Прокидываем ошибку дальше
    }
};


export const getDetailsCargo = async (cargoId) => {
    try {
        const data = await fetchWithAuth(`/${cargoId}`, { method: "GET" });
        return data;
    } catch (error) {
        console.log("Ошибка получения деталей груза: ", error);
        throw error;
    }
};
