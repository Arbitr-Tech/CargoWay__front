import { makeAutoObservable } from "mobx";
import { getCargoListOfLatest } from "../api/cargoService";
import { getAutoListOfLatest } from "../api/autoService";

class MainSearchStore {
    page = 'MainSearchPage';
    isPopupOpen = false;
    popupContent = {};
    formData = {
        routeFrom: "",
        routeTo: "",
        weightFrom: "",
        weightTo: "",
        volumeFrom: "",
        volumeTo: "",
        readyDate: "",
        priceFrom: "",
        priceTo: "",
        bodyType: "",
        loadType: "",
        unloadType: ""
        // bodyType: [],
        // loadType: [],
        // unloadType: []
    };
    cargoListLatest = [];
    autoListLatest = [];
    cargoListSearch = [];
    loadingCargoListLatest = false;
    error = null;

    async fetchListsLatest() {
        // this.loadingCargoListLatest = true;
        // this.error = null;
        try {
            const dataCargo = await getCargoListOfLatest();
            const dataAuto = await getAutoListOfLatest();
            this.cargoListLatest = dataCargo;
            this.cargoListSearch = dataCargo;
            this.autoListLatest = dataAuto;
        } catch (error) {
            // this.error = error.message;
            console.error("Ошибка при получении списков:", error);
        } 
        // finally {
        //     this.loadingCargoListLatest = false;
        // }
    }

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

    setCargoSearchList = (list) => {
        this.cargoListSearch = list
    }
}

export const mainSearchStore = new MainSearchStore();