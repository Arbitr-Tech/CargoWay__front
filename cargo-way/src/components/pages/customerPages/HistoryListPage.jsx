import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { listStore } from "../../../stores/ListStore";
import { changeStatusCargo, deleteCargo, getDetailsCargo } from "../../../api/cargoService";
import Popup from "../../Popup";
import TopBar from "../../TopBar";
import { cargoStore } from "../../../stores/CargoStore";
import ListItems from "../../ListItems";

const HistoryListPage = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const storeCargo = cargoStore;
    const [popupData, setPopupData] = useState({ isOpen: false, text: "", type: "", item: null });
    const [isLoading, setIsLoading] = useState(true);

    const listTest = {
        "content": [
            {
                "id": "980bf2b4-26f6-4384-9fca-19de25e57e78",
                "visibility": "DRAFT",
                "startExecution": null,
                "endExecution": null,
                "orderCreatedAt": "2025-04-18T10:43:03.44185",
                "orderUpdatedAt": null,
                "cargo": {
                    "name": "Box",
                    "description": "Большая коробка",
                    "weight": 10,
                    "volume": 100,
                    "loadType": "Задняя",
                    "unloadType": "Задняя",
                    "bodyType": "Тент",
                    "dimensions": {
                        "length": 10,
                        "width": 5,
                        "height": 20
                    },
                    "route": {
                        "from": "New York",
                        "to": "Los Angeles"
                    },
                    "price": 99.99,
                    "typePay": "НДС",
                    "readyDate": "2025-05-22",
                    "deliveryDate": "2025-06-01"
                }
            },
            {
                "id": "fca97c4f-5c56-46a8-a15b-0dcf405bfbe6",
                "visibility": "DRAFT",
                "startExecution": null,
                "endExecution": null,
                "orderCreatedAt": "2025-04-18T10:43:05.137901",
                "orderUpdatedAt": null,
                "cargo": {
                    "name": "Box",
                    "description": "Большая коробка",
                    "weight": 10,
                    "volume": 100,
                    "loadType": "Задняя",
                    "unloadType": "Задняя",
                    "bodyType": "Тент",
                    "dimensions": {
                        "length": 10,
                        "width": 5,
                        "height": 20
                    },
                    "route": {
                        "from": "New York",
                        "to": "Los Angeles"
                    },
                    "price": 99.99,
                    "typePay": "НДС",
                    "readyDate": "2025-05-22",
                    "deliveryDate": "2025-06-01"
                }
            }
        ],
        "pageNumber": 0,
        "pageSize": 10,
        "totalPages": 1
    }

    // const loadCargoList = async () => {
    //     try {
    //         setIsLoading(true);
    //         await listStore.fetchCargoList();
    //     } catch (error) {
    //         console.error("Ошибка загрузки списка грузов:", error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     loadCargoList();
    // }, [location.pathname]);

    // const openPopup = (text, type, item) => {
    //     setPopupData({ isOpen: true, text, type, item });
    // };

    // const closePopup = () => {
    //     setPopupData({ isOpen: false, text: "", type: "", item: null });
    // };

    // const handleDeleteClick = async () => {
    //     if (!popupData.item) return;
    //     try {
    //         await deleteCargo(popupData.item.id);
    //         closePopup();
    //         await loadCargoList();
    //     } catch (error) {
    //         console.error("Ошибка при удалении груза:", error);
    //     }
    // };

    return (
        <div className="cargoList">
            <div className="container">
                <Popup
                    isOpen={popupData.isOpen}
                    text={popupData.text}
                    typePopup={popupData.type}
                // onClose={closePopup}
                // onConfirm={popupData.type === "del" ? handleDeleteClick : handlePublishClick}
                />
                <TopBar />
                <h2 className="cargoList__title">Архив</h2>

                {/* {isLoading ? (
                    <p>Загрузка списка...</p>
                ) : listStore.listCargo.length > 0 ? ( */}
                <ListItems
                    list={listTest.content}
                    type="myListCargo"
                    buttons={[
                        { label: "Удалить" },
                        { label: "Посмотреть перевозчика" }
                    ]}
                />
                {/* ) : (
                    <p>У вас нет добавленных грузов.</p>
                )} */}
            </div>
        </div>
    );
});

export default HistoryListPage;
