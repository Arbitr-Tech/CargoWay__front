const FormGroup = ({ label, children, image }) => (
    <label className="formGroup">
        <span className="formGroup__label">{label}</span>
        <div className={`formGroup__group ${image ? 'formGroup__group--img' : ''}`}>
            {children}
        </div>
    </label>

);

export default FormGroup;