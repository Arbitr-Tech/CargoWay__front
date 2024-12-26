import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../ProgressBar";
import StepOne from "../steps/StepOne";
import StepTwo from "../steps/StepTwo";
import StepThree from "../steps/StepThree";
import { validateStepOne, validateStepTwo, validateStepThree } from "../validation/validations"

const RegistrationPage = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        userType: "",
        login: "",
        email: "",
        password: "",
        agreement: false,
        individualData: {},
        companyData: {},
    });
    const [errors, setErrors] = useState({});

    const steps = ['Шаг 1', 'Шаг 2', 'Шаг 3'];

    const navigate = useNavigate();

    const validateStep = (currentStep) => {
        switch (currentStep) {
            case 1:
                return validateStepOne(formData);
            case 2:
                return validateStepTwo(
                    formData.userType,
                    formData.userType === "individual" ? formData.individualData : formData.companyData
                );
            case 3:
                return validateStepThree(
                    formData.userType,
                    formData.userType === "individual" ? formData.individualData : formData.companyData
                );
            default:
                return {};
        }
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }))
    }

    const handleStepChange = (nextStep) => {
        if (nextStep > step) {
            console.log("Переход на шаг:", nextStep);

            const validationErrors = validateStep(step);

            if (Object.keys(validationErrors).length > 0) {
                setErrors(validationErrors);
                console.log("Ошибки валидации:", validationErrors);
                for (let error of Object.values(validationErrors)) {
                    alert(error);
                }
                return;
            }
        }

        setErrors({});
        console.log(formData);
        setStep(nextStep);
    }

    const handleNestedFormChange = (formName, newData,) => {
        setFormData((prev) => ({
            ...prev,
            [formName]: newData,
        }));

    };

    const handleSubmit = () => {
        let validationErrors = validateStep(3);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            console.log("Ошибки валидации:", validationErrors);
            for (let error of Object.values(validationErrors)) {
                alert(error);
            }
            return;
        }
        console.log(formData)

        //     const payload = {
        //         ...formData,
        //         individualData: formData.userType === "individual" ? formData.individualData : null,
        //         companyData: formData.userType === "company" ? formData.companyData : null,
        //     };
        //     console.log("Отправка данных:", JSON.stringify(payload));
    };

    return (
        <div className="registration">
            <div className="container">
                <ProgressBar currentStep={step - 1} steps={steps} />
                {step === 1 && (
                    <StepOne
                        formData={formData}
                        onChange={handleInputChange}
                        onNext={() => handleStepChange(2)}
                    />
                )}
                {step === 2 && (
                    <StepTwo
                        userType={formData.userType}
                        data={formData}
                        onBack={() => handleStepChange(1)}
                        onNext={() => handleStepChange(3)}
                        onNestedChange={handleNestedFormChange}
                    />
                )}
                {step === 3 && (
                    <StepThree
                        userType={formData.userType}
                        data={formData}
                        onBack={() => handleStepChange(2)}
                        onSubmit={handleSubmit}
                        onNestedChange={handleNestedFormChange}
                        image={formData.individualData.identityDocuments}
                    />
                )}
            </div>
        </div >
    )

};

export default RegistrationPage;