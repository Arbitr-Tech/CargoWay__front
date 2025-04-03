import React from 'react';
import { IndividualAdditionalForm } from '../forms/individualForms/IndividualAssitionalForm';
import { CompanyAdditionalForm } from '../forms/companyForms/CompanyAdditionalForm';

const StepThree = ({ userType, data, onBack, onSubmit, onNestedChange, onChangeImage }) => {
    return (    
        <div className='step'>
            {userType === "individual" ? (
                <IndividualAdditionalForm
                    data={data.individual}
                    onChange={(newData) => onNestedChange("individual", newData)}
                    onChangeNested={onNestedChange}
                    onChangeImage={onChangeImage}
                />
            ) : (
                <CompanyAdditionalForm
                    data={data.company}
                    onChange={(newData) => onNestedChange("company", newData)}
                />
            )}
            <button className='step__button' onClick={onBack}>Назад</button>
            <button className='step__button' onClick={onSubmit}>Отправить</button>
        </div>
    )
};

export default StepThree;