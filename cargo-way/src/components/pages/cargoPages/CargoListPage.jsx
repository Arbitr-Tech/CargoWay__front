import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { listStore } from "../../../stores/ListStore";
import { changeStatusCargo, deleteCargo, getDetailsCargo } from "../../../api/cargoService";
import Popup from "../../Popup";
import SearchListResults from "../../search/autoAndCargo/SearchListResults";
import TopBar from "../../TopBar";
import { cargoStore } from "../../../stores/CargoStore";

const CargoListPage = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const storeCargo = cargoStore;
    const [popupData, setPopupData] = useState({ isOpen: false, text: "", type: "", item: null });
    const [isLoading, setIsLoading] = useState(true);

    const loadCargoList = async () => {
        try {
            setIsLoading(true);
            await listStore.fetchCargoList(); 
        } catch (error) {
            console.error("Ошибка загрузки списка грузов:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCargoList();
    }, [location.pathname]);

    const openPopup = (text, type, item) => {
        setPopupData({ isOpen: true, text, type, item });
    };

    const closePopup = () => {
        setPopupData({ isOpen: false, text: "", type: "", item: null });
    };

    const handleEditClick = async (item) => {
        try {
            const data = await getDetailsCargo(item.id);
            storeCargo.setCargoFormDataFromServer(item.id, data);
            navigate('/cargo/edit');
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteClick = async () => {
        if (!popupData.item) return;
        try {
            await deleteCargo(popupData.item.id);
            closePopup();
            await loadCargoList();
        } catch (error) {
            console.error("Ошибка при удалении груза:", error);
        }
    };

    const handlePublishClick = async () => {
        if (!popupData.item) return;
        try {
            await changeStatusCargo(popupData.item.id, popupData.item.status);
            closePopup();
            await loadCargoList();
        } catch (error) {
            console.error("Ошибка при изменении статуса груза:", error);
        }
    };

    return (
        <div className="cargoList">
            <div className={`overlay ${popupData.isOpen ? "overlay--show" : ""}`}></div>
            <div className="container">
                <Popup
                    isOpen={popupData.isOpen}
                    text={popupData.text}
                    typePopup={popupData.type}
                    onClose={closePopup}
                    onConfirm={popupData.type === "del" ? handleDeleteClick : handlePublishClick}
                />
                <TopBar />
                <h2 className="cargoList__title">Ваши грузы</h2>

                {isLoading ? (
                    <p>Загрузка списка...</p>
                ) : listStore.listCargo.length > 0 ? (
                    <SearchListResults
                        list={listStore.listCargo}
                        typeButton="mylist"
                        onClickOne={handleEditClick}
                        onClickTwo={(item) => openPopup("Вы действительно хотите удалить эту запись?", "del", item)}
                        onClickThree={(item) => openPopup("Вы действительно хотите опубликовать эту запись?", "edit", item)}
                    />
                ) : (
                    <p>У вас нет добавленных грузов.</p>
                )}
            </div>
        </div>
    );
});

export default CargoListPage;
