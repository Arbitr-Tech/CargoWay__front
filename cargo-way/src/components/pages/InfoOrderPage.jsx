import { observer } from "mobx-react-lite";
import TopBar from "../TopBar";
import { cargoStore } from "../../stores/CargoStore";
import InfoAboutOrder from "../InfoAboutOrder";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { cancelResponseByCarrier, endResponseByCarrier, endResponseByCustomer, getDetailsCargo } from "../../api/cargoService";
import Popup from "../popups/Popup";
import { responseStore } from "../../stores/ResponseStore";
import { toast } from "react-toastify";

const InfoOrderPage = observer(({ typePage }) => {
    const param = useParams();
    const id = param.id;
    const location = useLocation();
    const navigate = useNavigate();
    const [popupData, setPopupData] = useState({ isOpen: false, text: "", type: "" });

    useEffect(() => {
        async function getData() {
            const data = await getDetailsCargo(id);
            cargoStore.setCargoFormDataFromServer(data.cargo);
            delete data.cargo;
            responseStore.setResponseFormDataFromServer(data);
            console.log(responseStore.response)
        };
        getData();
    }, [location.pathname]);

    useEffect(() => {
        return () => {
            cargoStore.resetFormData();
        };
    }, []);

    const handleClickCancel = () => {
        const text = typePage === 'carrier_biddings' ?
            'Вы действительно хотите отменить отклик?' :
            'Вы действительно хотите отменить заказ?';
        openPopup(text, 'del');
    };

    const handleClickCancelByCarrier = async () => {
        try {
            await cancelResponseByCarrier(id,);
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickEndByCarrier = async () => {
        try {
            await endResponseByCarrier(id);
            toast.success("Успешно завершено. Ждем подтверждения от заказчика");
            navigate('/carrier/list/active');
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        }
    };

    const handleClickEndByCustomer = async () => {
        try {
            await endResponseByCustomer(id);
            toast.success("Успешно завершено");
            navigate('/cargo/list/active');
        } catch (error) {
            toast.error("Ошибка, попробуйте позже");
            console.log(error);
        }
    };

    const openPopup = (text, type) => {
        setPopupData({ isOpen: true, text, type });
    };

    const closePopup = () => {
        setPopupData({ isOpen: false, text: "", type: "" });
    };

    const handleConfirm = () => {
        // if (typePage === 'carrier_biddings') return handleClickCancelByCarrier();
        // if (typePage === 'carrier_biddings') return handleClickCancelByCarrier();
    }

    const handleEnd = () => {
        if (typePage === 'carrier_active') return handleClickEndByCarrier();
        if (typePage === 'customer_active') return handleClickEndByCustomer();
    }

    return (
        <div className="cargoList">
            <div className="container">
                <Popup
                    isOpen={popupData.isOpen}
                    text={popupData.text}
                    typePopup={popupData.type}
                    onClose={closePopup}
                    // onConfirm={ handleConfirm }
                />
                <TopBar />
                <h2 className="cargoList__title">Информация о заказе</h2>
                <InfoAboutOrder
                    {...cargoStore.cargoFormData}
                    from={cargoStore.cargoFormData.route.from}
                    to={cargoStore.cargoFormData.route.to}
                    length={cargoStore.cargoFormData.dimensions['length']}
                    width={cargoStore.cargoFormData.dimensions.width}
                    height={cargoStore.cargoFormData.dimensions.height}
                    onClickCancel={handleClickCancel}
                    onClickEnd={handleEnd}
                    customer={responseStore.response.owner.profileName}
                    carrier={responseStore.response.executor.profileName}
                    disabled={responseStore.response.endExecution === null}
                    disabledFromCarrier={responseStore.response.endExecution !== null}
                    typePage={typePage} />
            </div>
        </div>
    );
});

export default InfoOrderPage;
