import React from "react";

const SearchForm = ({ data, onChange, onNestedChange, onReset, onSearch }) => {

        const bodyType = [
        { id: 1, name: 'Платформа' },
        { id: 2, name: 'Фургон' },
        { id: 3, name: 'Цистерна' },
        { id: 4, name: 'Рефрижератор' },
        { id: 5, name: 'Шторный' },
        { id: 6, name: 'Самосвал' },
        { id: 7, name: 'Контейнеровоз' },
        { id: 8, name: 'Низкорамный трал' },
        { id: 9, name: 'Танк-контейнер' },
        { id: 10, name: 'Зерновоз' },
        { id: 11, name: 'Изотермический' },
        { id: 12, name: 'Навалочные грузы' },
    ];

    const loadingType = [
        { id: 1, name: 'Загрузка спереди' },
        { id: 2, name: 'Загрузка сзади' },
        { id: 3, name: 'Загрузка сбоку' },
        { id: 4, name: 'Загрузка сверху' },
    ];

    const unloadingType = [
        { id: 1, name: 'Выгрузка спереди' },
        { id: 2, name: 'Выгрузка сзади' },
        { id: 3, name: 'Выгрузка сбоку' },
        { id: 4, name: 'Выгрузка сверху' },
    ];

    return (
        <div className="search">
            <div className="search__form">
                <div className="search__form-row">
                    <label className="search__form-label">
                        Откуда
                        <input className="search__form-input"
                            type="text"
                            name="route"
                            data-path="from"
                            value={data.route['from'] || ''}
                            placeholder="Введите город, регион или страну"
                            onChange={onNestedChange}
                        />
                    </label>
                    <label className="search__form-label">
                        Куда
                        <input className="search__form-input"
                            type="text"
                            name="route"
                            data-path="to"
                            value={data.route['to'] || ''}
                            placeholder="Введите город, регион или страну"
                            onChange={onNestedChange}
                        />
                    </label>
                    <label className="search__form-label search__form-label--fromTo">
                        <div className="search__form-title">Цена</div>
                        <div className="search__form-inputBox">
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="priceFrom"
                                value={data.priceFrom || ''}
                                placeholder="от"
                                onChange={onChange}
                            />
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="priceTo"
                                value={data.priceTo || ''}
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
                            value={data.readyDate || ''}
                            onChange={onChange}
                        />
                    </label>
                    <label className="search__form-label search__form-label--fromTo">
                        <div className="search__form-title">Вес, т</div>
                        <div className="search__form-inputBox">
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="weightFrom"
                                value={data.weightFrom || ''}
                                placeholder="от"
                                onChange={onChange}
                            />
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="weightTo"
                                value={data.weightTo || ''}
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
                                value={data.volumeFrom || ''}
                                placeholder="от"
                                onChange={onChange}
                            />
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="volumeTo"
                                value={data.volumeTo || ''}
                                placeholder="до"
                                onChange={onChange}
                            />
                        </div>
                    </label>
                </div>
                <div className="search__form-row">
                    <label className="search__form-label search__form-label--fromTo">
                        <div className="search__form-title">Длина</div>
                        <div className="search__form-inputBox">
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="dimensions"
                                data-path="lengthFrom"
                                value={data.dimensions['lengthFrom'] || ''}
                                placeholder="от"
                                onChange={onNestedChange}
                            />
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="dimensions"
                                data-path="lengthTo"
                                value={data.dimensions['lengthTo'] || ''}
                                placeholder="до"
                                onChange={onNestedChange}
                            />
                        </div>
                    </label>
                    <label className="search__form-label search__form-label--fromTo">
                        <div className="search__form-title">Ширина</div>
                        <div className="search__form-inputBox">
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="dimensions"
                                data-path="widthFrom"
                                value={data.dimensions['widthFrom'] || ''}
                                placeholder="от"
                                onChange={onNestedChange}
                            />
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="dimensions"
                                data-path="widthTo"
                                value={data.dimensions['widthTo'] || ''}
                                placeholder="до"
                                onChange={onNestedChange}
                            />
                        </div>
                    </label>
                    <label className="search__form-label search__form-label--fromTo">
                        <div className="search__form-title">Высота</div>
                        <div className="search__form-inputBox">
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="dimensions"
                                data-path="heightFrom"
                                value={data.dimensions['heightFrom'] || ''}
                                placeholder="от"
                                onChange={onNestedChange}
                            />
                            <input className="search__form-input search__form-input--fromTo"
                                type="number"
                                name="dimensions"
                                data-path="heightTo"
                                value={data.dimensions['heightTo'] || ''}
                                placeholder="до"
                                onChange={onNestedChange}
                            />
                        </div>
                    </label>
                </div>
            </div>
            <div className="search__choice">
                <div className="search__choice-box">
                    <span>Тип кузова</span>
                    {bodyType.map((option) => (
                        <label key={option.id} className="serch__choice-label">
                            <input className="serch__choice-input"
                                type="radio"
                                name="bodyType"
                                value={option.name || ''}
                                checked={data.bodyType.includes(option.name)}
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
                                type="radio"
                                name="loadType"
                                value={option.name || ''}
                                checked={data.loadType.includes(option.name)}
                                onChange={onChange}
                            />
                            {option.name}
                        </label>
                    ))}
                </div>
                <div className="search__choice-box">
                    <span>Тип выгрузки</span>
                    {unloadingType.map((option) => (
                        <label key={option.id} className="serch__choice-label">
                            <input className="serch__choice-input"
                                type="radio"
                                name="unloadType"
                                value={option.name || ''}
                                checked={data.unloadType.includes(option.name)}
                                onChange={onChange}
                            />
                            {option.name}
                        </label>
                    ))}
                </div>
            </div>
            <div className="search__btnBox">
                <button className='search__btnBox-button' onClick={onReset}>Отчистить форму</button>
                <button className='search__btnBox-button' onClick={onSearch}>Найти груз</button>
            </div>
        </div>
    )
};

export default SearchForm;