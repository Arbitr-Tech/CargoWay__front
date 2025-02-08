const Popup = ({ isOpen, text, typePopup, onClose, onConfirm }) => {
    if (!isOpen) return null;

    const fieldNames = {
        number: 'Номер',
        address: 'Адрес',
        company: 'Компания',
    };

    return (
        <div className="popup">
            <div className="popup__icon">
                <img src="/assets/img/close.svg" alt="close"  onClick={onClose}/>
            </div>
            <div className="popup__text">
                {typePopup === 'contacts' ? Object.entries(text).map(([key, value]) => (
                    <p key={key} className="popup__text-item">
                        {`${fieldNames[key] || key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                    </p>
                )) : text}
            </div>
            {(typePopup === 'del' || typePopup === 'exit') && (
                <div className="popup__buttons">
                    <button className="popup__button" onClick={onConfirm}>Подтвердить</button>
                    <button className="popup__button" onClick={onClose}>Отменить</button>
                </div>
            )}
        </div>
    );
};

export default Popup;
