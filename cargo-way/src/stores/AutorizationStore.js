import { makeAutoObservable } from "mobx";

class AutorizationStore {
    isLoggedIn = false;

    autorizationFormData = {
        email: "",
        password: ""
    };

    constructor() {
        makeAutoObservable(this);
    }

    logout() {
        this.isLoggedIn = false;
    }

    setAuthorizationFormData = (name, value) => {
        this.autorizationFormData = {...this.autorizationFormData, [name]: value}
    }
}

export const autorizationStore = new AutorizationStore();