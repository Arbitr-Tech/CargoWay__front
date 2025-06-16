import { fetchWithAuth } from './commonService';

export const addDriver = async (formData) => {
    try {
        const data = await fetchWithAuth("/api/v1/drivers/", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        return data;
    } catch (error) {
        console.error("Ошибка создания водителя:", error.message);
        throw error; 
    }
};

export const getDriversByProfile = async (pageNumber) => {
    try {
        const data = await fetchWithAuth(`/api/v1/drivers/?pageNumber=${pageNumber}&pageSize=5`, {
            method: "GET"
        });

        return data;
    } catch (error) {
        console.error("Ошибка получения водителей:", error.message);
        throw error;
    }
};

export const getDetailsDriver = async (driverId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/drivers/${driverId}/`, {
            method: "GET"
        });

        return data;
    } catch (error) {
        console.error("Ошибка получения деталей водителя:", error.message);
        throw error;
    }
};

export const updateDriver = async (formData, driverId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/drivers/${driverId}/`, {
            method: "PATCH",
            body: JSON.stringify(formData),
        });

        return data;
    } catch (error) {
        console.error("Ошибка обновления водителя:", error.message);
        throw error;
    }
};

export const deleteDriver = async (driverId) => {
    try {
        const data = await fetchWithAuth(`/api/v1/drivers/${driverId}/`, {
            method: "DELETE"
        });

        return data;
    } catch (error) {
        console.error("Ошибка удаления водителя:", error.message);
        throw error;
    }
};

export const getDriversForTransport = async () => {
    try {
        const data = await fetchWithAuth(`/api/v1/drivers/list/`, {
            method: "GET"
        });

        return data;
    } catch (error) {
        console.error("Ошибка получения водителей для транспорта:", error.message);
        throw error;
    }
};