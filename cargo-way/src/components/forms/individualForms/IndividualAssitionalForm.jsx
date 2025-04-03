import React from "react";
import { toJS } from "mobx";
import { useState } from "react";

export const IndividualAdditionalForm = ({ data, onChange, onChangeNested, onChangeImage }) => {
    const [previewImages, setPreviewImages] = useState([null, null]);
    const [loading, setLoading] = useState([false, false]);

    const handleFileUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading((prev) => {
            const newLoading = [...prev];
            newLoading[index] = true;
            return newLoading;
        });

        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewImages((prev) => {
                const newPreviews = [...prev];
                newPreviews[index] = reader.result;
                return newPreviews;
            });
        };
        reader.readAsDataURL(file);

        try {
            const result = await onChangeImage(file);
            const existingPhotos = data.photos || [];
            const updatedPhotos = [...existingPhotos];
            updatedPhotos[index] = { guid: result.guid };
            onChangeNested("individual", {
                ...data,
                photos: updatedPhotos,
            });
        } catch (error) {
            console.error("Ошибка при загрузке фото:", error);
        } finally {
            // Останавливаем анимацию загрузки
            setLoading((prev) => {
                const newLoading = [...prev];
                newLoading[index] = false;
                return newLoading;
            });
        }
        console.log(toJS(data));
    };


    const handleCancelUpload = (index) => {
        setPreviewImages((prev) => {
            const newPreviews = [...prev];
            newPreviews[index] = null;
            return newPreviews;
        });

        const photos = data.photos || [];

        // Убираем фото по индексу
        const updatedPhotos = photos.filter((_, i) => i !== index);

        onChangeNested("individual", {
            ...data,
            photos: updatedPhotos,
        });

        console.log(toJS(data));
    };

    return (
        <div className="step__form">
            <input className="step__form-input"
                type="tel"
                name="phoneNumber"
                placeholder="Номер телефона"
                value={data.phoneNumber || ""}
                onChange={(e) => onChange({ ...data, phoneNumber: e.target.value })}
            />

            {[0, 1].map((index) => (
                <div key={index} className="step__form-imgBox">
                    <p className="step__form-label">Фото паспорта</p>
                    <input
                        className="step__form-input"
                        type="file"
                        name={`photo${index}`}
                        accept="image/*"
                        aria-label={`Фото паспорта ${index + 1}`}
                        onChange={(e) => handleFileUpload(e, index)}
                    />
                    {loading[index] ? <div className="step__form-loader"></div> :
                        previewImages[index] && (
                            <div className="step__form-preview">
                                <img className="step__form-image" src={previewImages[index]} alt={`Фото ${index + 1}`} />
                                <button className="step__form-button" onClick={() => handleCancelUpload(index)}>Отмена</button>
                            </div>
                        )
                    }
                </div>
            ))}
        </div>
    )
};
