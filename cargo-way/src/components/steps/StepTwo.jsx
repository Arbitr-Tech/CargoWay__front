import React from "react";
import { IndividualForm } from "../forms/individualForms/IndividualForm";
import { CompanyForm } from "../forms/companyForms/CompanyForm";

const StepTwo = ({ userType, data, onBack, onNext, onNestedChange }) => {
    return (
        <div className="step">
            {userType === "individual" ? (
                <IndividualForm
                    data={data.individual}
                    onChange={(newData) => onNestedChange("individual", newData)}
                />
            ) : (
                <CompanyForm
                    data={data.company}
                    onChange={(newData) => onNestedChange("company", newData)}
                />
            )}
            <button className="step__button" onClick={onBack}>Назад</button>
            <button className="step__button" onClick={onNext}>Далее</button>
        </div>
    );
};

export default StepTwo;
