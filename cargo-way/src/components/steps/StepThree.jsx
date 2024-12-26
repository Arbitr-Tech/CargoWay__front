import { IndividualAdditionalForm } from '../forms/IndividualAssitionalForm';
import { CompanyAdditionalForm } from '../forms/CompanyAdditionalForm';

const StepThree = ({ userType, data, onBack, onSubmit, onNestedChange, image }) => {
    return (    
        <div className='step'>
            {userType === "individual" ? (
                <IndividualAdditionalForm
                    data={data.individualData}
                    onChange={(newData) => onNestedChange("individualData", newData)}
                    image={image}
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