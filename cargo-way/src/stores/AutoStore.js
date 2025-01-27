import { makeAutoObservable } from "mobx";

class AutoStore {

    autoTrailer = false;
    autoDropDownDriver = false;

    autoFormData = {
        brand: "",
        model: "",
        year: 0,
        dimensions: {
            length: 0,
            width: 0,
            height: 0
        },
        volume: 0,
        category: "",
        transport_number: 0,
        trailer_details: {
            dimensions: {
                length: 0,
                width: 0,
                height: 0
            },
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
        autoPhoto: "",
        typePrice: "",
        price: 0,
        status: "Не опубликовано",
        driver: 0
    };

    constructor() {
        makeAutoObservable(this)
    };

    setFormData = (name, value, type, file) => {
        if (type === 'file') {
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    this.autoFormData = { ...this.autoFormData, autoPhoto: reader.result }
                };
                reader.readAsDataURL(file);
            }
            return;
        } else {
            this.autoFormData = { ...this.autoFormData, [name]: value }
        }
    }

    setNestedFormData = (formName, secondName, newData) => {
        this.autoFormData = {
            ...this.autoFormData,
            [formName]: {
                ...this.autoFormData[formName],
                [secondName]: newData
            }
        };
    }

    setTwiceNestedFormData = (formName, secondName, thirdName, newData) => {
        this.setNestedFormData(formName, secondName, {...this.autoFormData[formName][secondName], [thirdName]: newData});
    }

    setEditData = (name, value) => {
        this.autoFormData = { ...this.autoFormData, [name]: value }
    }

    setAutoTrailer = () => {
        this.autoTrailer = !this.autoTrailer
        if (!this.autoTrailer) {
            this.autoFormData = {
                ...this.autoFormData,
                trailer_details: {
                    dimensions: {
                        length: 0,
                        width: 0,
                        height: 0
                    },
                    volume: 0,
                    trailer_number: 0
                }
            };
        }
    }

    setDropDown = () => {
        this.autoDropDownDriver = !this.autoDropDownDriver;
    }

    setDriver = (driver) => {
        this.autoFormData = {...this.autoFormData, driver: driver}
        this.autoDropDownDriver = false;
    }
}

export const autoStore = new AutoStore();