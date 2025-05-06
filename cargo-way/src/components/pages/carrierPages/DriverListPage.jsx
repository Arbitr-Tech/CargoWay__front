import TopBar from "../../TopBar";
import { useLocation, useNavigate } from "react-router-dom";
import Popup from "../../Popup";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { driverStore } from "../../../stores/DriverStore";
import DriverList from "../../carrierLists/DriverList";
import { deleteDriver, getDetailsDriver } from "../../../api/driverService";
import Pagination from "../../Pagination";
import { toast } from "react-toastify";

const DriverListPage = observer(() => {
    const store = driverStore;
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);
    const [popupData, setPopupData] = useState({ isOpen: false, item: null });

    const loadDriverList = async (page = store.getCurrentPage()) => {
        try {
            setIsLoading(true);
            store.setCurrentPage(page);
            await store.fetchDriverList(page);
        } catch (error) {
            console.error("Ошибка загрузки списка водителей:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openPopup = (item) => {
        setPopupData({ isOpen: true, item });
    };

    const closePopup = () => {
        setPopupData({ isOpen: false, item: null });
    };

    useEffect(() => {
        loadDriverList();
    }, [location.pathname]);

    const handleEditClick = async (item) => {
        try {
            const data = await getDetailsDriver(item.id);
            store.setDriverFormDataFromServer(item.id, data);
            navigate('/driver/edit');
        } catch (error) {
            console.log(error);
            toast.error('Ошибка, попробуйте позже');
        }
    }

    const handleDeleteClick = async () => {
        try {
            await deleteDriver(popupData.item.id);
            closePopup();
            loadDriverList();
            toast.success('Успешно удалено');
        } catch (error) {
            console.log(error);
            toast.error('Ошибка, попробуйте позже');
        }
    }


    return (
        <div className="driver">
            <div className="container">
                <Popup
                    isOpen={popupData.isOpen}
                    text='Вы действительно хоите удалить эту запись?'
                    typePopup='del'
                    onClose={closePopup}
                    onConfirm={handleDeleteClick}
                />
                <TopBar />
                <h2 className="driver__title">Ваши водители</h2>
                {isLoading ? (
                    <div className="driver__empty">
                        <p className="driver__subtitle">Загрузка списка...</p>
                    </div>
                ) : store.driverList.length > 0 ? (
                    <div className="driver__content">
                        <DriverList list={store.driverList} onClickEdit={handleEditClick} onClickDelete={openPopup} />
                        <Pagination
                            currentPage={store.getCurrentPage()}
                            totalPages={store.getTotalPages()}
                            onPageChange={(page) => loadDriverList(page)}
                        />
                    </div>
                ) : (
                    <div className="driver__empty">
                        <p className="driver__empty-subtitle">У вас нет созданных водителей.</p>
                        <button className="driver__empty-button" onClick={() => navigate('/driver/add')}>Перейти к созданию</button>
                    </div>

                )}
            </div>
        </div>
    )
});

export default DriverListPage; 