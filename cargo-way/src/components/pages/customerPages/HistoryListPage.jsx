import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { listStore } from "../../../stores/ListStore";
import { changeStatusCargo, deleteCargo, getDetailsCargo } from "../../../api/cargoService";
import TopBar from "../../TopBar";
import { cargoStore } from "../../../stores/CargoStore";
import ListItems from "../../listsTemplates/ListItems";
import Popup from "../../popups/Popup";
import { userStore } from "../../../stores/UserStore";

const HistoryListPage = observer(() => {
    const navigate = useNavigate();
    const role = userStore.role;
    const location = useLocation();
    const [popupData, setPopupData] = useState({ isOpen: false, text: "", type: "", item: null });
    const [isLoading, setIsLoading] = useState(true);

    const listTest = {
        "content": [
            {
                "id": "980bf2b4-26f6-4384-9fca-19de25e57e78",
                "visibilityStatus": "COMPLETED",
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
                "visibilityStatus": "CANCELED",
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

    const getButtonsByStatus = (item) => {
        if (role === "CUSTOMER") {
            return [{ label: "Подробности", onClick: () => navigate(`/customer/info/history/${item.id}`) }];
        } else {
            return [{ label: "Подробности", onClick: () => navigate(`/carrier/info/history/${item.id}`) }];
        }

    };

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
                    getButtons={getButtonsByStatus}
                />
                {/* ) : (
                    <p>У вас нет добавленных грузов.</p>
                )} */}
            </div>
        </div>
    );
});

export default HistoryListPage;
