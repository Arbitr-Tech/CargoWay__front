import { makeAutoObservable } from "mobx";
import { getDriversByProfile } from "../api/driverService";

class DriverStore {
    driverFormData = {
        fullName: "",
        licenseCategory: "",
        licenseNumber: "",
        issueDate: "",
        expirationDate: "",
        imagesIds: []
    };

    originalDriverFormData = {};

    driverList = [];

    page = { current: 1, total: 1 };

    constructor() {
        makeAutoObservable(this)
    };

    setFormData = (name, value) => {
        this.driverFormData = { ...this.driverFormData, [name]: value }
    }

    async fetchDriverList(pageNumber) {
        try {
            const dataDrivers = await getDriversByProfile(pageNumber);
            this.driverList = dataDrivers.content;
            this.page = { current: dataDrivers.pageNumber, total: dataDrivers.totalPages };
        } catch (error) {
            console.error("Ошибка при получении списка грузов:", error);
        }
    }

    getCurrentPage() {
        return this.page?.current ?? 1;
    }

    setCurrentPage(page) {
        this.page = { ...this.page, current: page };
    }

    getTotalPages() {
        return this.page?.total ?? 1;
    }

    setDriverFormDataFromServer = (data) => {
        data = {...data, "imagesIds": data.images}
        delete data['images'];
        this.originalDriverFormData = data;
        this.driverFormData = { ...data };
    }

    getUpdatedFields = () => {
        const updatedFields = {};

        for (const key in this.driverFormData) {
            if (JSON.stringify(this.driverFormData[key]) !== JSON.stringify(this.originalDriverFormData[key])) {
                updatedFields[key] = this.driverFormData[key];
            }
        }

        return updatedFields;
    }

    resetFormData = () => {
        this.driverFormData = {
            licenseCategory: "",
            licenseNumber: "",
            issueDate: "",
            expirationDate: "",
            imagesIds: []
        };
    }
}

export const driverStore = new DriverStore();