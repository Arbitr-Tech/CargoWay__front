import { useState } from "react";
import Popup from "../Popup";
import SearchListResults from "../search/SearchListResults";
import TopBar from "../TopBar";
import { useNavigate } from "react-router-dom";

const CargoListPage = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();
    // const [popupContent, setPopupContent] = useState({});

    const openPopup = () => {
        setIsPopupOpen(true);
    };
    const closePopup = () => setIsPopupOpen(false);

    const handleEditClick = (item) => {
        navigate('/cargo/edit');
        console.log(item);
    }

    const list = [
        { id: 1, direction: 'RUS-BEL', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { id: 2, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { id: 3, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { id: 4, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { id: 5, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { id: 6, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { id: 7, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { id: 8, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { id: 9, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { id: 10, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { id: 11, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { id: 12, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
        { id: 13, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
    ]


    return (
        <div className="cargoList">
            <div className={`overlay ${isPopupOpen ? 'overlay--show' : ''} `}></div>
            <div className="container">
                <Popup isOpen={isPopupOpen} text='Вы действительно хоите удалить эту запись?' typePopup='del' onClose={closePopup} />
                <TopBar />
                <h2 className="cargoList__title">Ваши грузы</h2>
                <SearchListResults list={list} typeButton='mylist' onClickOne={handleEditClick} onClickTwo={openPopup} />
            </div>
        </div>
    )
};

export default CargoListPage;