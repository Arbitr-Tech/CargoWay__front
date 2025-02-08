import AuthorizationForm from "../forms/AuthorizationForm";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { autorizationStore } from "../../stores/AutorizationStore";
import { getProfileRole, login } from "../../api/auth/authService";
import { useNavigate } from "react-router-dom";
import { userStore } from "../../stores/UserStore";


const AuthorizationPage = observer(() => {
    const store = autorizationStore;
    const storeUser = userStore;
    const navigate = useNavigate();

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        store.setAuthorizationFormData(name, value);
    };

    const handleNext = async () => {
        console.log(toJS(store.autorizationFormData));

        try {
            await login(toJS(store.autorizationFormData));
            const role = await getProfileRole(localStorage.getItem('access_token'));
            storeUser.setRole(role);
            store.reset();

        } catch (error) {
            console.error("Ошибка входа:", error);
            return;
        }

        navigate('/');
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