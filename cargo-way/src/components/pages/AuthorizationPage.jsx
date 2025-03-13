import React from "react";
import AuthorizationForm from "../forms/AuthorizationForm";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { autorizationStore } from "../../stores/AutorizationStore";
import { getProfileRole, login } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore";
import { toast } from "react-toastify";
import { useState } from "react";
import PopupWithInput from "../PopupWithInput";
import { popupWithInputStore } from "../../stores/PopupWithInputStore";

const AuthorizationPage = observer(() => {
    const store = autorizationStore;
    const storeUser = userStore;
    const storePopup = popupWithInputStore;
    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // const errorMessages = [
    //     "Неверный логин или пароль. Попробуйте еще раз!",
    //     "Участник с почтой random.useыr@examplecom не был найден!",
    // ];

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        store.setAuthorizationFormData(name, value);
    };

    const handleNext = async () => {
        console.log(toJS(store.autorizationFormData));

        try {
            await login(toJS(store.autorizationFormData));
            const role = await getProfileRole(localStorage.getItem('accessToken'));
            storeUser.setRole(role);
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

    return (
        <div className="authorization">
            <div className={`overlay ${isPopupOpen ? 'overlay--show' : ''} `}></div>
            <PopupWithInput
                isOpen={isPopupOpen}
                onClose={() => setIsPopupOpen(false)}
                // onSend={}
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