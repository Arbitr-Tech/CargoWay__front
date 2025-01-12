import { makeAutoObservable } from "mobx";

class MainSearchStore {
    page = 'MainSearchPage';
    isPopupOpen = false;
    popupContent = {};
    formData = {
        sending: "",
        reception: "",
        weightFrom: "",
        weightTo: "",
        volumeFrom: "",
        volumeTo: "",
        loadingDate: "",
        bodyType: [],
        nameОfСargo: [],
        loadingType: []
    };

    constructor() {
        makeAutoObservable(this);
    }

    setPage = (page) => {
        this.page = page;
    }

    openPopup = (content) => {
        this.isPopupOpen = true;
        this.popupContent = content;
    }

    closePopup = () => {
        this.isPopupOpen = false;
        this.popupContent = {};
    }

    setFormData = (name, value, type, checked) => {
        if (type === 'checkbox') {
            const updatedValue = checked
                ? [...this.formData[name], value] // Добавляем значение, если чекбокс выбран
                : this.formData[name].filter((item) => item !== value); // Удаляем значение, если чекбокс снят

            this.formData = { ...this.formData, [name]: updatedValue }
        } else {
            this.formData = { ...this.formData, [name]: value }
        }
    }
}

export const mainSearchStore = new MainSearchStore();