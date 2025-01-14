import { makeAutoObservable } from "mobx";

class RegistrationAutorizationStore {
    isLoggedIn = false;

    registrationStep = 1;
    registrationFormData = {
        userType: "",
        userRole: "",
        login: "",
        email: "",
        password: "",
        agreement: false,
        individualData: {},
        companyData: {},
    };

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

    setRegistrationStep = (step) => {
        this.registrationStep = step
    }

    setRegistrationFormData = (name, value, type, checked) => {
        this.registrationFormData = {...this.registrationFormData, [name]: type === "checkbox" ? checked : value}
    }

    setRegistrationNestedFormData = (formName, newData) => {
        this.registrationFormData = {...this.registrationFormData, [formName]: newData}
    }

    submitRegistration() {
        console.log("Регистрация завершена", this.registrationFormData);
        this.registrationStep = 1; // Сброс шага
    }

    setAuthorizationFormData = (name, value) => {
        this.autorizationFormData = {...this.autorizationFormData, [name]: value}
    }
}

export const registrationAutorizationStore = new RegistrationAutorizationStore();