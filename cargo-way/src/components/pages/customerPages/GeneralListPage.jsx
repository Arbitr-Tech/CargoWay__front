import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { listStore } from "../../../stores/ListStore";
import { deleteCargo, getDetailsCargo, publishCargo, unpublishCargo } from "../../../api/cargoService";
import Popup from "../../Popup";
import { cargoStore } from "../../../stores/CargoStore";
import Pagination from "../../Pagination";
import ListItems from "../../ListItems";
import { toast } from "react-toastify";

const GeneralListPage = observer(() => {
    const navigate = useNavigate();
    const location = useLocation();
    const storeCargo = cargoStore;
    const [popupData, setPopupData] = useState({ isOpen: false, text: "", type: "", item: null });
    const [isLoading, setIsLoading] = useState(true);

    const loadCargoList = async (page = listStore.getCurrentPage("INTERNAL")) => {
        try {
            setIsLoading(true);
            listStore.setCurrentPage("INTERNAL", page);
            await listStore.fetchCargoList("INTERNAL", page);
        } catch (error) {
            console.error("Ошибка загрузки списка грузов:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadCargoList();
    }, [location.pathname]);

    const getButtonsByStatus = (item) => {
        const commonButtons = [
            {
                label: "Редактировать",
                onClick: () => handleEditClick(item),
            },
            {
                label: "Удалить",
                onClick: () =>
                    openPopup("Вы действительно хотите удалить эту запись?", "del", item),
            },
        ];

        if (item.visibilityStatus === "PUBLISHED") {
            return [
                ...commonButtons,
                {
                    label: "Снять с публикации",
                    onClick: () =>
                        openPopup("Вы действительно хотите снять с публикации?", "edit", item),
                },
            ];
        } else {
            return [
                ...commonButtons,
                {
                    label: "Опубликовать",
                    onClick: () =>
                        openPopup("Вы действительно хотите опубликовать эту запись?", "edit", item),
                },
            ];
        }
    };


    const openPopup = (text, type, item) => {
        setPopupData({ isOpen: true, text, type, item });
    };

    const closePopup = () => {
        setPopupData({ isOpen: false, text: "", type: "", item: null });
    };

    const handleEditClick = async (item) => {
        try {
            const data = await getDetailsCargo(item.id);
            storeCargo.setCargoFormDataFromServer(item.id, data.cargo);
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
            toast.success("Успешно удалено")
            await loadCargoList();
        } catch (error) {
            console.error("Ошибка при удалении груза:", error);
        }
    };

    const handlePublishClick = async () => {
        if (!popupData.item) return;
        try {
            console.log(popupData.item);
            if (popupData.item.visibilityStatus === "DRAFT") {
                await publishCargo(popupData.item.id);
            } else {
                await unpublishCargo(popupData.item.id);
            };
            closePopup();
            await loadCargoList();
        } catch (error) {
            console.error("Ошибка при изменении статуса груза:", error);
        }
    };

    return (
        <div className="cargoList">
            <Popup
                isOpen={popupData.isOpen}
                text={popupData.text}
                typePopup={popupData.type}
                onClose={closePopup}
                onConfirm={popupData.type === "del" ? handleDeleteClick : handlePublishClick}
            />
            <h2 className="cargoList__title">Общие записи</h2>
            {isLoading ? (
                <div className="cargoList__empty">
                    <p className="cargoList__subtitle">Загрузка списка...</p>
                </div>
            ) : listStore.cargoLists.INTERNAL.length > 0 ? (
                <div className="cargoList__content">
                    <ListItems
                        list={listStore.cargoLists.INTERNAL}
                        type="myListCargo"
                        getButtons={getButtonsByStatus}
                    />
                    <Pagination
                        currentPage={listStore.getCurrentPage("INTERNAL")}
                        totalPages={listStore.getTotalPages("INTERNAL")}
                        onPageChange={(page) => loadCargoList(page)}
                    />
                </div>
            ) : (
                <div className="cargoList__empty">
                    <p className="cargoList__empty-subtitle">У вас нет созданных грузов.</p>
                    <button className="cargoList__empty-button" onClick={() => navigate('/cargo/add')}>Перейти к созданию</button>
                </div>

            )}
        </div>
    );
});

export default GeneralListPage;
