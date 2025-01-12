import Popup from "../Popup";
import SearchForm from "../search/SearchForm";
import SearchListResults from "../search/SearchListResults";
import TopBar from "../TopBar";
import { useState } from "react";
import { observer } from "mobx-react";
import { mainSearchStore } from "../../stores/MainSearchStore";

const MainSearchPage =  observer(() => {

    const store = mainSearchStore;
    console.log(store.page)

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        store.setFormData(name, value, type, checked);
    };

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
    const list2 = [
        { id: 1, direction: 'RUS-KUZ', transport: 'тентованный, полупр.с полн.раст.', weight: 20, volume: 83, from: 'Россия', to: 'Казахстан', price: '1 руб карта без НДС' },
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

    const handleContactsClick = (item) => {
        console.log(item.id)
        store.openPopup(item);
        console.log(store.popupContent)
    }

    const getPageContent = () => {
        switch (store.page) {
            case 'MainSearchPage':
                return (
                    <>
                        <h2 className="searchPage__desc">Последние записи</h2>
                        <div className="searchPage__box">
                            <SearchListResults list={list} typeButton='main' onClickOne={handleContactsClick} />
                            <SearchListResults list={list2} typeButton='main' onClickOne={handleContactsClick} />
                        </div>
                    </>
                )
            case 'SearchAutoPage':
                return (
                    <div className="searchPage__box">
                        <SearchListResults list={list} typeButton='main' onClickOne={handleContactsClick} />
                    </div>
                )
            case 'SearchCargoPage':
                return (
                    <div className="searchPage__box">
                        <SearchListResults list={list2} typeButton='main' onClickOne={handleContactsClick} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="searchPage">
            <div className={`overlay ${store.isPopupOpen ? 'overlay--show' : ''} `}></div>
            <div className="container">
                <Popup isOpen={store.isPopupOpen} text={store.popupContent} typePopup='contacts' onClose={store.closePopup} />
                <TopBar />
                <SearchForm
                    data={store.formData}
                    onChange={handleInputChange}
                    onClickAuto={() => store.page === 'MainSearchPage' ? store.setPage('SearchAutoPage') : store.page === 'SearchCargoPage' ? store.setPage('MainSearchPage') : console.log(store.formData)}
                    onClickCargo={() => store.page === 'MainSearchPage' ? store.setPage('SearchCargoPage') : store.page === 'SearchAutoPage' ? store.setPage('MainSearchPage') : console.log(store.formData)}
                    page={store.page}
                />
                {getPageContent()}
            </div>

        </div >
    )
});

export default MainSearchPage;