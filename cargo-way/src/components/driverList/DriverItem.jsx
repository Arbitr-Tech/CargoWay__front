const DriverItem = ({ name = '', licenseCategory, licenseNumber, issueDate, expirationDate, onClickEdit, onClickDelete}) => {
    return (
        <div className="driverList__item">
            <div className="driverList__item-text">
                <p className="driverList__item-content">{name}</p>
                <p className="driverList__item-content">{licenseCategory}</p>
                <p className="driverList__item-content">{licenseNumber}</p>
                <p className="driverList__item-content">{issueDate}</p>
                <p className="driverList__item-content driverList__item-content--hide">{expirationDate}</p>
            </div>
            <div className="driverList__item-btns">
                <button className="driverList__item-button" onClick={onClickEdit}>
                    Редактировать
                </button>
                <button className="driverList__item-button" onClick={onClickDelete}>
                    Удалить
                </button>
            </div>
        </div>
    )
};

export default DriverItem;