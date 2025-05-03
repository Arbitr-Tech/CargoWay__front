import TrailerItem from "./TrailerItem";

const TrailerList = ({ list, onClickEdit, onClickDelete }) => {
    return (
        < div className="trailerList__result" >
            <div className="trailerList__result-header">
                <p className="trailerList__result-title">Модель</p>
                <p className="trailerList__result-title">Номер</p>
                <p className="trailerList__result-title trailerList__result-title--hide">Грузоподъемность</p>
                <p className="trailerList__result-title trailerList__result-title--hide">Длина</p>
                <p className="trailerList__result-title">Ширина</p>
                <p className="trailerList__result-title trailerList__result-title--hide">Высота</p>
            </div>
            <div className="trailerList__result-list">
                {list.map((item) => (
                    <TrailerItem key={item.id}
                        {...item}
                        onClickEdit={() => onClickEdit(item)}
                        onClickDelete={() => onClickDelete(item)}
                    />
                ))}
            </div>
        </div >
    )
};

export default TrailerList;