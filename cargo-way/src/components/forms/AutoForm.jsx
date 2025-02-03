import FormGroup from "./FormGroup";

const AutoForm = ({ data, image, onChange, autoTrailer, dropDown, onNestedChange, onTwiceNesctedChange, onClickButtonTrailer, onClickDriver, onClickMenu }) => {

    const bodyType = [
        { id: 1, name: "Option 1" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
        { id: 2, name: "Option 2" },
        { id: 3, name: "Option 3" },
        { id: 4, name: "Option 4" },
    ];

    const listDrivers = [
        { id: 1, name: "Иванов Иван Иванович" },
        { id: 2, name: "Сергеев Сергей Сергеевич" },
        { id: 3, name: "Петров Петр Петрович" },
        { id: 4, name: "Остапенко Остап Остапов" },
    ];

    return (
        <div className="autoForm">
            <div className="autoForm__main">
                <FormGroup label="Автомобиль">
                    <input className="autoForm__input"
                        type="text"
                        name="brand"
                        value={data.brand}
                        placeholder="Марка"
                        onChange={onChange}
                    />
                    <input className="autoForm__input"
                        type="text"
                        name="model"
                        value={data.model}
                        placeholder="Модель"
                        onChange={onChange}
                    />
                    <input className="autoForm__input autoForm__input--short"
                        type="number"
                        name="year"
                        value={data.year === 0 ? null : data.year}
                        placeholder="Год выпуска"
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup label="Габариты">
                    <input className="autoForm__input autoForm__input--short"
                        type="number"
                        name="dimensions"
                        value={data.dimensions['length'] === 0 ? null : data.dimensions['length']}
                        placeholder="Длина (м)"
                        data-path="length"
                        onChange={onNestedChange}
                    />
                    <input className="autoForm__input autoForm__input--short"
                        type="number"
                        name="dimensions"
                        value={data.dimensions.width === 0 ? null : data.dimensions.width}
                        placeholder="Ширина (м)"
                        data-path="width"
                        onChange={onNestedChange}
                    />
                    <input className="autoForm__input autoForm__input--short"
                        type="number"
                        name="dimensions"
                        value={data.dimensions.height === 0 ? null : data.dimensions.height}
                        placeholder="Высота (м)"
                        data-path="height"
                        onChange={onNestedChange}
                    />
                </FormGroup>
                <FormGroup label="Грузоподъемность (т)">
                    <input className="autoForm__input autoForm__input--short"
                        type="number"
                        name="lifting_capacity"
                        value={data.lifting_capacity}
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup label="Объем кузова (куб.м)">
                    <input className="autoForm__input autoForm__input--short"
                        type="number"
                        name="volume"
                        value={data.volume}
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup label="Категория автомобиля">
                    <input className="autoForm__input"
                        type="text"
                        name="category"
                        value={data.category}
                        placeholder="Например: Камаз"
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup label="Номер автомобиля">
                    <input className="autoForm__input"
                        type="text"
                        name="transport_number"
                        value={data.transport_number}
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup label="Водитель">
                    <div className="autoForm__inputBox">
                        <div className="autoForm__inputBox-input">
                            <input
                                type="text"
                                disabled="disabled"
                                name="driver"
                                value={listDrivers.find(item => item.id === data.driver)?.name || ''}
                            />
                        </div>
                        <div className="autoForm__inputBox-menu">
                            {dropDown ?
                                <img
                                    src="/assets/img/arrow_top.svg"
                                    alt="arrow top"
                                    className="autoForm__input-icon"
                                    onClick={onClickMenu}

                                /> :
                                <img
                                    src="/assets/img/arrow.svg"
                                    alt="arrow down"
                                    className="autoForm__input-icon"
                                    onClick={onClickMenu}
                                />
                            }
                            <ul className={`autoForm__inputBox-ul ${dropDown ? 'show' : ''}`}>
                                {listDrivers.map((option) => (
                                    <li
                                        key={option.id}
                                        className="autoForm__inputBox-li"
                                        onClick={onClickDriver}
                                        data-id={option.id}
                                        data-name={option.name}
                                    >
                                        {option.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                </FormGroup>
                <div className="autoForm__section">
                    <label className="autoForm__label">
                        <span className="autoForm__label-text">Тип кузова</span>
                        <div className="autoForm__input-group">
                            {bodyType.map((option) => (
                                <label key={option.id} className="radiobox-label">
                                    <input className="radiobox"
                                        type="radio"
                                        name="bodyType"
                                        value={option.name}
                                        onChange={onChange}
                                    />
                                    {option.name}
                                </label>
                            ))}
                        </div>
                    </label>
                    <label className="autoForm__label">
                        <span className="autoForm__label-text">Тип загрузки</span>
                        <div className="autoForm__input-group">
                            {bodyType.map((option) => (
                                <label key={option.id} className="autoForm__radiobox-label">
                                    <input className="autoForm__radiobox"
                                        type="radio"
                                        name="loadingType"
                                        value={option.name}
                                        onChange={onChange}
                                    />
                                    {option.name}
                                </label>
                            ))}
                        </div>
                    </label>
                </div>
                <FormGroup label="Когда готов">
                    <input className="autoForm__input"
                        type="date"
                        name="date"
                        value={data.date}
                        onChange={onChange}
                    />
                </FormGroup>
                <FormGroup label="Откуда">
                    <input className="autoForm__input"
                        type="text"
                        name="route"
                        placeholder="Населенный пункт"
                        value={data.route.from}
                        data-path="from"
                        onChange={onNestedChange}
                    />
                </FormGroup>
                <FormGroup label="Возможная выгрузка">
                    <input className="autoForm__input"
                        type="text"
                        name="route"
                        placeholder="Населенный пункт"
                        value={data.route.to}
                        data-path="to"
                        onChange={onNestedChange}
                    />
                </FormGroup>
                <FormGroup label="Ставка (рубли)">
                    <input className="cargoForm__input"
                        type="number"
                        name="price"
                        placeholder="Укажите ставку"
                        value={data.price === 0 ? null : data.price}
                        onChange={onChange}
                    />
                    <div className='cargoForm__radio'>
                        <label className='cargoForm__radio-label'>
                            <input className='cargoForm__radio-input'
                                type="radio"
                                name="typePrice"
                                value="Без НДС, безнал"
                                onChange={onChange}
                            />
                            Без НДС, безнал
                        </label>
                        <label className='cargoForm__radio-label'>
                            <input className='cargoForm__radio-input'
                                type="radio"
                                name="typePrice"
                                value="С НДС, безнал"
                                onChange={onChange}
                            />
                            С НДС, безнал
                        </label>
                        <label className='cargoForm__radio-label'>
                            <input className='cargoForm__radio-input'
                                type="radio"
                                name="typePrice"
                                value="Наличными"
                                onChange={onChange}
                            />
                            Наличными
                        </label>
                    </div>
                </FormGroup>
                <FormGroup label="Фото машины" image={image}>
                    {image && <img className="autoForm__photo" src={image} alt="Preview" />}
                    <input className="autoForm__input--img"
                        type="file"
                        name="autoPhoto"
                        onChange={onChange}
                    />
                </FormGroup>
                <div className="autoForm__btnBox">
                    <button className="autoForm__btnBox-button" onClick={onClickButtonTrailer}>{autoTrailer ? 'Отменить' : 'Добавить прицеп'}</button>
                </div>
            </div>
            {autoTrailer ? <div className="autoForm__trailer">
                <h3 className="autoForm__trailer-label">Прицеп</h3>
                <FormGroup label="Габариты">
                    <input className="autoForm__input autoForm__input--short"
                        type="number"
                        name="trailer_details"
                        value={data.trailer_details.dimensions['length'] === 0 ? null : data.trailer_details.dimensions['length']}
                        placeholder="Длина (м)"
                        data-path="dimensions"
                        data-pathtwo="length"
                        onChange={onTwiceNesctedChange}
                    />
                    <input className="autoForm__input autoForm__input--short"
                        type="number"
                        name="trailer_details"
                        value={data.trailer_details.dimensions.width === 0 ? null : data.trailer_details.dimensions.width}
                        placeholder="Ширина (м)"
                        data-path="dimensions"
                        data-pathtwo="width"
                        onChange={onTwiceNesctedChange}
                    />
                    <input className="autoForm__input autoForm__input--short"
                        type="number"
                        name="trailer_details"
                        value={data.trailer_details.dimensions.height === 0 ? null : data.trailer_details.dimensions.height}
                        placeholder="Высота (м)"
                        data-path="dimensions"
                        data-pathtwo="height"
                        onChange={onTwiceNesctedChange}
                    />
                </FormGroup>
                <FormGroup label="Объем прицепа (куб.м)">
                    <input className="autoForm__input autoForm__input--short"
                        type="number"
                        name="trailer_details"
                        value={data.trailer_details.volume}
                        data-path="volume"
                        onChange={onNestedChange}
                    />
                </FormGroup>
                <FormGroup label="Номер прицепа">
                    <input className="autoForm__input autoForm__input--short"
                        type="number"
                        name="trailer_details"
                        value={data.trailer_details.trailer_number}
                        data-path="trailer_number"
                        onChange={onNestedChange}
                    />
                </FormGroup>
            </div> : ''}
        </div>
    )
};

export default AutoForm;