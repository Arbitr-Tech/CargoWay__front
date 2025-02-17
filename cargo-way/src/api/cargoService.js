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
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/`, { method: "GET" });
        return data;
    } catch (error) {
        console.log("Ошибка получения деталей груза: ", error);
        throw error;
    }
};

export const updateCargo = async (cargoId, updatedData) => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/${cargoId}/`, {
            method: "PATCH",
            body: JSON.stringify(updatedData)
        })
        return data;
    } catch (error) {
        console.log("Ошибка обновления груза: ", error);
        throw error;
    }
};

export const getCargoListOfLatest = async () => {
    try {
        const data = await fetchWithAuth(`/api/v1/cargos/count/5/`, {
            method: "GET"
        })
        return data;
    } catch (error) {
        console.log("Ошибка обновления груза: ", error);
        throw error;
    }
};