const SearchItemCard = ({bodyType, weight, volume, from, to, price, typePrice, typeButton, onClickOne, onClickTwo}) => {
    return (
        <div className="search__item">
            <div className="search__item-text">
                <p className="search__item-content">{bodyType}</p>
                <p className="search__item-content">{weight} т / {volume} кв.м</p>
                <p className="search__item-content">{from}</p>
                <p className="search__item-content">{to}</p>
                <p className="search__item-content">{price}</p>
                <p className="search__item-content">{typePrice}</p>
            </div>
            <div className="search__item-btns">
                <button className="search__item-button" onClick={onClickOne}>{typeButton === 'main' ? 'Узнать контакты' : 'Редактировать'}</button>
                {typeButton === 'mylist' ? <button className="search__item-button" onClick={onClickTwo}>Удалить</button> : ''}
            </div>
        </div>
    )
};

export default SearchItemCard;