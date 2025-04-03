import React from "react";
import { useMask } from '@react-input/mask';
export const IndividualForm = ({ data, onChange }) => {
    const inputDepartmentCodeMask = useMask({
        mask: '___-___',
        replacement: {_: /\d/},
    })


    return(
    <div className="step__form">
        <input className="step__form-input"
            type="text"
            name="fullname"
            value={data.fullname || ""}
            placeholder="ФИО"
            onChange={(e) => onChange({ ...data, fullname: e.target.value })}
        />
        <input className="step__form-input"
            type="number"
            name="passportNum"
            value={data.passportNum || ""}
            placeholder="Номер паспорта"
            onChange={(e) => onChange({ ...data, passportNum: e.target.value })}
        />
        <input className="step__form-input"
            type="number"
            name="passportSeries"
            value={data.passportSeries || ""}
            placeholder="Серия паспорта"
            onChange={(e) => onChange({ ...data, passportSeries: e.target.value })}
        />
        <input className="step__form-input"
            type="text"
            name="whoGive"
            value={data.whoGive || ""}
            placeholder="Кем выдан паспорт"
            onChange={(e) => onChange({ ...data, whoGive: e.target.value })}
        />
        <input className="step__form-input"
            type="text"
            name="departmentCode"
            value={data.departmentCode || ""}
            placeholder="Код подразделения"
            ref={inputDepartmentCodeMask}
            onChange={(e) => onChange({ ...data, departmentCode: e.target.value })}
        />
    </div>
)};
