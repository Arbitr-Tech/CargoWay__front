import { makeAutoObservable } from "mobx";

class RegistrationStore {

    agreement = false;

    registrationFormData = {
        username: "",
        email: "",
        password: "",
        legalTypeDto: "",
        role: "",
    };

    constructor() {
        makeAutoObservable(this);
    }

    switchAgreement = () => {
        this.agreement = !this.agreement;
    }

    setRegistrationFormData = (name, value) => {
        this.registrationFormData = { ...this.registrationFormData, [name]: value }
    }

    submitRegistration() {
        this.registrationFormData = {
            username: "",
            email: "",
            password: "",
            legalTypeDto: "",
            role: "",
        }
        this.agreement = false;
    }
}

export const registrationStore = new RegistrationStore();