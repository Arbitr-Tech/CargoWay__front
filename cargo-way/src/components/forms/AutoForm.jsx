import FormGroup from "./FormGroup";

const AutoForm = ({ data, image, onChange }) => {

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
        <div className="autoForm">
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
            <FormGroup label="Размеры">
                <input className="autoForm__input autoForm__input--short"
                    type="number"
                    name="length"
                    value={data.dimensions['length'] === 0 ? null : data.dimensions['length']}
                    placeholder="Длина (м)"
                    onChange={onChange}
                />
                <input className="autoForm__input autoForm__input--short"
                    type="number"
                    name="width"
                    value={data.dimensions.width === 0 ? null : data.dimensions.width}
                    placeholder="Ширина (м)"
                    onChange={onChange}
                />
                <input className="autoForm__input autoForm__input--short"
                    type="number"
                    name="height"
                    value={data.dimensions.height === 0 ? null : data.dimensions.height}
                    placeholder="Высота (м)"
                    onChange={onChange}
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
            <FormGroup label="Объем кузова (кв.м)">
                <input className="autoForm__input autoForm__input--short"
                    type="number"
                    name="volume"
                    value={data.volume}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Тип груза">
                <input className="autoForm__input"
                    type="text"
                    name="cargo_type"
                    value={data.cargo_type}
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
                                    // checked={data.bodyType.includes(option.name)}
                                    onChange={onChange}
                                />
                                {option.name}
                            </label>
                        ))}
                    </div>
                </label>
                <label className="autoForm__label">
                    <span className="autoForm__label-text">Загрузка</span>
                    <div className="autoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="autoForm__radiobox-label">
                                <input className="autoForm__radiobox"
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
            </div>
            <FormGroup label="Прицеп">
                <input className="autoForm__input autoForm__input--short"
                    type="number"
                    name="length"
                    value={data.trailer_details.dimensions['length'] === 0 ? null : data.trailer_details.dimensions['length']}
                    placeholder="Длина (м)"
                    onChange={onChange}
                />
                <input className="autoForm__input autoForm__input--short"
                    type="number"
                    name="width"
                    value={data.trailer_details.dimensions.width === 0 ? null : data.trailer_details.dimensions.width}
                    placeholder="Ширина (м)"
                    onChange={onChange}
                />
                <input className="autoForm__input autoForm__input--short"
                    type="number"
                    name="height"
                    value={data.trailer_details.dimensions.height === 0 ? null : data.trailer_details.dimensions.height}
                    placeholder="Высота (м)"
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Тип груза прицепа">
                <input className="autoForm__input"
                    type="text"
                    name="cargo_type"
                    value={data.trailer_details.cargo_type}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Объем прицепа (кв.м)">
                <input className="autoForm__input autoForm__input--short"
                    type="number"
                    name="volume"
                    value={data.trailer_details.volume}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Номер прицепа">
                <input className="autoForm__input autoForm__input--short"
                    type="number"
                    name="trailer_number"
                    value={data.trailer_details.trailer_number}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Когда">
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
                    name="from"
                    placeholder="Населенный пункт"
                    value={data.route.from}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Возможная выгрузка">
                <input className="autoForm__input"
                    type="text"
                    name="to"
                    placeholder="Населенный пункт"
                    value={data.route.to}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Фото машины" image={image}>
                {image && <img className="autoForm__photo" src={image} alt="Preview" />}
                <input className="autoForm__input--img"
                    type="file"
                    name="autoPhoto"
                    // value={data.autoPhoto}
                    onChange={onChange}
                />
            </FormGroup>
        </div>
    )
};

export default AutoForm;