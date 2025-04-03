import React, { useState } from "react";
import FormGroup from "../FormGroup";

const CompanyInfoForm = ({ data, isNull, onClickButton, onNestedChange }) => {

    const [isEdit, setIsEdit] = useState(false);
    // if (data.legalType === "INDIVIDUAL") return null; //ЭТО ВАЖНО. НЕ УДАЛЯТЬ

    return (
        <div className="profileForm profileForm--company">
            <h2 className="profileForm__title profileForm__title--company">Информация о компании</h2>
            <FormGroup label="Название компании" modification="company">
                <input className="profileForm__input"
                    type="text"
                    name="company"
                    value={data.company?.name || ""}
                    data-path="name"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="ИНН" modification="company">
                <input className="profileForm__input"
                    type="number"
                    name="company"
                    value={data.company?.inn || ""}
                    data-path="inn"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="ОГРН" modification="company">
                <input className="profileForm__input"
                    type="number"
                    name="company"
                    value={data.company?.ogrn || ""}
                    data-path="ogrn"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="БИК" modification="company">
                <input className="profileForm__input"
                    type="number"
                    name="company"
                    value={data.company?.bic || ""}
                    data-path="bic"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Корреспондентский счет" modification="company">
                <input className="profileForm__input"
                    type="number"
                    name="company"
                    value={data.company?.correspondentAccount || ""}
                    data-path="correspondentAccount"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Дата регистрации компании" modification="company">
                <input
                    className="profileForm__input"
                    type="date"
                    name="company"
                    value={data.company?.registrationDate || ""}
                    data-path="registrationDate"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <button className="profileForm__button profileForm__button--company"
                onClick={() => {
                    if (!isEdit) return setIsEdit(true);
                    onClickButton();
                    setIsEdit(false);
                }}>
                {!isEdit ? isNull ? 'Заполнить данные компании' : 'Редактировать' : 'Отправить новые данные'}
            </button>
        </div >
    )
};

export default CompanyInfoForm;
