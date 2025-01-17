import Popup from "../Popup";
import SearchForm from "../search/SearchForm";
import SearchListResults from "../search/SearchListResults";
import TopBar from "../TopBar";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { mainSearchStore } from "../../stores/MainSearchStore";

const MainSearchPage =  observer(() => {

    const store = mainSearchStore;
    console.log(store.page)

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        store.setFormData(name, value, type, checked);
    };

    const list = [
        { id: 1, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePrice: "Наличными", price: 12000, ready: "2025-01-18", bodyType: "тент", loadingType: "задняя", unloadingType: "ручная", cargoPhoto: "photo_url_here" },
        { id: 2, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePrice: "Наличными", price: 12000, ready: "2025-01-18", bodyType: "тент", loadingType: "задняя", unloadingType: "ручная", cargoPhoto: "photo_url_here" },
        { id: 3, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePrice: "Наличными", price: 12000, ready: "2025-01-18", bodyType: "тент", loadingType: "задняя", unloadingType: "ручная", cargoPhoto: "photo_url_here" },
        { id: 4, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePrice: "Наличными", price: 12000, ready: "2025-01-18", bodyType: "тент", loadingType: "задняя", unloadingType: "ручная", cargoPhoto: "photo_url_here" },
        { id: 5, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePrice: "Наличными", price: 12000, ready: "2025-01-18", bodyType: "тент", loadingType: "задняя", unloadingType: "ручная", cargoPhoto: "photo_url_here" },
        { id: 6, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePrice: "Наличными", price: 12000, ready: "2025-01-18", bodyType: "тент", loadingType: "задняя", unloadingType: "ручная", cargoPhoto: "photo_url_here" },
        { id: 7, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePrice: "Наличными", price: 12000, ready: "2025-01-18", bodyType: "тент", loadingType: "задняя", unloadingType: "ручная", cargoPhoto: "photo_url_here" },
        { id: 8, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePrice: "Наличными", price: 12000, ready: "2025-01-18", bodyType: "тент", loadingType: "задняя", unloadingType: "ручная", cargoPhoto: "photo_url_here" },
        { id: 9, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePrice: "Наличными", price: 12000, ready: "2025-01-18", bodyType: "тент", loadingType: "задняя", unloadingType: "ручная", cargoPhoto: "photo_url_here" },
    ]
    const list2 = [
        { id: 1,  brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transport_number: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailer_number: 54321 }, lifting_capacity: 25000, bodyType: "тентованный", loadingType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here" },
        { id: 2,  brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transport_number: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailer_number: 54321 }, lifting_capacity: 25000, bodyType: "тентованный", loadingType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here" },
        { id: 3,  brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transport_number: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailer_number: 54321 }, lifting_capacity: 25000, bodyType: "тентованный", loadingType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here" },
        { id: 4,  brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transport_number: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailer_number: 54321 }, lifting_capacity: 25000, bodyType: "тентованный", loadingType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here" },
        { id: 5,  brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transport_number: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailer_number: 54321 }, lifting_capacity: 25000, bodyType: "тентованный", loadingType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here" },
        { id: 6,  brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transport_number: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailer_number: 54321 }, lifting_capacity: 25000, bodyType: "тентованный", loadingType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here" },
        { id: 7,  brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transport_number: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailer_number: 54321 }, lifting_capacity: 25000, bodyType: "тентованный", loadingType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here" },
        { id: 8,  brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transport_number: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailer_number: 54321 }, lifting_capacity: 25000, bodyType: "тентованный", loadingType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here" },
        { id: 9,  brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transport_number: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailer_number: 54321 }, lifting_capacity: 25000, bodyType: "тентованный", loadingType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here" },
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