import ReactDOM from "react-dom";

const Popup = ({ isOpen, text, typePopup, onClose, onConfirm, onRespond }) => {
    if (!isOpen) return null;

    const fieldNames = {
        name: "Название",
        description: "Описание",
        weight: "Вес (кг)",
        volume: "Объём (кв.м)",
        dimensions: "Габариты",
        length: "Длина (м)",
        width: "Ширина (м)",
        height: "Высота (м)",
        route: "Путь",
        from: "Откуда",
        to: "Куда",
        price: "Ставка",
        typePay: "Тип ставки",
        readyDate: "Готов к загрузке",
        deliveryDate: "Готов к выгрузке",
        bodyType: "Тип кузова",
        loadType: "Тип загрузки",
        unloadType: "Тип выгрузки",
        images: "Фото",
        brand: "Марка",
        model: "Модель",
        manufactureYear: "Год выпуска",
        transportNumber: "Номер транспорта",
        trailerDetails: "Детали прицепа",
        trailerNumber: "Номер прицепа",
        liftingCapacity: "Грузоподъемность (т)",
        driver: "Водитель",
        fullName: "ФИО",
        licenseCategory: "Категория ВУ",
        licenseNumber: "Номер ВУ",
        issueDate: "Дата выдачи ВУ",
        expirationDate: "Дата окончания ВУ",
        embeddedTrailer: "Встроенный прицеп",
        trailers: "Полуприцеп",
    };

    const formatValue = (value) => {
        if (value === null || value === undefined) return 'Отсутствует';
        if (Array.isArray(value) && value.length === 0) return 'Отсутствует';
        if (typeof value === 'object' && value.length === 0) return 'Отсутствует';
        return value;
    };

    const renderImages = (images) => {
        if (!images || images.length === 0) return 'Отсутствует';

        return (
            <div className="popup__text-imageBox">
                {images.map((img, index) => (
                    <a
                        key={index}
                        href={`https://cargo-way-service.ru/minio/${img.path}`}
                        target="_blank"
                        rel="noreferrer noopener"
                    >
                        <img
                            src={`https://cargo-way-service.ru/minio/${img.path}`}
                            alt={`Фото ${index + 1}`}
                            className="popup__imageBox-img"
                        />
                    </a>
                ))}
            </div>
        );
    };

    const renderObjectEntries = (obj, parentKey = '') => {
        return (
            <ul className="popup__text-list">
                {Object.entries(obj || {})
                    .filter(([key]) => {
                        if (key === 'id') return false;
                        if (parentKey === 'driver' && key === 'images') return false;
                        return true;
                    })
                    .map(([key, value]) => {
                        const formattedValue = formatValue(value);

                        return (
                            <li
                                key={key}
                                className={`popup__text-item
                                ${key === 'images' ? 'popup__text-item--photo' : ''}
                                ${typeof value === 'object' ? 'popup__text-item--obj' : ''}
                            `}
                            >
                                <span className="popup__text-title">
                                    {fieldNames[key] || key.charAt(0).toUpperCase() + key.slice(1)}:
                                </span>

                                {key === 'images'
                                    ? renderImages(value)
                                    : typeof value === 'object' && value !== null && !Array.isArray(value)
                                        ? formattedValue === 'Отсутсвует' ?
                                            'Отсутсвует'
                                            : renderObjectEntries(value, key)
                                        : formatValue(value)
                                }
                            </li>
                        );
                    })
                }
            </ul>
        );
    };

    const renderContent = () => {
        if (typePopup === 'details' || typePopup === 'detailsTransport') {
            return renderObjectEntries(text);
        }
        return text;
    };

    return ReactDOM.createPortal(
        <div className={`overlay ${isOpen ? "overlay--show" : ""}`}>
            <div className="popup">
                <div className="popup__icon">
                    <img src="/assets/img/close.svg" alt="close" onClick={onClose} />
                </div>
                <div className="popup__text">
                    {renderContent()}
                </div>
                {(typePopup !== 'details' && typePopup !== 'auth' && typePopup !== 'detailsTransport') && (
                    <div className="popup__buttons">
                        <button className="popup__button" onClick={onConfirm}>Подтвердить</button>
                        <button className="popup__button" onClick={onClose}>Отменить</button>
                    </div>
                )}
                {(typePopup === 'details') && (
                    <div className="popup__buttons">
                        <button className="popup__button" onClick={onRespond}>Откликнуться</button>
                    </div>
                )}
            </div>
        </div>,
        document.getElementById("popup-root")
    );
};

export default Popup;