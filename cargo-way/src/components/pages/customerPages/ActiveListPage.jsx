import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { changeStatusCargo, deleteCargo, getDetailsCargo } from "../../../api/cargoService";
import TopBar from "../../TopBar";
import ListItems from "../../listsTemplates/ListItems";
import { userStore } from "../../../stores/UserStore";
import { listStore } from "../../../stores/ListStore";
import Pagination from "../../Pagination";

const ActiveListPage = observer(({ typePage = "active" }) => {
    const navigate = useNavigate();
    const role = userStore.role;
    const location = useLocation();
    const [popupData, setPopupData] = useState({ isOpen: false, text: "", type: "", item: null });
    const [isLoading, setIsLoading] = useState(true);

    const listTestCarrier = {
        "content": [
            {
                "id": "980bf2b4-26f6-4384-9fca-19de25e57e78",
                "visibilityStatus": "IN_PROGRESS",
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
                "visibilityStatus": "IN_PROGRESS",
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

    const listTestCarrierRespond = {
        "content": [
            {
                "id": "980bf2b4-26f6-4384-9fca-19de25e57e78",
                "visibilityStatus": "BIDDING",
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
                "visibilityStatus": "BIDDING",
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

    const loadCargoListActive = async (page = listStore.getCurrentPage("EXTERNAL")) => {
        try {
            setIsLoading(true);
            listStore.setCurrentPage("EXTERNAL", page);
            await listStore.fetchCargoList("EXTERNAL", page);
        } catch (error) {
            console.error("Ошибка загрузки списка грузов:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (role === "CUSTOMER") {
            loadCargoListActive();
        }
    }, [location.pathname]);

    // const handleInfoClick = (item) => {
    //     store.setCargoFormDataFromServer(item.id, item.cargo);
    //     // console.log(store.cargoFormData)
    //     // navigate("/customer/info/active");

    // };

    const getButtonsByStatus = (item) => {
        if (item.visibilityStatus === "IN_PROGRESS") {
            if (role === "CUSTOMER") {
                return [{ label: "Перейти", onClick: () => navigate(`/customer/info/active/${item.id}`) }];
            } else {
                return [{ label: "Перейти", onClick: () => navigate(`/carrier/info/active/${item.id}`) }];
            }
        } else {
            if (role === "CUSTOMER") {
                return [{ label: "Перейти", onClick: () => navigate(`/respond/${item.id}`) }];
            } else {
                return [{ label: "Перейти", onClick: () => navigate(`/carrier/info/respond/${item.id}`) }];
            }
        }
    };

    return (
        <div className="cargoList">
            <div className="container">
                <TopBar />
                <h2 className="cargoList__title">{`${typePage === "active" ? "Активные" : "Ждут ответа"}`}</h2>
                {/* {isLoading ? (
                    <p>Загрузка списка...</p>
                ) : listStore.listCargo.length > 0 ? ( */}
                {typePage === "active" ?
                    <div className="cargoList__content">
                        <ListItems
                            list={role === "CUSTOMER" ? listStore.cargoLists.EXTERNAL : listTestCarrier.content}
                            type={role === "CUSTOMER" ? "myListCargo" : "main"}
                            getButtons={getButtonsByStatus}
                        />
                        <Pagination
                        currentPage={role === "CUSTOMER" ? listStore.getCurrentPage("EXTERNAL") : '!!!!listTestCarrier.content'}
                        totalPages={role === "CUSTOMER" ? listStore.getTotalPages("EXTERNAL") : '!!!!listTestCarrier.content'}
                        onPageChange={(page) =>{ role === "CUSTOMER" ? loadCargoListActive(page) : console.log('!!!page')}}
                        />
                    </div>
                    :
                    <ListItems
                        list={listTestCarrierRespond.content}
                        type="main"
                        getButtons={getButtonsByStatus}
                    />
                }
            </div>
        </div>
    );
});

export default ActiveListPage;
