const SearchItemCard = ({ bodyType, weight, volume, from, to, price, typePay, typeButton, status, onClickOne, onClickTwo, onClickThree }) => {
    return (
        <div className="search__item">
            <div className={`search__item-text ${typeButton === 'mylist' ? 'search__item-text--mylist' : ''}`}>
                <p className="search__item-content">{bodyType}</p>
                <p className="search__item-content">{weight} т / {volume} кв.м</p>
                <p className="search__item-content search__item-content--hide">{from}</p>
                <p className="search__item-content search__item-content--hide">{to}</p>
                <p className="search__item-content search__item-content--yellow">{price}</p>
                <p className="search__item-content search__item-content--brown search__item-content--hide">{typePay}</p>
                {typeButton === 'mylist' ? <p className="search__item-content">{status}</p> : ''}
            </div>
            <div className="search__item-btns">
                <button className="search__item-button" onClick={onClickOne}>{typeButton === 'main' ? 'Узнать подробности' : 'Редактировать'}</button>
                {typeButton === 'mylist' ?
                    <>
                        <button className="search__item-button" onClick={onClickTwo}>Удалить</button>
                        <button className="search__item-button" onClick={onClickThree}>{status === 'HIDDEN' ? 'Опубликовать' : 'Снять с публикации'}</button>
                    </>
                    : ''}
            </div>
        </div>
    )
};

export default SearchItemCard;