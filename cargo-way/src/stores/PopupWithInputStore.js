import { makeAutoObservable } from "mobx";

class PopupWithInputStore {
    email = '';

    constructor() {
        makeAutoObservable(this);
    }

    setEmail = (email) => {
        this.email = email;
    }
    reset = () => {
        this.email = '';
    }
}

export const popupWithInputStore = new PopupWithInputStore();