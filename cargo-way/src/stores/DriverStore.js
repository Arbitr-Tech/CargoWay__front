import { makeAutoObservable } from "mobx";

class DriverStore {
    driverFormData = {
        licenseCategory: "",
        licenseNumber: "",
        issueDate: "",
        expirationDate: ""
    };

    // originalCargoFormData = {};

    // currentCargoId = null;

    constructor() {
        makeAutoObservable(this)
    };

    setFormData = (name, value) => {
        this.driverFormData = { ...this.driverFormData, [name]: value }
    }


    // setNestedFormData = (formName, secondName, newData) => {
    //     this.cargoFormData = {
    //         ...this.cargoFormData,
    //         [formName]: {
    //             ...this.cargoFormData[formName],
    //             [secondName]: newData
    //         }
    //     };
    // }

    // setCargoFormDataFromServer = (id, data) => {
    //     this.editingCargoId = id;
    //     this.originalCargoFormData = data;
    //     this.cargoFormData = { ...data };
    // }

    // getUpdatedFields = () => {
    //     const updatedFields = {};

    //     for (const key in this.cargoFormData) {
    //         if (JSON.stringify(this.cargoFormData[key]) !== JSON.stringify(this.originalCargoFormData[key])) {
    //             updatedFields[key] = this.cargoFormData[key];
    //         }
    //     }

    //     return updatedFields;
    // }

    resetFormData = () => {
        this.driverFormData = {
            licenseCategory: "",
            licenseNumber: "",
            issueDate: "",
            expirationDate: ""
        };
        // this.editingCargoId = null;
    }
}

export const driverStore = new DriverStore();