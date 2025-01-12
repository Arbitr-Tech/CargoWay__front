import SearchListResults from "../search/SearchListResults";
import TopBar from "../TopBar";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup";
import { observer } from "mobx-react";
import { listStore } from "../../stores/ListStore";
import { postStore } from "../../stores/PostStore";

const AutoListPage = observer(() => {
    const store = listStore;
    const autoStore = postStore;
    const navigate = useNavigate();

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

    const handleEditClick = (item) => {
        list.forEach(car => {
            Object.keys(car).forEach(keys => {
                autoStore.setEditData(keys, car[keys]);
                // console.log(keys, car[keys])
            })
        })
        navigate('/auto/edit');
        console.log(item);
    }


    return (
        <div className="autoList">
            <div className={`overlay ${store.isPopupOpen ? 'overlay--show' : ''} `}></div>
            <div className="container">
                <Popup isOpen={store.isPopupOpen} text='Вы действительно хоите удалить эту запись?' typePopup='del' onClose={store.closePopup} />
                <TopBar />
                <h2 className="autoList__title">Ваши машины</h2>
                <SearchListResults list={list} typeButton='mylist' onClickOne={handleEditClick} onClickTwo={store.openPopup} />
            </div>
        </div>
    )
});

export default AutoListPage; 