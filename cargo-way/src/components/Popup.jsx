const Popup = ({ isOpen, text, typePopup, onClose, onConfirm }) => {
    if (!isOpen) return null;

    const fieldNames = {
        name: "Название",
        description: "Описание",
        weight: "Вес (кг)",
        volume: "Объём (кв.м)",
        dimensions: "Габариты",
        length: "Длина",
        width: "Ширина",
        height: "Высота",
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
        photos: "Фото груза"
    };

    const renderText = (data) => {
        return Object.entries(data).map(([key, value]) => (
            <div key={key} className="popup__text-item">
                <p className="popup__text-title">{fieldNames[key] || key.charAt(0).toUpperCase() + key.slice(1)}:</p>
                {typeof value === 'object' ? (
                    <ul className="popup__text-subtitle">
                        {Object.entries(value).map(([subKey, subValue]) => (
                            <li key={subKey} className="popup__text-subValue">
                                {fieldNames[subKey] || subKey.charAt(0).toUpperCase() + subKey.slice(1)}: {'subValue'}
                            </li>
                        ))}
                    </ul>
                ) : (
                    ` ${value}`
                )}
            </div>
        ));
    };

    return (
        <div className="popup">
            <div className="popup__icon">
                <img src="/assets/img/close.svg" alt="close" onClick={onClose} />
            </div>
            <div className="popup__text">
                {typePopup === 'contacts' ? renderText(text) : text}
            </div>
            {(typePopup === 'del' || typePopup === 'exit' || typePopup === 'edit') && (
                <div className="popup__buttons">
                    <button className="popup__button" onClick={onConfirm}>Подтвердить</button>
                    <button className="popup__button" onClick={onClose}>Отменить</button>
                </div>
            )}
        </div>
    );
};

export default Popup;