import React from "react";
import ProgressBar from "../ProgressBar";
import StepOne from "../steps/StepOne";
import StepTwo from "../steps/StepTwo";
import StepThree from "../steps/StepThree";
import { validateStepOne, validateStepTwo, validateStepThree } from "../../validation/validations"
import { observer } from "mobx-react-lite";
import { registrationStore } from "../../stores/RegistrationStore";
import { registration } from "../../api/regService";
import { loadFile } from "../../api/commonService";
import { toJS } from "mobx";
import { userStore } from "../../stores/UserStore";
import { useNavigate } from "react-router-dom";

const steps = ['Шаг 1', 'Шаг 2', 'Шаг 3'];

const RegistrationPage = observer(() => {

    const store = registrationStore;
    const storeUser = userStore;
    const navigate = useNavigate();

    const validateStep = (currentStep) => {
        const { registrationFormData } = store;
        const isIndividual = store.userType === "individual";
        const dataToValidate = isIndividual ? registrationFormData.individual : registrationFormData.company;

        const validators = {
            1: () => validateStepOne(registrationFormData, store),
            2: () => validateStepTwo(store.userType, dataToValidate),
            3: () => validateStepThree(store.userType, dataToValidate),
        };

        return validators[currentStep]?.() || {};
    };

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        store.setRegistrationFormData(name, value, type, checked);
        console.log(store.registrationFormData)
    }

    const handleStepChange = (nextStep) => {
        if (nextStep > store.registrationStep) {
            console.log("Переход на шаг:", nextStep);

            const errors = validateStep(store.registrationStep);

            if (Object.keys(errors).length > 0) {
                console.log("Ошибки валидации:", errors);
                alert(Object.values(errors).join("\n"));
                return;
            }
        }

        console.log(store.registrationFormData);
        store.setRegistrationStep(nextStep);
    }

    const handleSubmit = async () => {
        let errors = validateStep(3);

        if (Object.keys(errors).length > 0) {
            console.log("Ошибки валидации:", errors);
            alert(Object.values(errors).join("\n"));
            return;
        }
        console.log(toJS(store.registrationFormData))

        try {
            await registration(store.userType, toJS(store.registrationFormData))
            storeUser.setRole(store.registrationFormData.role);
            navigate('/');
            store.submitRegistration();

        } catch (error) {
            console.error("Ошибка входа:", error.message);
        }

    };

    return (
        <div className="registration">
            <div className="container">
                <ProgressBar currentStep={store.registrationStep - 1} steps={steps} />
                {store.registrationStep === 1 && (
                    <StepOne
                        formData={store.registrationFormData}
                        onChange={handleInputChange}
                        onNext={() => handleStepChange(2)}
                        checkedUserType={store.userType}
                        onChangeUserType={store.setUserType}
                    />
                )}
                {store.registrationStep === 2 && (
                    <StepTwo
                        userType={store.userType}
                        data={store.registrationFormData}
                        onBack={() => handleStepChange(1)}
                        onNext={() => handleStepChange(3)}
                        onNestedChange={store.setRegistrationNestedFormData}
                    />
                )}
                {store.registrationStep === 3 && (
                    <StepThree
                        userType={store.userType}
                        data={store.registrationFormData}
                        onBack={() => handleStepChange(2)}
                        onSubmit={handleSubmit}
                        onNestedChange={store.setRegistrationNestedFormData}
                        image={store.registrationFormData.individual.identityDocuments}
                        onChangeImage={loadFile}
                    />
                )}
            </div>
        </div >
    )

});

export default RegistrationPage;