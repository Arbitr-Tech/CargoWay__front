const SearchDriverItemCard = ({ bodyType, weight, volume, from, to, price, typePay, typeButton, status, onClickOne, onClickTwo, onClickThree }) => {
    return (
        <div className="search__item">
            <div className={`search__item-text ${typeButton === 'mylist' ? 'search__item-text--mylist' : ''}`}>
                <p className="search__item-content">{bodyType}</p>
                <p className="search__item-content">{weight} т / {volume} кв.м</p>
                <p className="search__item-content">{from}</p>
                <p className="search__item-content">{to}</p>
                <p className="search__item-content">{price}</p>
                <p className="search__item-content">{typePay}</p>
                {typeButton === 'mylist' ? <p className="search__item-content">{status}</p> : ''}
            </div>
            <div className="search__item-btns">
                <button className="search__item-button" onClick={onClickOne}>{typeButton === 'main' ? 'Узнать контакты' : 'Редактировать'}</button>
                {typeButton === 'mylist' ?
                    <>
                        <button className="search__item-button" onClick={onClickTwo}>Удалить</button>
                        <button className="search__item-button" onClick={onClickThree}>{status === 'Не опубликовано' ? 'Опубликовать' : 'Снять с публикации'}</button>
                    </>
                    : ''}
            </div>
        </div>
    )
};

export default SearchDriverItemCard;