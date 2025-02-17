import { useState } from "react";
import Popup from "../../Popup";
import SearchListResults from "../../search/autoAndCargo/SearchListResults";
import TopBar from "../../TopBar";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { listStore } from "../../../stores/ListStore";
import { getDetailsCargo } from "../../../api/cargoService";
import { cargoStore } from "../../../stores/CargoStore";


const CargoListPage = observer(() => {
    const store = listStore;
    const storeCargo = cargoStore;
    const navigate = useNavigate();

    const handleEditClick = async (item) => {
        try {
            const data = await getDetailsCargo('b8c7e86d-76ad-4c00-ba9e-78943b90b074');
            console.log(data)
            storeCargo.setCargoFormDataFromServer('b8c7e86d-76ad-4c00-ba9e-78943b90b074', data);
            navigate('/cargo/edit');
        } catch (error) {
            console.log(error)
        }
    }

    const list = [
        { id: 1, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", deliveryDate: "2025-05-10", bodyType: "тент", loadType: "задняя", unloadType: "ручная", cargoPhoto: "photo_url_here", status: "Не опубликовано" },
        { id: 2, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", deliveryDate: "2025-05-10", bodyType: "тент", loadType: "задняя", unloadType: "ручная", cargoPhoto: "photo_url_here", status: "Не опубликовано" },
        { id: 3, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", deliveryDate: "2025-05-10", bodyType: "тент", loadType: "задняя", unloadType: "ручная", cargoPhoto: "photo_url_here", status: "Не опубликовано" },
        { id: 4, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", deliveryDate: "2025-05-10", bodyType: "тент", loadType: "задняя", unloadType: "ручная", cargoPhoto: "photo_url_here", status: "Не опубликовано" },
        { id: 5, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", deliveryDate: "2025-05-10", bodyType: "тент", loadType: "задняя", unloadType: "ручная", cargoPhoto: "photo_url_here", status: "Не опубликовано" },
        { id: 6, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", deliveryDate: "2025-05-10", bodyType: "тент", loadType: "задняя", unloadType: "ручная", cargoPhoto: "photo_url_here", status: "Не опубликовано" },
        { id: 7, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", deliveryDate: "2025-05-10", bodyType: "тент", loadType: "задняя", unloadType: "ручная", cargoPhoto: "photo_url_here", status: "Не опубликовано" },
        { id: 8, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", deliveryDate: "2025-05-10", bodyType: "тент", loadType: "задняя", unloadType: "ручная", cargoPhoto: "photo_url_here", status: "Не опубликовано" },
        { id: 9, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", deliveryDate: "2025-05-10", bodyType: "тент", loadType: "задняя", unloadType: "ручная", cargoPhoto: "photo_url_here", status: "Не опубликовано" },
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