export const IndividualAdditionalForm = ({ data, onChange, image }) => (
    <div className="step__form">
        <input className="step__form-input"
            type="text"
            name="driverLicenseNumber"
            placeholder="Номер водительских прав (если есть)"
            value={data.driverLicenseNumber || ""}
            onChange={(e) => onChange({ ...data, driverLicenseNumber: e.target.value })}
        />
        <input className="step__form-input"
            type="text"
            name="driverLicenseCategory"
            placeholder="Категория водительских прав (если есть)"
            value={data.driverLicenseCategory || ""}
            onChange={(e) => onChange({ ...data, driverLicenseCategory: e.target.value })}
        />
        <input className="step__form-input"
            type="tel"
            name="phoneNumber"
            placeholder="Номер телефона"
            value={data.phoneNumber || ""}
            onChange={(e) => onChange({ ...data, phoneNumber: e.target.value })}
        />
        {image && <img src={image} alt="Preview" />}
        <input className="step__form-input"
            type="file"
            name="identityDocuments"
            onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        onChange({ ...data, identityDocuments: reader.result });
                        console.log("reader.result");
                    };
                    reader.readAsDataURL(file);
                }
            }}
        />
    </div>
);
