import React, { useState } from "react";
import FormGroup from "../FormGroup";

const ContactInfoForm = ({ data, isNull, onClickButton, onNestedChange }) => {
    const [isEdit, setIsEdit] = useState(false);


    return (
        <div className="profileForm profileForm--company">
            <h2 className="profileForm__title">Контактная информация</h2>
            <FormGroup label="Telegram" modification="company">
                <input className="profileForm__input"
                    type="text"
                    name="contactData"
                    value={data.contactData?.telegramLink}
                    data-path="telegramLink"
                    onChange={onNestedChange}
                    disabled={!isEdit}
                />
            </FormGroup>
            <FormGroup label="WatsApp" modification="company">
                <input className="profileForm__input"
                    type="email"
                    name="contactData"
                    value={data.contactData?.whatsappLink}
                    data-path="whatsappLink"
                    onChange={onNestedChange}
                    disabled={!isEdit}
                />
            </FormGroup>
            <FormGroup label="Номер телефона" modification="company">
                <input className="profileForm__input"
                    type="tel"
                    name="contactData"
                    value={data.contactData?.phoneNumber}
                    data-path="phoneNumber"
                    onChange={onNestedChange}
                    disabled={!isEdit}
                />
            </FormGroup>
            <button
                className="profileForm__button"
                onClick={() => {
                    if (!isEdit) return setIsEdit(true);
                    onClickButton();
                    setIsEdit(false);
                }}>
                {!isEdit ? isNull ? 'Заполнить контактные данные' : 'Редактировать' : 'Отправить новые данные'}
            </button>
        </div>
    )
};

export default ContactInfoForm;
