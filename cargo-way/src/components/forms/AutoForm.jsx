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
            <FormGroup label="Грузоподъемность (т)">
                <input className="autoForm__input autoForm__input--weight"
                    type="number"
                    name="weight"
                    value={data.weight}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Объем кузова (кв.м)">
                <input className="autoForm__input autoForm__input--volume"
                    type="number"
                    name="volume"
                    value={data.volume}
                    onChange={onChange}
                />
            </FormGroup>
            <div className="autoForm__section">
                <label className="autoForm__label">
                    <span className="autoForm__label-text">Тип кузова</span>
                    <div className="autoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="autoForm__checkbox-label">
                                <input className="autoForm__checkbox"
                                    type="checkbox"
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
                            <label key={option.id} className="autoForm__checkbox-label">
                                <input className="autoForm__checkbox"
                                    type="checkbox"
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
                    name="loadingLocality"
                    placeholder="Населенный пункт"
                    value={data.loadingLocality}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Возможная выгрузка">
                <input className="autoForm__input"
                    type="text"
                    name="unloadingLocality"
                    placeholder="Населенный пункт"
                    value={data.unloadingLocality}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Ставка (рубли)">
                <input className="autoForm__input"
                    type="number"
                    name="noncashVAT"
                    placeholder="С НДС, безнал"
                    value={data.noncashVAT}
                    onChange={onChange}
                />
                <input className="autoForm__input"
                    type="number"
                    name="noncash"
                    placeholder="Без НДС, безнал"
                    value={data.noncash}
                    onChange={onChange}
                />
                <input className="autoForm__input"
                    type="number"
                    name="cash"
                    placeholder="Наличными"
                    value={data.cash}
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