import SearchItemCard from "./SearchItemCard";

const SearchListResults = ({ list, typeButton, onClickOne, onClickTwo }) => {
    return (
        < div className="search__result" >
            <div className="search__result-header">
                <p className="search__result-title">Тип кузова</p>
                <p className="search__result-title">Вес, т / Объем, кв.м</p>
                <p className="search__result-title">Откуда</p>
                <p className="search__result-title">Куда</p>
                <p className="search__result-title">Ставка</p>
                <p className="search__result-title">Тип ставки</p>
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