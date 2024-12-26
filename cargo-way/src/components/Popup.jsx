const Popup = ({ isOpen, text, typePopup, onClose }) => {
    if (!isOpen) return null;

    const fieldNames = {
        number: 'Номер',
        address: 'Адрес',
        company: 'Компания',
    };

    return (
        <div className="popup">
            <div className="popup__icon">
                <svg onClick={onClose} width="24" height="24" viewBox="0 0 24 24" fill='#232873' xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 20L20 4" stroke="#232873" strokeWidth="3" strokeLinecap="round" />
                    <path d="M4 4L20 20" stroke="#232873" strokeWidth="3" strokeLinecap="round" />
                </svg>
            </div>
            <div className="popup__text">
                {typePopup === 'contacts' ? Object.entries(text).map(([key, value]) => (
                    <p key={key} className="popup__text-item">
                        {`${fieldNames[key] || key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
                    </p>
                )) : text}
            </div>
            {typePopup === 'del' && (
                <div className="popup__buttons">
                    <button className="popup__button">Удалить</button>
                    <button className="popup__button">Отменить</button>
                </div>
            )}
        </div>
    );
};

export default Popup;
