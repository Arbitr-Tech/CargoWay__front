import FormGroup from "./FormGroup";

const CargoForm = ({ data, image, onChange }) => {

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
                    name="cargoName"
                    value={data.cargoName}
                    placeholder="Укажите груз"
                    onChange={onChange}
                />
                <input className="cargoForm__input cargoForm__input--weight"
                    type="number"
                    name="weight"
                    value={data.weight}
                    placeholder="Вес (т)"
                    onChange={onChange}
                />
                <input className="cargoForm__input cargoForm__input--volume"
                    type="number"
                    name="volume"
                    value={data.volume}
                    placeholder="Объем (кв.м)"
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Когда">
                <input className="cargoForm__input"
                    type="date"
                    name="date"
                    value={data.date}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Загрузка">
                <input className="cargoForm__input"
                    type="text"
                    name="loadingLocality"
                    placeholder="Населенный пункт"
                    value={data.loadingLocality}
                    onChange={onChange}
                />
                <input className="cargoForm__input cargoForm__input--address"
                    type="text"
                    name="loadingAddress"
                    placeholder="Адрес в населенном пункте"
                    value={data.loadingAddress}
                    onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Выгрузка">
                <input className="cargoForm__input"
                    type="text"
                    name="unloadingLocality"
                    placeholder="Населенный пункт"
                    value={data.unloadingLocality}
                    onChange={onChange}
                />
                <input className="cargoForm__input cargoForm__input--address"
                    type="text"
                    name="unloadingAddress"
                    placeholder="Адрес в населенном пункте"
                    value={data.unloadingAddress}
                    onChange={onChange}
                />
            </FormGroup>
            <div className="cargoForm__section">
                <label className="cargoForm__label">
                    <span className="cargoForm__label-text">Кузов</span>
                    <div className="cargoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="cargoForm__checkbox-label">
                                <input className="cargoForm__checkbox"
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
                <label className="cargoForm__label">
                    <span className="cargoForm__label-text">Загрузка</span>
                    <div className="cargoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="cargoForm__checkbox-label">
                                <input className="cargoForm__checkbox"
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
                <label className="cargoForm__label">
                    <span className="cargoForm__label-text">Выгрузка</span>
                    <div className="cargoForm__input-group">
                        {bodyType.map((option) => (
                            <label key={option.id} className="cargoForm__checkbox-label">
                                <input className="cargoForm__checkbox"
                                    type="checkbox"
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
                    name="noncashVAT"
                    placeholder="С НДС, безнал"
                    value={data.noncashVAT}
                    onChange={onChange}
                />
                <input className="cargoForm__input"
                    type="number"
                    name="noncash"
                    placeholder="Без НДС, безнал"
                    value={data.noncash}
                    onChange={onChange}
                />
                <input className="cargoForm__input"
                    type="number"
                    name="cash"
                    placeholder="Наличными"
                    value={data.cash}
                    onChange={onChange}
                />
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