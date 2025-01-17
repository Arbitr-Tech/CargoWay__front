import SearchListResults from "../search/SearchListResults";
import TopBar from "../TopBar";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup";
import { observer } from "mobx-react-lite";
import { listStore } from "../../stores/ListStore";
import { postStore } from "../../stores/PostStore";

const AutoListPage = observer(() => {
    const store = listStore;
    const autoStore = postStore;
    const navigate = useNavigate();

    const list = [
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