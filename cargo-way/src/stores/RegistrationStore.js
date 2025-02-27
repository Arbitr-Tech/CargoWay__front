import { makeAutoObservable } from "mobx";

class RegistrationStore {

    registrationStep = 1;

    registrationFormData = {
        userType: "",
        username: "",
        email: "",
        password: "",
        role: "",
        agreement: false,
        individualData: {},
        companyData: {},
    };

    constructor() {
        makeAutoObservable(this);
    }

    setRegistrationStep = (step) => {
        this.registrationStep = step
    }

    setRegistrationFormData = (name, value, type, checked) => {
        this.registrationFormData = { ...this.registrationFormData, [name]: type === "checkbox" ? checked : value }
    }

    setRegistrationNestedFormData = (formName, newData) => {
        this.registrationFormData = { ...this.registrationFormData, [formName]: newData }
    }

    submitRegistration() {
        // console.log("Регистрация завершена", this.registrationFormData);
        this.registrationStep = 1;
        this.registrationFormData = {
            userType: "",
            username: "",
            email: "",
            password: "",
            role: "",
            agreement: false,
            individualData: {},
            companyData: {},
        }
    }
}

export const registrationStore = new RegistrationStore();