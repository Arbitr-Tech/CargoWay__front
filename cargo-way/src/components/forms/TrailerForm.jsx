import { useMask } from "@react-input/mask";
import FormGroup from "./FormGroup";
import { useEffect, useState } from "react";

const TrailerForm = ({ data, onChange, onLoadImage, onDeleteFile, onChangeImage, typePage, isLoadingData }) => {

    const bodyType = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 24, name: "Option 5" },
        { id: 36, name: "Option 6" },
        { id: 47, name: "Option 7" },
        { id: 21, name: "Option 8" },
        { id: 34, name: "Option 9" },
        { id: 45, name: "Option 10" },
    ];

    const inputTrailerNumberMask = useMask({
        mask: 'AA____',
        replacement: {
            A: /[А-Яа-я]/,
            _: /\d/
        }
    })

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

    const [uploadedImages, setUploadedImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        if (typePage === 'add') {
            onDeleteFile(id);
        }
        const updatedImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(updatedImages);
        onChangeImage("imagesIds", updatedImages.map(img => img.id));

    };


    return (
        <div className="trailerForm">
            <div className="trailerForm__main">
                <FormGroup label="Прицеп">
                    <input className="trailerForm__input"
                        type="text"
                        name="name"
                        value={data.name || ""}
                        placeholder="Модель"
                        onChange={onChange}
                    />
                    <input className="trailerForm__input"
                        type="text"
                        name="trailerNumber"
                        value={data.trailerNumber || ""}
                        placeholder="Номер прицепа (AA1111)"
                        ref={inputTrailerNumberMask}
                        onChange={onChange}
                    />
                    <input className="trailerForm__input"
                        type="number"
                        name="liftingCapacity"
                        value={data.liftingCapacity === 0 ? '' : data.liftingCapacity}
                        placeholder="Грузоподъемность (т)"
                        onChange={onChange}
                    />
                </FormGroup>
                <div className="trailerForm__section">
                    <label className="trailerForm__label">
                        <span className="trailerForm__label-text">Тип кузова</span>
                        <div className="trailerForm__input-group">
                            {bodyType.map((option) => (
                                <label key={option.id} className="trailerForm__radiobox-label">
                                    <input className="radiobox"
                                        type="radio"
                                        name="bodyType"
                                        value={option.name || ""}
                                        checked={data.bodyType === option.name}
                                        onChange={onChange}
                                    />
                                    {option.name}
                                </label>
                            ))}
                        </div>
                    </label>
                    <label className="trailerForm__label">
                        <span className="trailerForm__label-text">Тип загрузки</span>
                        <div className="trailerForm__input-group">
                            {bodyType.map((option) => (
                                <label key={option.id} className="trailerForm__radiobox-label">
                                    <input className="trailerForm__radiobox"
                                        type="radio"
                                        name="loadType"
                                        value={option.name || ""}
                                        checked={data.loadType === option.name}
                                        onChange={onChange}
                                    />
                                    {option.name}
                                </label>
                            ))}
                        </div>
                    </label>
                    <label className="trailerForm__label">
                        <span className="trailerForm__label-text">Тип выгрузки</span>
                        <div className="trailerForm__input-group">
                            {bodyType.map((option) => (
                                <label key={option.id} className="trailerForm__radiobox-label">
                                    <input className="trailerForm__radiobox"
                                        type="radio"
                                        name="unloadType"
                                        value={option.name || ""}
                                        checked={data.unloadType === option.name}
                                        onChange={onChange}
                                    />
                                    {option.name}
                                </label>
                            ))}
                        </div>
                    </label>
                </div>
                <FormGroup label="Габариты">
                    <input className="trailerForm__input trailerForm__input--short"
                        type="number"
                        name="length"
                        value={data['length'] === 0 ? '' : data['length']}
                        placeholder="Длина (м)"
                        onChange={onChange}
                    />
                    <input className="trailerForm__input trailerForm__input--short"
                        type="number"
                        name="width"
                        value={data.width === 0 ? '' : data.width}
                        placeholder="Ширина (м)"
                        onChange={onChange}
                    />
                    <input className="trailerForm__input trailerForm__input--short"
                        type="number"
                        name="height"
                        value={data.height === 0 ? '' : data.height}
                        placeholder="Высота (м)"
                        onChange={onChange}
                    />
                    <input className="trailerForm__input trailerForm__input--short"
                        type="number"
                        name="volume"
                        value={data.volume === 0 ? '' : data.volume}
                        placeholder="Объем (куб.м)"
                        onChange={onChange}
                    />
                </FormGroup>
                <div className="trailerForm__photos">
                    <FormGroup label="Фото прицепа" modification='photo'>
                        <div className="trailerForm__photos-btnBox">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                onChange={handleFileUpload}
                                style={{ display: 'none' }}
                                disabled={uploadedImages.length >= 5 || isLoading}
                            />
                            <span className="trailerForm__photos-button">Загрузить фото (макс. 5)</span>
                            {isLoading && <div className="trailerForm__photos-loader"></div>}
                        </div>
                    </FormGroup>
                    <div className="trailerForm__photos-gallery">
                        {uploadedImages.map((image, index) => (
                            <div key={index} className="trailerForm__gallery-imgBox">
                                <div className="trailerForm__gallery-preview">
                                    {image.path ? (
                                        <img
                                            src={`https://cargo-way-service.ru/minio/${image.path}`} 
                                            alt={`Фото ${index + 1}`}
                                            className="trailerForm__gallery-image"
                                        />
                                    ) : null}
                                    <button
                                        className="trailerForm__gallery-button"
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
        </div>
    )
};

export default TrailerForm;