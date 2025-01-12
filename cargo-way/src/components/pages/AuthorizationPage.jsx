import AuthorizationForm from "../forms/AuthorizationForm";
import { observer } from "mobx-react";
import { registrationAutorizationStore } from "../../stores/RegistrationAutorizationStore";


const AuthorizationPage = observer(() => {
    const store = registrationAutorizationStore;

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        store.setAuthorizationFormData(name, value);
    };

    const handleNext = () => {
        console.log(store.autorizationFormData);
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