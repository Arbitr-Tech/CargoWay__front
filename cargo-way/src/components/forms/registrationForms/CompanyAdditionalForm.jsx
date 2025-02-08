export const CompanyAdditionalForm = ({ data, onChange }) => (
    <div className="step__form">
        <input
            className="step__form-input"
            type="text"
            name="name"
            placeholder="Название компании"
            value={data.name || ""}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
        />
        <label className="step__form-label">
            <span>Дата регистрации компании:</span>
            <input
                className="step__form-input"
                type="date"
                name="registrationDate"
                value={data.registrationDate || ""}
                onChange={(e) => onChange({ ...data, registrationDate: e.target.value })}
            />
        </label>
        <label className="step__form-label">
            <span>Дата регистрации в системе:</span>
            <input
                className="step__form-input"
                type="date"
                name="dateRegInSystem"
                value={data.dateRegInSystem || ""}
                onChange={(e) => onChange({ ...data, dateRegInSystem: e.target.value })}
            />
        </label>
    </div>
);
