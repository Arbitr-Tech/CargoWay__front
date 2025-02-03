import AuthorizationForm from "../forms/AuthorizationForm";
import { observer } from "mobx-react-lite";
import { autorizationStore } from "../../stores/AutorizationStore";
import { login } from "../../api/auth/authService";


const AuthorizationPage = observer(() => {
    const store = autorizationStore;

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        store.setAuthorizationFormData(name, value);
    };

    const handleNext = async () => {
        console.log(store.autorizationFormData);

        try {
            await login(store.autorizationFormData);
        } catch (error) {
            console.error("Ошибка входа:", error);
        }
    };

    return (
        <div className="authorization">
            <div className="container">
                <AuthorizationForm formData={store.autorizationFormData} onChange={handleOnChange} onNext={handleNext} />
            </div>
        </div>
    )
});

export default AuthorizationPage;