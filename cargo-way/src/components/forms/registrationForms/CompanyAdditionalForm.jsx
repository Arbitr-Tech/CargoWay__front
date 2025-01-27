export const CompanyAdditionalForm = ({ data, onChange }) => (
    <div className="step__form">
        <input
            className="step__form-input"
            type="text"
            name="companyName"
            placeholder="Название компании"
            value={data.companyName || ""}
            onChange={(e) => onChange({ ...data, companyName: e.target.value })}
        />
        <label className="step__form-label">
            <span>Дата регистрации компании:</span>
            <input
                className="step__form-input"
                type="date"
                name="dateRegCompany"
                value={data.dateRegCompany || ""}
                onChange={(e) => onChange({ ...data, dateRegCompany: e.target.value })}
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
