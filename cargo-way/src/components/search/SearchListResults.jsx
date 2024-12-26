import SearchItemCard from "./SearchItemCard";

const SearchListResults = ({ list, typeButton, onClickOne, onClickTwo }) => {
    return (
        < div className="search__result" >
            <div className="search__result-header">
                <p className="search__result-title">Направление</p>
                <p className="search__result-title">Транспорт</p>
                <p className="search__result-title">Вес, т / Объем, кв.м</p>
                <p className="search__result-title">Откуда</p>
                <p className="search__result-title">Куда</p>
                <p className="search__result-title">Ставка</p>
            </div>

            <div className={`search__result-list ${typeButton === 'mylist' ? 'search__result-list--mylist' : ''}`}>
                {list.map((item) => (
                    <SearchItemCard key={item.id}
                        direction={item.direction}
                        transport={item.transport}
                        weight={item.weight}
                        volume={item.volume}
                        from={item.from}
                        to={item.to}
                        price={item.price}
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