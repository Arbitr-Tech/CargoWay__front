export const IndividualForm = ({ data, onChange }) => (
    <div className="step__form">
        <label className="step__form-label">
            <span>Дата выдачи паспорта</span>
            <input className="step__form-input"
                type="date"
                name="dateGet"
                value={data.dateGet || ""}
                onChange={(e) => onChange({ ...data, dateGet: e.target.value })}
            />
        </ label>
        <input className="step__form-input"
            type="text"
            name="fullName"
            value={data.fullName || ""}
            placeholder="ФИО"
            onChange={(e) => onChange({ ...data, fullName: e.target.value })}
        />
        <input className="step__form-input"
            type="text"
            name="passportSeriesNumber"
            value={data.passportSeriesNumber || ""}
            placeholder="Номер и серия паспорта"
            onChange={(e) => onChange({ ...data, passportSeriesNumber: e.target.value })}
        />
        <input className="step__form-input"
            type="text"
            name="passportIssuedBy"
            value={data.passportIssuedBy || ""}
            placeholder="Кем выдан паспорт"
            onChange={(e) => onChange({ ...data, passportIssuedBy: e.target.value })}
        />
        <input className="step__form-input"
            type="text"
            name="placeOfBirth"
            value={data.placeOfBirth || ""}
            placeholder="Место рождения"
            onChange={(e) => onChange({ ...data, placeOfBirth: e.target.value })}
        />
    </div>
);
