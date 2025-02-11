import { IndividualAdditionalForm } from '../forms/registrationForms/IndividualAssitionalForm';
import { CompanyAdditionalForm } from '../forms/registrationForms/CompanyAdditionalForm';

const StepThree = ({ userType, data, onBack, onSubmit, onNestedChange, onChangeImage }) => {
    return (    
        <div className='step'>
            {userType === "individual" ? (
                <IndividualAdditionalForm
                    data={data.individualData}
                    onChange={(newData) => onNestedChange("individualData", newData)}
                    onChangeNested={onNestedChange}
                    onChangeImage={onChangeImage}
                />
            ) : (
                <CompanyAdditionalForm
                    data={data.companyData}
                    onChange={(newData) => onNestedChange("companyData", newData)}
                />
            )}
            <button className='step__button' onClick={onBack}>Назад</button>
            <button className='step__button' onClick={onSubmit}>Отправить</button>
        </div>
    )
};

export default StepThree;