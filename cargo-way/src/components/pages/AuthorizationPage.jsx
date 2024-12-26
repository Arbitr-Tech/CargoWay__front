import { useState } from "react";
import AuthorizationForm from "../forms/AuthorizationForm";

const AuthorizationPage = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const handleOnChange = (event) => {
        const { name, value } = event.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    };

    const handleNext = () => {
        console.log(formData);
    };

    return (
        <div className="authorization">
            <div className="container">
                <AuthorizationForm formData={formData} onChange={handleOnChange} onNext={handleNext} />
            </div>
        </div>
    )
};

export default AuthorizationPage;