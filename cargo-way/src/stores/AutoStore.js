import { makeAutoObservable } from "mobx";

class AutoStore {

    autoTrailer = false;
    autoDropDownDriver = false;

    autoFormData = {
        brand: "",
        model: "",
        year: 0,
        transportNumber: "",
        trailer_details: {
            dimensions: {
                length: 0,
                width: 0,
                height: 0
            },
            volume: 0,
            trailerNumber: 0
        },
        capacity: 0,
        bodyType: "",
        loadType: "",
        unloadType: "",
        readyDate: "",
        route: {
            from: "",
            to: ""
        },
        typePay: "",
        price: 0,
        status: "HIDDEN",
        driver: {},
        photos: []
    };

    constructor() {
        makeAutoObservable(this)
    };

    setFormData = (name, value) => {
        this.autoFormData = { ...this.autoFormData, [name]: value }
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
                    trailerNumber: 0
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