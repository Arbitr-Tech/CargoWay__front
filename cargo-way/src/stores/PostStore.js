import { makeAutoObservable } from "mobx";

class PostStore {
    autoFormData = {
        weight: "",
        volume: "",
        bodyType: [],
        loadingType: [],
        date: "",
        loadingLocality: "",
        unloadingLocality: "",
        noncashVAT: "",
        noncash: "",
        cash: "",
        autoPhoto: ""
    };

    cargoFormData = {
        cargoName: "",
        weight: "",
        volume: "",
        date: "",
        loadingLocality: "",
        loadingAddress: "",
        unloadingLocality: "",
        unloadingAddress: "",
        bodyType: [],
        loadingType: [],
        unloadingType: [],
        noncashVAT: "",
        noncash: "",
        cash: "",
        cargoPhoto: ""
    };

    constructor() {
        makeAutoObservable(this)
    }

    setFormData = (name, value, type, checked, event) => {
        if (type === 'checkbox') {
            const updatedData = checked
                ? [...this.autoFormData[name], value]
                : this.autoFormData[name].filter((item) => item !== value);

            this.autoFormData = { ...this.autoFormData[name], [name]: updatedData }
        } else if (type === 'file') {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    this.autoFormData = { ...this.autoFormData, autoPhoto: reader.result }
                };
                reader.readAsDataURL(file);
            }
        } else {
            this.autoFormData = { ...this.autoFormData, [name]: value }
        }
    }

    setEditData = (name, value) => {
        this.autoFormData = { ...this.autoFormData, [name]: value }
    }
}

export const postStore = new PostStore();