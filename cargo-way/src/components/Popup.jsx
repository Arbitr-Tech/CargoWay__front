const Popup = ({ isOpen, text, typePopup, onClose, onConfirm, item }) => {
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
        photos: "Фото груза",
        brand: "Марка",
        model: "Модель",
        year: "Год выпуска",
        transportNumber: "Номер транспорта",
        trailerDetails: "Детали прицепа",
        trailerNumber: "Номер прицепа",
        liftingCapacity: "Грузоподъемность",
    };

    const renderText = (data) => {
        if (!data || typeof data !== "object") return null; // Проверяем, что data - объект

        const renderEntries = (obj) => (
            <ul className="popup__text-list">
                {Object.entries(obj || {}).map(([key, value]) => (
                    <li key={key} className="popup__text-item">
                        <span className="popup__text-title">
                            {fieldNames[key] || key.charAt(0).toUpperCase() + key.slice(1)}:
                        </span>
                        {value && typeof value === "object" ? renderEntries(value) : ` ${value}`}
                    </li>
                ))}
            </ul>
        );

        return renderEntries(data);
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