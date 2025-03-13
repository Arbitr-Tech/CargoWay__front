import { observer } from "mobx-react-lite";
import PasswordRecoveryForm from "../forms/PasswordRecoveryForm";
import { passwordRecoveryStore } from "../../stores/PasswordRecoveryStore";
import { toast } from "react-toastify";

const PasswordRecoveryPage = observer(() => {
    const store = passwordRecoveryStore;

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        store.setPasswordFormData(name, value)
    };

    const handleOnSend = () => {
        if (store.passwordFormData.newPassword.length < 8) {
            toast.error('Пароль не должен быть менее 8 символов');
            return;
        }
        if (store.passwordFormData.newPassword !== store.passwordFormData.newPasswordRepeat) {
            toast.error('Пароли не совпадают');
            return;
        }
    };

    return (
        <div className="passwordRecovery">
            <div className="container">
                <PasswordRecoveryForm formData={store.passwordFormData} onChange={handleOnChange} onSend={handleOnSend}/>
            </div>
        </div>
    )
});

export default PasswordRecoveryPage;