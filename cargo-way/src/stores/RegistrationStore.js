import { makeAutoObservable } from "mobx";

class RegistrationStore {

    userType = "";
    registrationStep = 1;

    registrationFormData = {
        username: "",
        email: "",
        password: "",
        role: "",
        agreement: false,
        individual: {},
        company: {},
    };

    constructor() {
        makeAutoObservable(this);
    }

    setUserType = (type) => {
        this.userType = type;
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
            username: "",
            email: "",
            password: "",
            role: "",
            agreement: false,
            individual: {},
            company: {},
        }
        this.userType = "";
    }
}

export const registrationStore = new RegistrationStore();