import React, { useEffect } from "react";
import AuthorizationForm from "../forms/AuthorizationForm";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { autorizationStore } from "../../stores/AutorizationStore";
import { login, passwordReset } from "../../api/authService";
import { data, useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore";
import { toast } from "react-toastify";
import { useState } from "react";
import PopupWithInput from "../PopupWithInput";
import { popupWithInputStore } from "../../stores/PopupWithInputStore";
import { getProfileData } from "../../api/profileService";

const AuthorizationPage = observer(() => {
    const store = autorizationStore;
    const storeUser = userStore;
    const storePopup = popupWithInputStore;
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        return () => {
            store.reset(); // Очистка формы при размонтировании
        };
    }, [store]);

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        store.setAuthorizationFormData(name, value);
    };

    const handleNext = async () => {
        console.log(toJS(store.autorizationFormData));

        try {
            await login(toJS(store.autorizationFormData));
            const data = await getProfileData();
            storeUser.setUserFormData(data);
            navigate('/');
            store.reset();
        } catch (error) {
            console.error("Ошибка входа:", error);
            if (!error.message.startsWith('Неверный') && !error.message.startsWith('Участник')) {
                toast.error('Ошибка входа')
            } else {
                toast.error(error.message)
            }
        }
    };

    const handlePasswordReset = async () => {
        if (!storePopup.email) {
            toast.error('Заполните поле ввода почты');
            return;
        };
        try {
            await passwordReset({ "email": storePopup.email });
            storePopup.reset();
            setIsPopupOpen(false);
        } catch (error) {
            if (error.message.includes("не был найден!")) {
                toast.error("Участник с такой почтой не был найден");
            } else {
                toast.error("Произошла ошибка. Попробуйте позже");
            };
            return;
        };
        toast.success('Письмо направлено на вашу почту');
    }

    return (
        <div className="authorization">
            <div className={`overlay ${isPopupOpen ? 'overlay--show' : ''} `}></div>
            <PopupWithInput
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                onSend={handlePasswordReset}
                email={storePopup.email}
                onChangeEmail={storePopup.setEmail}
            />
            <div className="container">
                <AuthorizationForm formData={store.autorizationFormData} onChange={handleOnChange} onNext={handleNext} onClickLink={() => setIsPopupOpen(true)} />
            </div>
        </div>
    )
});

export default AuthorizationPage;