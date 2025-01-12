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
            {/* <div className="topbar__buttonBox">
                <Link className="topbar__buttonBox-btn" to='/auth'>Войти</Link>
                <Link className="topbar__buttonBox-btn" to='/reg'>Зарегистрироваться</Link>
            </div> */}
            <div className="topbar__profile">
                <svg width="50" height="50" viewBox="0 0 90 90" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <rect width="90" height="90" fill="url(#pattern0_136_2)" />
                    <defs>
                        <pattern id="pattern0_136_2" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_136_2" transform="scale(0.0111111)" />
                        </pattern>
                        <image id="image0_136_2" width="90" height="90" xlinkHref="data:image/png;base64,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" />
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