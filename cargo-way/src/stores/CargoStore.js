import { makeAutoObservable } from "mobx";

class CargoStore {
    cargoFormData = {
        name: "",
        description: "",
        weight: 0,
        volume: 0,
        dimensions: {
            length: 0,
            width: 0,
            height: 0
        },
        route: {
            from: "",
            to: ""
        },
        price: 0.0,
        typePay: "",
        readyDate: "",
        deliveryDate: "",
        bodyType: "",
        loadType: "",
        unloadType: "",
        cargoPhoto: "",
        status: "HIDDEN",
        photos: []
    };

    constructor() {
        makeAutoObservable(this)
    };

    setFormData = (name, value) => {
        this.cargoFormData = { ...this.cargoFormData, [name]: value }
    }

    
    setNestedFormData = (formName, secondName, newData) => {
        this.cargoFormData = {
            ...this.cargoFormData,
            [formName]: {
                ...this.cargoFormData[formName],
                [secondName]: newData
            }
        };
    }

    resetFormData = () => {
        this.cargoFormData = {
            name: "",
            description: "",
            weight: 0,
            volume: 0,
            dimensions: {
                length: 0,
                width: 0,
                height: 0
            },
            route: {
                from: "",
                to: ""
            },
            price: 0.0,
            typePay: "",
            readyDate: "",
            deliveryDate: "",
            bodyType: "",
            loadType: "",
            unloadType: "",
            cargoPhoto: "",
            status: "HIDDEN",
            photos: []
        }
    }
}

export const cargoStore = new CargoStore();