import React, { useEffect, useState } from "react";
import FormGroup from "../FormGroup";
import { useMask } from "@react-input/mask";
import { validateIndividaulData } from "../../../validation/validations";
import { toast } from "react-toastify";

const IndividualInfoForm = ({ data, isNull, onClickButton, onNestedChange, onChangeImage, isLoadingData, onLoadImage, onDeleteFile }) => {

    const [isEdit, setIsEdit] = useState(false);
    const [uploadedImages, setUploadedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            return <div className="loading-indicator">Загрузка...</div>;
        }
        if (data.individual?.imagesIds?.length > 0) {
            const newImages = data.individual?.imagesIds?.map(photo => ({
                id: photo?.id,
                path: photo?.path,
                isNew: false
            }));

            if (JSON.stringify(newImages) !== JSON.stringify(uploadedImages)) {
                setUploadedImages(newImages);
                onChangeImage("individual", "imagesIds", newImages.map(img => img.id));
            };
        } 
    }, [isLoadingData]);

    const inputPassportNumberMask = useMask({
        mask: '____ ______',
        replacement: { _: /\d/ },
    })

    const inputDepartmentCodeMask = useMask({
        mask: '___-___',
        replacement: { _: /\d/ },
    })

    const handleSubmit = () => {
        const individualData = data.individual || {};
        const errors = validateIndividaulData(individualData, isNull);

        if (Object.keys(errors).length > 0) {
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return false;
        }

        onClickButton();
        setIsEdit(false);
        return true;
    };

    const handleButtonClick = () => {
        if (!isEdit) {
            setIsEdit(true);
        } else {
            const success = handleSubmit();
            if (!success) return;
        }
    };

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const filesToUpload = files.slice(0, 2 - uploadedImages.length);
        if (filesToUpload.length === 0) {
            return;
        };

        setIsLoading(true);

        try {
            const uploadPromises = filesToUpload.map(file =>
                onLoadImage(file)
                    .then(response => ({
                        id: response.id,
                        path: response.path,
                        isNew: true
                    }
                    ))
                    .catch(error => {
                        console.error('Ошибка загрузки фото:', error);
                        return null;
                    })
            );

            const newImages = (await Promise.all(uploadPromises)).filter(Boolean);
            const updatedImages = [...uploadedImages, ...newImages];
            setUploadedImages(updatedImages);
            onChangeImage("individual", "imagesIds", updatedImages.map(img => img.id));
        } finally {
            setIsLoading(false);
        };
    };


    const handleRemoveImage = (index, id) => {
        onDeleteFile(id);
        const updatedImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(updatedImages);
        onChangeImage("imagesIds", updatedImages.map(img => img.id));
    };

    if (data.legalType !== "INDIVIDUAL") return null;

    return (
        <div className="profileForm profileForm--individual">
            <h2 className="profileForm__title profileForm__title--individual">Информация о пользователе</h2>
            <FormGroup label="Полное имя" modification="individual">
                <input className="profileForm__input"
                    type="text"
                    name="individual"
                    value={data.individual?.fullName || ""}
                    data-path="fullName"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                    placeholder="Фамилия Имя Отчество"
                />
            </FormGroup>
            <FormGroup label="Серия и номер паспорта" modification="individual">
                <input className="profileForm__input"
                    type="text"
                    name="individual"
                    value={data.individual?.passportNumber || ""}
                    data-path="passportNumber"
                    disabled={!isEdit}
                    ref={inputPassportNumberMask}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Кем выдан" modification="individual">
                <input className="profileForm__input"
                    type="text"
                    name="individual"
                    value={data.individual?.issuedBy || ""}
                    data-path="issuedBy"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Дата выдачи" modification="individual">
                <input className="profileForm__input"
                    type="date"
                    name="individual"
                    value={data.individual?.issueDate || ""}
                    data-path="issueDate"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Код департамента" modification="individual">
                <input className="profileForm__input"
                    type="text"
                    name="individual"
                    value={data.individual?.departmentCode || ""}
                    data-path="departmentCode"
                    disabled={!isEdit}
                    ref={inputDepartmentCodeMask}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Адрес регистрации" modification="individual">
                <input
                    className="profileForm__input"
                    type="text"
                    name="individual"
                    value={data.individual?.registrationAddress || ""}
                    data-path="registrationAddress"
                    disabled={!isEdit}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <div className="profileForm__photos">
                <FormGroup label="Фото паспорта" modification='individual'>
                    <div className="profileForm__photos-btnBox">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                            disabled={!isEdit || (uploadedImages.length >= 2 || isLoading)}
                        />
                        <span className="profileForm__photos-button">Загрузить фото (макс. 2)</span>
                        {isLoading && <div className="profileForm__photos-loader"></div>}
                    </div>
                </FormGroup>
                <div className="profileForm__photos-gallery">
                    {uploadedImages.map((image, index) => (
                        <div key={index} className="profileForm__gallery-imgBox">
                            <div className="profileForm__gallery-preview">
                                {image.path ? (
                                    <img
                                        src={`https://cargo-way-service.ru/minio/${image.path}`}
                                        alt={`Фото ${index + 1}`}
                                        className="profileForm__gallery-image"
                                    />
                                ) : null}
                                <button
                                    className="profileForm__gallery-button"
                                    onClick={() => handleRemoveImage(index, image.id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button className="profileForm__button profileForm__button--individual"
                onClick={handleButtonClick}>
                {!isEdit
                    ? isNull
                        ? 'Заполнить паспортные данные'
                        : 'Редактировать'
                    : 'Отправить новые данные'}
            </button>
        </div >
    )
};

export default IndividualInfoForm;
