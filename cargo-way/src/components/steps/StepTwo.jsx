import { IndividualForm } from "../forms/IndividualForm";
import { CompanyForm } from "../forms/CompanyForm";

const StepTwo = ({ userType, data, onBack, onNext, onNestedChange }) => {
    return (
        <div className="step">
            {userType === "individual" ? (
                <IndividualForm
                    data={data.individualData}
                    onChange={(newData) => onNestedChange("individualData", newData)}
                />
            ) : (
                <CompanyForm
                    data={data.companyData}
                    onChange={(newData) => onNestedChange("companyData", newData)}
                />
            )}
            <button className="step__button" onClick={onBack}>Назад</button>
            <button className="step__button" onClick={onNext}>Далее</button>
        </div>
    );
};

export default StepTwo;
