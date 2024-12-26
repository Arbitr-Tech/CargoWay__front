import { useState } from "react";

const SearchForm = ({ data, onChange, onClickAuto, onClickCargo, page }) => {

    const bodyType = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
    ];
    const nameОfСargo = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
    ];
    const loadingType = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
    ];

    return (
        <div className="search">
            <div className="search__form">
                <label className="search__form-label">
                    Откуда
                    <input className="search__form-input"
                        type="text"
                        name="sending"
                        value={data.sending}
                        placeholder="Введите город, регион или страну"
                        onChange={onChange}
                    />
                </label>
                <label className="search__form-label">
                    Куда
                    <input className="search__form-input"
                        type="text"
                        name="reception"
                        value={data.reception}
                        placeholder="Введите город, регион или страну"
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
                <label className="search__form-label">
                    Дата погрузки
                    <input className="search__form-input"
                        type="date"
                        name="loadingDate"
                        value={data.loadingDate}
                        onChange={onChange}
                    />
                </label>
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

                <div className={`search__choice-box ${page === "SearchAutoPage" ? "hide" : ""}`}>
                    <span>Наименование груза</span>
                    {nameОfСargo.map((option) => (
                        <label key={option.id} className="serch__choice-label">
                            <input className="serch__choice-input"
                                type="checkbox"
                                name="nameОfСargo"
                                value={option.name}
                                checked={data.nameОfСargo.includes(option.name)}
                                onChange={onChange}
                            />
                            {option.name}
                        </label>
                    ))}
                </div>
                <div className="search__choice-box">
                    <span>Тип загрузки</span>
                    {loadingType.map((option) => (
                        <label key={option.id} className="serch__choice-label">
                            <input className="serch__choice-input"
                                type="checkbox"
                                name="loadingType"
                                value={option.name}
                                checked={data.loadingType.includes(option.name)}
                                onChange={onChange}
                            />
                            {option.name}
                        </label>
                    ))}
                </div>
            </div>
            <div className="search__btnBox">
                <button className='search__btnBox-button' onClick={onClickAuto}>{`${page === "SearchCargoPage" ? "Назад" : "Найти машину"}`}</button>
                <button className='search__btnBox-button' onClick={onClickCargo}>{` ${page === "SearchAutoPage" ? "Назад" : "Найти груз"}`}</button>
            </div>
        </div>
    )
};

export default SearchForm;