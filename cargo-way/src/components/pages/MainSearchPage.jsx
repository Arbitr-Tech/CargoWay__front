import Popup from "../Popup";
import SearchForm from "../search/SearchForm";
import SearchListResults from "../search/SearchListResults";
import TopBar from "../TopBar";
import { useState } from "react";

const MainSearchPage = () => {
    const [page, setPage] = useState('MainSearchPage');
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupContent, setPopupContent] = useState({});

    const openPopup = () => {
        setIsPopupOpen(true);
    };
    const closePopup = () => setIsPopupOpen(false);
    console.log(page)

    const [formData, setFormData] = useState({
        sending: "",
        reception: "",
        weightFrom: "",
        weightTo: "",
        volumeFrom: "",
        volumeTo: "",
        loadingDate: "",
        bodyType: [],
        nameОfСargo: [],
        loadingType: []
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            setFormData((prevState) => {
                // Копируем старый массив
                const updatedBodyType = checked
                    ? [...prevState[name], value] // Добавляем значение, если чекбокс выбран
                    : prevState[name].filter((item) => item !== value); // Удаляем значение, если чекбокс снят

                return {
                    ...prevState,
                    [name]: updatedBodyType, // Обновляем состояние
                };
            });
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value, // Обновляем остальные поля
            }));
        }
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
        setPopupContent(list[item.id-1]);
        console.log(popupContent)
        openPopup()
        // console.log(popupContent);
    }

    const getPageContent = () => {
        switch (page) {
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
            <div className={`overlay ${isPopupOpen ? 'overlay--show' : ''} `}></div>
            <div className="container">
                <Popup isOpen={isPopupOpen} text={popupContent} typePopup='contacts' onClose={closePopup} />
                <TopBar />
                <SearchForm
                    data={formData}
                    onChange={handleInputChange}
                    onClickAuto={() => page === 'MainSearchPage' ? setPage('SearchAutoPage') : page === 'SearchCargoPage' ? setPage('MainSearchPage') : console.log(formData)}
                    onClickCargo={() => page === 'MainSearchPage' ? setPage('SearchCargoPage') : page === 'SearchAutoPage' ? setPage('MainSearchPage') : console.log(formData)}
                    page={page}
                />
                {getPageContent()}
            </div>

        </div >
    )
};

export default MainSearchPage;