import React from "react";
import { validateRegistration } from "../../validation/validations"
import { observer } from "mobx-react-lite";
import { registrationStore } from "../../stores/RegistrationStore";
import { toJS } from "mobx";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RegistrationForm from "../forms/RegistrationForm";
import { registration } from "../../api/regService";
import { getProfileData } from "../../api/profileService";

const RegistrationPage = observer(() => {

    const store = registrationStore;
    const storeUser = userStore;
    const navigate = useNavigate();
    const errorMessages = {
        "users_cargoway_username_key": "Имя пользователя уже занято. Выберите другое.",
        "users_cargoway_email_key": "Этот email уже зарегистрирован. Попробуйте войти или используйте другой email."
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        store.setRegistrationFormData(name, value);
    }

    const handleSubmit = async () => {
        const errors = validateRegistration(store.registrationFormData, store.agreement);

        if (Object.keys(errors).length > 0) {
            console.log("Ошибки валидации:", errors);
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return;
        }

        console.log(toJS(store.registrationFormData))

        try {
            await registration(toJS(store.registrationFormData));
            const data = await getProfileData();
            storeUser.setUserFormData(data);
            navigate('/');
            store.submitRegistration();
        } catch (error) {
            console.error("Ошибка входа:", error.message);
            if (error.message.includes("duplicate key value violates unique constraint")) {
                const foundKey = Object.keys(errorMessages).find(key => error.message.includes(key));
                if (foundKey) {
                    toast.error(errorMessages[foundKey]);
                }
            } else {
                toast.error("Ошибка регистрации. Попробуйте еще раз позже.");
            }
        }
    };

    return (
        <div className="registration">
            <div className="container">
                <RegistrationForm
                    formData={store.registrationFormData}
                    agreement={store.agreement}
                    onChange={handleInputChange}
                    onSubmit={handleSubmit}
                    onChangeAgreement={store.switchAgreement}
                />
            </div>
        </div >
    )

});

export default RegistrationPage;