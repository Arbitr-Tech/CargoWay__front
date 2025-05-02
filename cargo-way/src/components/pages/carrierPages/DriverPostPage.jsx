import { toast } from "react-toastify";
import { driverStore } from "../../../stores/DriverStore";
import { validateDriverData } from "../../../validation/validations";
import DriverForm from "../../forms/DriverForm";
import TopBar from "../../TopBar";
import { observer } from "mobx-react-lite";
import { addDriver } from "../../../api/driverService";
import { toJS } from "mobx";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const DriverPostPage = observer(({ typePage }) => {
    const store = driverStore;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location.pathname.startsWith("/driver/edit")) {
            store.resetFormData();
        }
    }, [location.pathname]);

    const handleInputChange = ({ target: { name, value } }) => {
        store.setFormData(name, value);
    };

    const handleCLick = async () => {
        const errors = validateDriverData(store.driverFormData);

        if (Object.keys(errors).length > 0) {
            console.log("Ошибки отправки формы:", errors);
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return;
        }

        try {
            await addDriver(toJS(store.driverFormData));
            toast.success('Успешно создано');
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error('Не удалось создать водителя');
        }

        console.log(toJS(store.driverFormData))
    };


    return (
        <div className="driver">
            <div className="container">
                <TopBar />
                <h2 className="driver__title">{typePage === 'add' ? 'Добавить' : 'Изменить'} данные о водителе</h2>
                <DriverForm data={store.driverFormData} onChange={handleInputChange} />
                <div className="driver__btnBox">
                    <button className="driver__button" onClick={handleCLick}>{typePage === 'add' ? 'Опубликовать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default DriverPostPage;