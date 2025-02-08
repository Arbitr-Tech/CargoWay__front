import SearchItemCard from "./SearchItemCard";

const SearchListResults = ({ list, typeButton, onClickOne, onClickTwo }) => {
    return (
        < div className="search__result" >
            <div className={`search__result-header ${typeButton === 'mylist' ? 'search__result-header--mylist' : ''}`}>
                <p className="search__result-title">Тип кузова</p>
                <p className="search__result-title">Вес, т / Объем, кв.м</p>
                <p className="search__result-title search__result-title--hide">Откуда</p>
                <p className="search__result-title search__result-title--hide">Куда</p>
                <p className="search__result-title">Ставка</p>
                <p className="search__result-title search__result-title--hide">Тип ставки</p>
                {typeButton === 'mylist' ? <p className="search__result-title">Статус</p> : ''}
            </div>

            <div className={`search__result-list ${typeButton === 'mylist' ? 'search__result-list--mylist' : ''}`}>
                {list.map((item) => (
                    <SearchItemCard key={item.id}
                        bodyType={item.bodyType}
                        weight={item.weight || item.lifting_capacity}
                        volume={item.volume}
                        from={item.route.from}
                        to={item.route.to}
                        price={item.price}
                        typePrice={item.typePrice}
                        typeButton={typeButton}
                        status={item.status}
                        onClickOne={() => {
                            onClickOne(item)
                            console.log(item)
                        }}
                        onClickTwo={onClickTwo}
                    />
                ))}
            </div>
        </div >
    )
};

export default SearchListResults;