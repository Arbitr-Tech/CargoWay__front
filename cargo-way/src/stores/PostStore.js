import { makeAutoObservable } from "mobx";

class PostStore {
    autoFormData = {
        brand: "",
        model: "",
        year: 0,
        dimensions: {
            length: 0,
            width: 0,
            height: 0
        },
        cargo_type: "",
        volume: 0,
        category: "",
        transport_number: 0,
        trailer_details: {
            dimensions: {
                length: 0,
                width: 0,
                height: 0
            },
            cargo_type: "",
            volume: 0,
            trailer_number: 0
        },
        lifting_capacity: 0,
        bodyType: "",
        loadingType: "",
        date: "",
        route: {
            from: "",
            to: ""
        },
        autoPhoto: ""
    };

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
        cargoPhoto: ""
    };

    constructor() {
        makeAutoObservable(this)
    }

    setFormData = (name, value, type, file, typeInfo) => {
        const isCargo = typeInfo === 'cargo';

        if (type === 'file') {
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    if (isCargo) {
                        this.cargoFormData = { ...this.cargoFormData, cargoPhoto: reader.result }
                    } else {
                        this.autoFormData = { ...this.autoFormData, autoPhoto: reader.result }
                    }
                };
                reader.readAsDataURL(file);
            }
            return;
        } else {
            if (isCargo) {
                this.cargoFormData = { ...this.cargoFormData, [name]: value }
            } else {
                this.autoFormData = { ...this.autoFormData, [name]: value }
            }
        }
    }

    setNestedFormData = (formName, newData, secondName, typeInfo) => {
        const isCargo = typeInfo === 'cargo';
        if (isCargo) {
            this.cargoFormData = {
                ...this.cargoFormData,
                [formName]: {
                    ...this.cargoFormData[formName],
                    [secondName]: newData
                }
            };
        } else {
            this.autoFormData = {
                ...this.autoFormData,
                [formName]: {
                    ...this.autoFormData[formName],
                    [secondName]: newData
                }
            };
        }
    }

    setEditData = (name, value) => {
        this.autoFormData = { ...this.autoFormData, [name]: value }
    }
}

export const postStore = new PostStore();