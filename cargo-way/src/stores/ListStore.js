import { makeAutoObservable } from "mobx";
import { getCargoByProfile } from "../api/cargoService";

class ListStore {
    isPopupOpen = false;
    listCargo = [];

    openPopup = () => {
        this.isPopupOpen = true;
    }

    closePopup = () => {
        this.isPopupOpen = false;
    }

    async fetchCargoList() {
            try {
                const dataCargo = await getCargoByProfile();
                this.listCargo = dataCargo;
            } catch (error) {
                console.error("Ошибка при получении списков:", error);
            } 
        }
}

export const listStore = new ListStore();