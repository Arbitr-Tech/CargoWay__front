import { useState } from "react";
import Popup from "../Popup";
import SearchListResults from "../search/SearchListResults";
import TopBar from "../TopBar";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { listStore } from "../../stores/ListStore";


const CargoListPage = observer(() => {
    const store = listStore;
    const navigate = useNavigate();

    const handleEditClick = (item) => {
        navigate('/cargo/edit');
        console.log(item);
    }

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


    return (
        <div className="cargoList">
            <div className={`overlay ${store.isPopupOpen ? 'overlay--show' : ''} `}></div>
            <div className="container">
                <Popup isOpen={store.isPopupOpen} text='Вы действительно хоите удалить эту запись?' typePopup='del' onClose={store.closePopup} />
                <TopBar />
                <h2 className="cargoList__title">Ваши грузы</h2>
                <SearchListResults list={list} typeButton='mylist' onClickOne={handleEditClick} onClickTwo={store.openPopup} />
            </div>
        </div>
    )
});

export default CargoListPage;