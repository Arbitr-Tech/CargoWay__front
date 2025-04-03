import React from "react";

export const CompanyForm = ({ data, onChange }) => (
    <div className="step__form">
        <input className="step__form-input"
            type="number"
            name="inn"
            value={data.inn || ""}
            placeholder="ИНН"
            onChange={(e) => onChange({ ...data, inn: e.target.value })}
        />
        <input className="step__form-input"
            type="number"
            name="ogrn"
            value={data.ogrn || ""}
            placeholder="ОГРН"
            onChange={(e) => onChange({ ...data, ogrn: e.target.value })}
        />
        <input className="step__form-input"
            type="number"
            name="bic"
            value={data.bic || ""}
            placeholder="БИК"
            onChange={(e) => onChange({ ...data, bic: e.target.value })}
        />
        <input className="step__form-input"
            type="number"
            name="correspondentAccount"
            value={data.correspondentAccount || ""}
            placeholder="Корреспондентский счет"
            onChange={(e) => onChange({ ...data, correspondentAccount: e.target.value })}
        />
    </div>
);
