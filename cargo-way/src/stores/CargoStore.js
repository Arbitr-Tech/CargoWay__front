import { makeAutoObservable } from "mobx";

class CargoStore {
    cargoFormData = {
        name: "",
        description: "",
        weight: "",
        volume: "",
        dimensions: {
            length: 0,
            width: 0,
            height: 0
        },
        route: {
            from: "",
            to: ""
        },
        typePrice: "",
        price: 0,
        ready: "",
        bodyType: "",
        loadingType: "",
        unloadingType: "",
        cargoPhoto: "",
        status: "Не опубликовано"
    };

    constructor() {
        makeAutoObservable(this)
    };

    setFormData = (name, value, type, file) => {
        if (type === 'file') {
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    this.cargoFormData = { ...this.cargoFormData, cargoPhoto: reader.result }
                };
                reader.readAsDataURL(file);
            }
            return;
        } else {
            this.cargoFormData = { ...this.cargoFormData, [name]: value }
        }
    }

    
    setNestedFormData = (formName, secondName, newData, typeInfo) => {
        this.cargoFormData = {
            ...this.cargoFormData,
            [formName]: {
                ...this.cargoFormData[formName],
                [secondName]: newData
            }
        };
    }
}

export const cargoStore = new CargoStore();