import DriverItem from "./DriverItem";

const DriverList = ({ list, onClickEdit, onClickDelete}) => {
    return (
        < div className="driverList__result" >
            <div className="driverList__result-header">
                <p className="driverList__result-title">ФИО</p>
                <p className="driverList__result-title">Категория ВУ</p>
                <p className="driverList__result-title">Номер ВУ</p>
                <p className="driverList__result-title">Дата выдачи ВУ</p>
                <p className="driverList__result-title">Срок окончания выдачи ВУ</p>
            </div>
            <div className="driverList__result-list">
                {list.map((item) => (
                    <DriverItem key={item.id}
                        {...item}
                        onClickEdit={() => onClickEdit(item)}
                        onClickDelete={() => onClickDelete(item)}
                    />
                ))}
            </div>
        </div >
    )
};

export default DriverList;