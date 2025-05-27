import FormGroup from "./FormGroup";
import Select from 'react-select';
import { useMask } from "@react-input/mask";
import { useEffect, useState } from "react";

const DriverForm = ({ data, onChange, typePage, onChangeImage, isLoadingData, onLoadImage, onDeleteFile }) => {

    const VALID_CATEGORIES = [
        'A', 'A1', 'B', 'BE', 'B1',
        'C', 'CE', 'C1', 'C1E',
        'D', 'DE', 'D1', 'D1E',
        'M', 'Tm', 'Tb'
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

    const customStyles = {
        container: (provided) => ({
            ...provided,
            maxWidth: '70%',
        }),
        control: (provided, state) => ({
            ...provided,
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderColor: state.isFocused ? '#E9C17D' : '#2C2C2C',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#E9C17D',
            }
        }),
        placeholder: (provided) => ({
            ...provided,
            color: '#2C2C2C',
            wordBreak: 'break-all',
        }),
        dropdownIndicator: (provided) => ({
            ...provided,
            color: '#2C2C2C',
            padding: '8px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isFocused ? 'rgba(233, 193, 125, 0.551)' : provided.backgroundColor,
        }),
        indicatorSeparator: (provided) => ({
            ...provided,
            marginLeft: '0.7rem',
            backgroundColor: '#E9C17D',
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            width: '60%',
            overflow: 'hidden',
        }),
    };

    const inputLicenseNumberMask = useMask({
        mask: '____ ______',
        replacement: { _: /\d/ },
    });

    const handleFileUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const filesToUpload = files.slice(0, 2 - uploadedImages.length);
        if (filesToUpload.length === 0) {
            alert('Можно загрузить не более 2 фотографий');
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
        <div className="driverForm">
            <FormGroup label="ФИО" modification="driver">
                <input className="driverForm__input"
                    type="text"
                    name="fullName"
                    value={data.fullName || ""}
                    onChange={onChange}
                    placeholder="Фамилия Имя Отчество"
                />
            </FormGroup>
            <FormGroup label="Категория водительских прав" modification="driver">
                <div className="driverForm__categories">
                    <Select
                        styles={customStyles}
                        isMulti
                        options={VALID_CATEGORIES.map(c => ({ value: c, label: c }))}
                        value={data.licenseCategory ? data.licenseCategory.split(',').map(c => ({ value: c, label: c })) : []}
                        onChange={selected => {
                            const value = selected.map(c => c.value).join(',');
                            onChange({
                                target: { name: 'licenseCategory', value }
                            })
                        }}
                        placeholder="Категории"
                    />
                </div>
            </FormGroup>
            <FormGroup label="Номер водительских прав" modification="driver">
                <input className="driverForm__input"
                    type="text"
                    name="licenseNumber"
                    value={data.licenseNumber || ""}
                    onChange={onChange}
                    ref={inputLicenseNumberMask}
                    placeholder="Например: 1111 111111"
                />
            </FormGroup>
            <FormGroup label="Дата выдачи водительских прав" modification="driver">
                <input className="driverForm__input"
                    type="date"
                    name="issueDate"
                    value={data.issueDate || ""}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Дата окончания срока действия" modification="driver">
                <input className="driverForm__input"
                    type="date"
                    name="expirationDate"
                    value={data.expirationDate || ""}
                    onChange={onChange}
                />
            </FormGroup>
            <div className="driverForm__photos">
                <FormGroup label="Фото ВУ" modification='driverPhoto'>
                    <div className="driverForm__photos-btnBox">
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                            disabled={uploadedImages.length >= 2 || isLoading}
                        />
                        <span className="driverForm__photos-button">Загрузить фото (макс. 2)</span>
                        {isLoading && <div className="driverForm__photos-loader"></div>}
                    </div>
                </FormGroup>
                <div className="driverForm__photos-gallery">
                    {uploadedImages.map((image, index) => (
                        <div key={index} className="driverForm__gallery-imgBox">
                            <div className="driverForm__gallery-preview">
                                {image.path ? (
                                    <img
                                        src={`https://cargo-way-service.ru/minio/${image.path}`}
                                        alt={`Фото ${index + 1}`}
                                        className="driverForm__gallery-image"
                                    />
                                ) : null}
                                <button
                                    className="driverForm__gallery-button"
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
}

export default DriverForm;