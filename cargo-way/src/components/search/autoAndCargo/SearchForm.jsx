import { useState } from "react";

const SearchForm = ({ data, onChange, onClickAuto, onClickCargo, page }) => {

    const bodyType = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
    ];
    const unloadType = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
    ];
    const loadType = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
    ];

    return (
        <div className="search">
            <div className="search__form">
                <div className="search__form-row">
                    <label className="search__form-label">
                        Откуда
                        <input className="search__form-input"
                            type="text"
                            name="routeFrom"
                            value={data.routeFrom}
                            placeholder="Введите город, регион или страну"
                            onChange={onChange}
                        />
                    </label>
                    <label className="search__form-label">
                        Куда
                        <input className="search__form-input"
                            type="text"
                            name="routeTo"
                            value={data.routeTo}
                            placeholder="Введите город, регион или страну"
                            onChange={onChange}
                        />
                    </label>
                    <label className="search__form-label search__form-label--fromTo">
                        <div className="search__form-title">Цена</div>
                        <div className="search__form-inputBox">
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="priceFrom"
                                value={data.priceFrom}
                                placeholder="от"
                                onChange={onChange}
                            />
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="priceTo"
                                value={data.priceTo}
                                placeholder="до"
                                onChange={onChange}
                            />
                        </div>
                    </label>
                </div>
                <div className="search__form-row">
                    <label className="search__form-label">
                        Дата погрузки
                        <input className="search__form-input"
                            type="date"
                            name="readyDate"
                            value={data.readyDate}
                            onChange={onChange}
                        />
                    </label>
                    <label className="search__form-label search__form-label--fromTo">
                        <div className="search__form-title">Вес, т</div>
                        <div className="search__form-inputBox">
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="weightFrom"
                                value={data.weightFrom}
                                placeholder="от"
                                onChange={onChange}
                            />
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="weightTo"
                                value={data.weightTo}
                                placeholder="до"
                                onChange={onChange}
                            />
                        </div>
                    </label>
                    <label className="search__form-label search__form-label--fromTo">
                        <div className="search__form-title">Объем, кв.м</div>
                        <div className="search__form-inputBox">
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="volumeFrom"
                                value={data.volumeFrom}
                                placeholder="от"
                                onChange={onChange}
                            />
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="volumeTo"
                                value={data.volumeTo}
                                placeholder="до"
                                onChange={onChange}
                            />
                        </div>
                    </label>
                </div>
            </div>
            <div className={`search__choice ${page === "MainSearchPage" ? "hide" : ""}`}>
                <div className="search__choice-box">
                    <span>Тип кузова</span>
                    {bodyType.map((option) => (
                        <label key={option.id} className="serch__choice-label">
                            <input className="serch__choice-input"
                                type="checkbox"
                                name="bodyType"
                                value={option.name}
                                checked={data.bodyType.includes(option.name)}
                                onChange={onChange}
                            />
                            {option.name}
                        </label>
                    ))}
                </div>
                <div className="search__choice-box">
                    <span>Тип загрузки</span>
                    {loadType.map((option) => (
                        <label key={option.id} className="serch__choice-label">
                            <input className="serch__choice-input"
                                type="checkbox"
                                name="loadType"
                                value={option.name}
                                checked={data.loadType.includes(option.name)}
                                onChange={onChange}
                            />
                            {option.name}
                        </label>
                    ))}
                </div>
                <div className={`search__choice-box ${page === "SearchAutoPage" ? "hide" : ""}`}>
                    <span>Тип выгрузки</span>
                    {unloadType.map((option) => (
                        <label key={option.id} className="serch__choice-label">
                            <input className="serch__choice-input"
                                type="checkbox"
                                name="unloadType"
                                value={option.name}
                                checked={data.unloadType.includes(option.name)}
                                onChange={onChange}
                            />
                            {option.name}
                        </label>
                    ))}
                </div>
            </div>
            <div className="search__btnBox">
                <button className='search__btnBox-button' onClick={onClickAuto}>{`${page === "SearchCargoPage" ? "Назад" : "Найти транспорт"}`}</button>
                <button className='search__btnBox-button' onClick={onClickCargo}>{` ${page === "SearchAutoPage" ? "Назад" : "Найти груз"}`}</button>
            </div>
        </div>
    )
};

export default SearchForm;