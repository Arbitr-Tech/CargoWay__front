import { useState } from "react";
import SearchListResults from "../search/SearchListResults";
import TopBar from "../TopBar";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup";

const AutoListPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    const openPopup = () => {
        setIsPopupOpen(true);
    };
    const closePopup = () => setIsPopupOpen(false);

    const handleEditClick = (item) => {
        navigate('/auto/edit');
        console.log(item);
    }

    const list = [
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
    ]


    return (
        <div className="autoList">
            <div className={`overlay ${isPopupOpen ? 'overlay--show' : ''} `}></div>
            <div className="container">
                <Popup isOpen={isPopupOpen} text='Вы действительно хоите удалить эту запись?' typePopup='del' onClose={closePopup} />
                <TopBar />
                <h2 className="autoList__title">Ваши машины</h2>
                <SearchListResults list={list} typeButton='mylist' onClickOne={handleEditClick} onClickTwo={openPopup}/>
            </div>
        </div>
    )
};

export default AutoListPage; 