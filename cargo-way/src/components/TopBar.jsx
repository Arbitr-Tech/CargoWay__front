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
                {/* <li className="topbar__list-item">
                    <Link to={'/auto/list'}>Ваши машины</Link>
                </li>
                <li className="topbar__list-item">
                    <Link to={'/auto/add'}>Добавить машины</Link>
                </li>
                <li className="topbar__list-item">
                    <Link to={'/driver/list'}>Ваши водители</Link> */}
                {/* </li> */}
                <li className="topbar__list-item">
                    <Link to={'/driver/add'}>Добавить водителя</Link>
                </li>
                <li className="topbar__list-item">
                    <Link to={'/'}>Найти машины / грузы</Link>
                </li>
            </ul>
            {/* <div className="topbar__buttonBox">
                <Link className="topbar__buttonBox-btn" to='/auth'>Войти</Link>
                <Link className="topbar__buttonBox-btn" to='/reg'>Зарегистрироваться</Link>
            </div> */}
            <div className="topbar__profile">
                <svg width="50" height="50" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <rect width="90" height="90" fill="url(#pattern0_150_7)" />
                    <defs>
                        <pattern id="pattern0_150_7" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_150_7" transform="scale(0.0111111)" />
                        </pattern>
                        <image id="image0_150_7" width="90" height="90" xlinkHref="data:image/png;base64,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" />
                    </defs>
                </svg>
                <div className="topbar__profile-text">
                    <p className="topbar__profile-text">Профиль</p>
                    <p className="topbar__profile-text">Выйти</p>
                </div>
            </div>
        </div>
    )
};

export default TopBar;