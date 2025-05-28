import { useEffect, useState } from "react";
import FormGroup from "./FormGroup";
import React from "react";

const CargoForm = ({ data, onChange, onNestedChange, onChangeImage, onLoadImage, typePage, isLoadingData, onDeleteFile }) => {

    const bodyType = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 25, name: "Option 5" },
        { id: 35, name: "Option 6" },
        { id: 43, name: "Option 7" },
        { id: 27, name: "Option 8" },
        { id: 32, name: "Option 9" },
        { id: 49, name: "Option 10" },
    ];

    const [uploadedImages, setUploadedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isLoading) {
            return <div className="loading-indicator">Загрузка...</div>;
        }
        if (typePage === 'edit' && data.imagesIds?.length > 0) {
            const newImages = data.imagesIds.map(photo => ({
                id: photo?.id,
                path: photo?.path,
                isNew: false
            }));

            if (JSON.stringify(newImages) !== JSON.stringify(uploadedImages)) {
                setUploadedImages(newImages);
                onChangeImage("imagesIds", newImages.map(img => img.id));
            };
        } else if (typePage === 'add') {
            setUploadedImages([]);
        };
    }, [isLoadingData, typePage]);

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const filesToUpload = files.slice(0, 5 - uploadedImages.length);
        if (filesToUpload.length === 0) {
            alert('Можно загрузить не более 5 фотографий');
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
            onChangeImage("imagesIds", updatedImages.map(img => img.id));
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

    return (
        <div className="cargoForm">
            <FormGroup label="Груз" modification="cargo">
                <input className="cargoForm__input"
                    type="text"
                    name="name"
                    value={data.name || ''}
                    placeholder="Укажите груз"
                    onChange={onChange}
                />
                <input className="cargoForm__input cargoForm__input--short"
                    type="number"
                    name="weight"
                    value={data.weight === 0 ? '' : data.weight}
                    placeholder="Вес (т)"
                    onChange={onChange}
                />
                <input className="cargoForm__input cargoForm__input--short"
                    type="number"
                    name="volume"
                    value={data.volume === 0 ? '' : data.volume}
                    placeholder="Объем (куб.м)"
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Габариты" modification="cargo">
                <input className="cargoForm__input"
                    type="number"
                    name="dimensions"
                    data-path="length"
                    value={
                        data.dimensions ?
                            data.dimensions.length === 0 ? '' : data.dimensions['length'] :
                            0
                    }
                    placeholder="Длина (м)"
                    onChange={onNestedChange}
                />
                <input className="cargoForm__input cargoForm__input--short"
                    type="number"
                    name="dimensions"
                    data-path="width"
                    value={
                        data.dimensions ?
                            data.dimensions.width === 0 ? '' : data.dimensions.width :
                            0
                    }
                    placeholder="Ширина (м)"
                    onChange={onNestedChange}
                />
                <input className="cargoForm__input cargoForm__input--short"
                    type="number"
                    name="dimensions"
                    data-path="height"
                    value={
                        data.dimensions ?
                            data.dimensions.height === 0 ? '' : data.dimensions.height :
                            0
                    }
                    placeholder="Высота (м)"
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Описание груза" modification="cargo">
                <textarea className="cargoForm__textarea"
                    type="text"
                    name="description"
                    value={data.description || ''}
                    placeholder="Опишите груз"
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Возможная загрузка" modification="cargo">
                <input className="cargoForm__input"
                    type="date"
                    name="readyDate"
                    value={data.readyDate || ''}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Возможная выгрузка" modification="cargo">
                <input className="cargoForm__input"
                    type="date"
                    name="deliveryDate"
                    value={data.deliveryDate || ''}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Место загрузки" modification="cargo">
                <input className="cargoForm__input cargoForm__input--long"
                    type="text"
                    name="route"
                    data-path="from"
                    placeholder="Укажите населенный пункт и адрес"
                    value={data.route?.from || ''}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Место выгрузки" modification="cargo">
                <input className="cargoForm__input cargoForm__input--long"
                    type="text"
                    name="route"
                    data-path="to"
                    placeholder="Укажите населенный пункт и адрес"
                    value={data.route?.to || ''}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <div className="cargoForm__section">
                <label className="cargoForm__label">
                    <span className="cargoForm__label-text">Тип кузова</span>
                    <div className="cargoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="cargoForm__radiobox-label">
                                <input className="cargoForm__radiobox"
                                    type="radio"
                                    name="bodyType"
                                    value={option.name || ''}
                                    checked={data.bodyType.includes(option.name)}
                                    onChange={onChange}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                </label>
                <label className="cargoForm__label">
                    <span className="cargoForm__label-text">Тип загрузки</span>
                    <div className="cargoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="cargoForm__radiobox-label">
                                <input className="cargoForm__radiobox"
                                    type="radio"
                                    name="loadType"
                                    value={option.name || ''}
                                    checked={data.loadType.includes(option.name)}
                                    onChange={onChange}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                </label>
                <label className="cargoForm__label">
                    <span className="cargoForm__label-text">Тип выгрузки</span>
                    <div className="cargoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="cargoForm__radiobox-label">
                                <input className="cargoForm__radiobox"
                                    type="radio"
                                    name="unloadType"
                                    value={option.name || ''}
                                    checked={data.unloadType.includes(option.name)}
                                    onChange={onChange}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                </label>
            </div>
            <FormGroup label="Ставка (рубли)" modification="cargo">
                <input className="cargoForm__input"
                    type="number"
                    name="price"
                    placeholder="Укажите ставку"
                    value={data.price === 0 ? '' : data.price}
                    onChange={onChange}
                />
                <div className='cargoForm__radio'>
                    <label className='cargoForm__radio-label'>
                        <input className='cargoForm__radio-input'
                            type="radio"
                            name="typePay"
                            value="Без НДС, безнал"
                            checked={data.typePay === "Без НДС, безнал"}
                            onChange={onChange}
                        />
                        Без НДС, безнал
                    </label>
                    <label className='cargoForm__radio-label'>
                        <input className='cargoForm__radio-input'
                            type="radio"
                            name="typePay"
                            value="С НДС, безнал"
                            checked={data.typePay === "С НДС, безнал"}
                            onChange={onChange}
                        />
                        С НДС, безнал
                    </label>
                    <label className='cargoForm__radio-label'>
                        <input className='cargoForm__radio-input'
                            type="radio"
                            name="typePay"
                            value="Наличными"
                            checked={data.typePay === "Наличными"}
                            onChange={onChange}
                        />
                        Наличными
                    </label>
                </div>
            </FormGroup>
            <div className="cargoForm__photos">
                <FormGroup label="Фото груза" modification='cargoPhoto'>
                    <div className="cargoForm__photos-btnBox">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                            disabled={uploadedImages.length >= 5 || isLoading}
                        />
                        <span className="cargoForm__photos-button">Загрузить фото (макс. 5)</span>
                        {isLoading && <div className="cargoForm__photos-loader"></div>}
                    </div>
                </FormGroup>
                <div className="cargoForm__photos-gallery">
                    {uploadedImages.map((image, index) => (
                        <div key={index} className="cargoForm__gallery-imgBox">
                            <div className="cargoForm__gallery-preview">
                                {image.path ? (
                                    <img
                                        src={`https://cargo-way-service.ru/minio/${image.path}`}
                                        alt={`Фото ${index + 1}`}
                                        className="cargoForm__gallery-image"
                                    />
                                ) : null}
                                <button
                                    className="cargoForm__gallery-button"
                                    onClick={() => handleRemoveImage(index, image.id)}
                                >
                                    Удалить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};

export default CargoForm;