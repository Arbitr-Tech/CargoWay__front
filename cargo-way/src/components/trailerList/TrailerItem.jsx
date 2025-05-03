const TrailerItem = ({name, trailerNumber, liftingCapacity, length, width, volume, height, onClickEdit, onClickDelete }) => {
return (
        <div className="trailerList__item">
            <div className="trailerList__item-text">
                <p className="trailerList__item-content">{name}</p>
                <p className="trailerList__item-content">{trailerNumber}</p>
                <p className="trailerList__item-content trailerList__item-content--hide">{liftingCapacity} т</p>
                <p className="trailerList__item-content trailerList__item-content--hide">{length} м</p>
                <p className="trailerList__item-content">{width} м</p>
                <p className="trailerList__item-content trailerList__item-content--hide">{height} м</p>
            </div>
            <div className="trailerList__item-btns">
                    <button className="trailerList__item-button" onClick={onClickEdit}>
                        Редактировать
                    </button>
                    <button className="trailerList__item-button" onClick={onClickDelete}>
                        Удалить
                    </button>
            </div>
        </div>
    )
};

export default TrailerItem;