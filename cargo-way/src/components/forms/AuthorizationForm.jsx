import { Link } from "react-router-dom";

const AuthorizationForm = ({ formData, onChange, onNext }) => {
    return (
        <div className='form'>
            <h1 className='form__title'>Авторизация</h1>
            <div className='form__simple'>
                <input className='form__simple-input'
                    type="email"
                    name="email"
                    placeholder="Почта"
                    value={formData.email}
                    onChange={onChange}
                />
                <input className='form__simple-input'
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    value={formData.password}
                    onChange={onChange}
                />
            </div>
            <button className='button form__button' onClick={onNext}>Войти</button>
            <p className="form__transition">Еще не зарегистрированы? <Link to='/reg'>Зарегистрироваться</Link></p>
        </div>
    )
};

export default AuthorizationForm;