import FormGroup from "./FormGroup";

const CargoForm = ({ data, image, onChange, onNestedChange }) => {

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

    return (
        <div className="cargoForm">
            <FormGroup label="Груз">
                <input className="cargoForm__input"
                    type="text"
                    name="name"
                    value={data.name}
                    placeholder="Укажите груз"
                    onChange={onChange}
                />
                <input className="cargoForm__input cargoForm__input--short"
                    type="number"
                    name="weight"
                    value={data.weight}
                    placeholder="Вес (т)"
                    onChange={onChange}
                />
                <input className="cargoForm__input cargoForm__input--short"
                    type="number"
                    name="volume"
                    value={data.volume}
                    placeholder="Объем (кв.м)"
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Размеры">
                <input className="cargoForm__input"
                    type="number"
                    name="dimensions"
                    data-path = "length"
                    value={data.dimensions['length'] === 0 ? null : data.dimensions['length']}
                    placeholder="Длина (м)"
                    onChange={onNestedChange}
                />
                <input className="cargoForm__input cargoForm__input--short"
                    type="number"
                    name="dimensions"
                    data-path="width"
                    value={data.dimensions.width === 0 ? null : data.dimensions.width}
                    placeholder="Ширина (м)"
                    onChange={onNestedChange}
                />
                <input className="cargoForm__input cargoForm__input--short"
                    type="number"
                    name="dimensions"
                    data-path="height"
                    value={data.dimensions.height === 0 ? null : data.dimensions.height}
                    placeholder="Высота (м)"
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Описание груза">
                <textarea className="cargoForm__textarea"
                    type="text"
                    name="description"
                    value={data.description}
                    placeholder="Опишите груз"
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Когда">
                <input className="cargoForm__input"
                    type="date"
                    name="ready"
                    value={data.ready}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Загрузка">
                <input className="cargoForm__input cargoForm__input--long"
                    type="text"
                    name="route"
                    data-path="from"
                    placeholder="Укажите населенный пункт и адрес"
                    value={data.route.from}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <FormGroup label="Выгрузка">
                <input className="cargoForm__input cargoForm__input--long"
                    type="text"
                    name="route"
                    namdata-path="to"
                    placeholder="Укажите населенный пункт и адрес"
                    value={data.route.to}
                    onChange={onNestedChange}
                />
            </FormGroup>
            <div className="cargoForm__section">
                <label className="cargoForm__label">
                    <span className="cargoForm__label-text">Кузов</span>
                    <div className="cargoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="cargoForm__radiobox-label">
                                <input className="cargoForm__radiobox"
                                    type="radio"
                                    name="bodyType"
                                    value={option.name}
                                    // checked={data.bodyType.includes(option.name)}
                                    onChange={onChange}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                </label>
                <label className="cargoForm__label">
                    <span className="cargoForm__label-text">Загрузка</span>
                    <div className="cargoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="cargoForm__radiobox-label">
                                <input className="cargoForm__radiobox"
                                    type="radio"
                                    name="loadingType"
                                    value={option.name}
                                    // checked={data.loadingType.includes(option.name)}
                                    onChange={onChange}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                </label>
                <label className="cargoForm__label">
                    <span className="cargoForm__label-text">Выгрузка</span>
                    <div className="cargoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="cargoForm__radiobox-label">
                                <input className="cargoForm__radiobox"
                                    type="radio"
                                    name="unloadingType"
                                    value={option.name}
                                    // checked={data.unloadingType.includes(option.name)}
                                    onChange={onChange}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                </label>
            </div>
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
                            checked={data.priceType === "Без НДС, безнал"}
                            onChange={onChange}
                        />
                        Без НДС, безнал
                    </label>
                    <label className='cargoForm__radio-label'>
                        <input className='cargoForm__radio-input'
                            type="radio"
                            name="typePrice"
                            value="С НДС, безнал"
                            checked={data.priceType === "С НДС, безнал"}
                            onChange={onChange}
                        />
                        С НДС, безнал
                    </label>
                    <label className='cargoForm__radio-label'>
                        <input className='cargoForm__radio-input'
                            type="radio"
                            name="typePrice"
                            value="Наличными"
                            checked={data.priceType === "Наличными"}
                            onChange={onChange}
                        />
                        Наличными
                    </label>
                </div>
            </FormGroup>
            <FormGroup label="Фото груза" image={image}>
                {image && <img className="cargoForm__photo" src={image} alt="Preview" />}
                <input className="cargoForm__input--img"
                    type="file"
                    name="cargoPhoto"
                    // value={data.cargoPhoto}
                    onChange={onChange}
                />
            </FormGroup>
        </div>
    )
};

export default CargoForm;