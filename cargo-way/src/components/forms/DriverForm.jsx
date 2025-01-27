import FormGroup from "./FormGroup";

const DriverForm = () => {
    return (
        <div className="driverForm">
            <FormGroup label="Полное имя">
                <input className="driverForm__input"
                    type="text"
                    // name="name"
                    // value={data.name}
                    placeholder="Фамилия"
                // onChange={onChange}
                />
                <input className="driverForm__input"
                    type="text"
                    // name="name"
                    // value={data.name}
                    placeholder="Имя"
                // onChange={onChange}
                />
                <input className="driverForm__input"
                    type="text"
                    // name="name"
                    // value={data.name}
                    placeholder="Отчество"
                // onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Дата рождения">
                <input className="driverForm__input"
                    type="date"
                    // name="name"
                    // value={data.name}
                // onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Серия и номер паспорта">
                <input className="driverForm__input"
                    type="number"
                    // name="name"
                    // value={data.name}
                // onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Кем выдан">
                <input className="driverForm__input"
                    type="text"
                    // name="name"
                    // value={data.name}
                // onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Дата выдачи">
                <input className="driverForm__input"
                    type="date"
                    // name="name"
                    // value={data.name}
                // onChange={onChange}
                />
            </FormGroup>
            <FormGroup label="Код подразделения">
                <input className="driverForm__input"
                    type="number"
                    // name="name"
                    // value={data.name}
                // onChange={onChange}
                />
            </FormGroup>
        </div>
    )
}

export default DriverForm;