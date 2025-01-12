import { makeAutoObservable } from "mobx";

class ListStore {
    isPopupOpen = false;

    openPopup = () => {
        this.isPopupOpen = true;
    }

    closePopup = () => {
        this.isPopupOpen = false;
    }
}

export const listStore = new ListStore();