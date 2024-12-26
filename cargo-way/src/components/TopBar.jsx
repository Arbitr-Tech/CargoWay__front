import { Link } from "react-router-dom";

const TopBar = () => {
    return (
        <div className="center topbar">
            <ul className="topbar__list">
                <li className="topbar__list-item">
                    <Link to={'/cargo/list'}>Ваши грузы</Link>
                </li>
                <li className="topbar__list-item">
                    <Link to={'/cargo/add'}>Добавить грузы</Link>
                </li>
                {/* <li className="topbar__list-item">
                    <Link to={'#'}>Найти грузы</Link>
                </li> */}
                <li className="topbar__list-item">
                    <Link to={'/auto/list'}>Ваши машины</Link>
                </li>
                <li className="topbar__list-item">
                    <Link to={'/auto/add'}>Добавить машины</Link>
                </li>
                <li className="topbar__list-item">
                    <Link to={'/'}>Найти машины / грузы</Link>
                </li>
            </ul>
            <div className="topbar__buttonBox">
                <Link className="topbar__buttonBox-btn" to='/auth'>Войти</Link>
                <Link className="topbar__buttonBox-btn" to='/reg'>Зарегистрироваться</Link>
            </div>
        </div>
    )
};

export default TopBar;