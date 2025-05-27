import { toast } from "react-toastify";
import { driverStore } from "../../../stores/DriverStore";
import { validateDriverData } from "../../../validation/validations";
import DriverForm from "../../forms/DriverForm";
import TopBar from "../../TopBar";
import { observer } from "mobx-react-lite";
import { addDriver, getDetailsDriver, updateDriver } from "../../../api/driverService";
import { toJS } from "mobx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteFile, loadFile } from "../../../api/commonService";

const DriverPostPage = observer(({ typePage }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const param = useParams();
    const id = param.id;
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        async function getData() {
            setIsLoading(true);
            try {
                const data = await getDetailsDriver(id);
                driverStore.setDriverFormDataFromServer(data);
            } finally {
                setIsLoading(false);
            };
        };
        if (!location.pathname.startsWith("/driver/edit")) {
            driverStore.resetFormData();
        } else {
            getData();
        }
    }, [location.pathname]);

    const handleInputChange = ({ target: { name, value } }) => {
        driverStore.setFormData(name, value);
    };

    const handleDeleteImage = async (id) => {
        await deleteFile(id);
    };

    const handleCLick = async () => {
        const errors = validateDriverData(driverStore.driverFormData);

        if (Object.keys(errors).length > 0) {
            console.log("Ошибки отправки формы:", errors);
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return;
        }

        try {
            if (typePage === 'add') {
                (toJS(driverStore.driverFormData))
                await addDriver(toJS(driverStore.driverFormData));
                toast.success('Успешно создано');
                navigate('/driver/list');
            } else {
                const data = driverStore.getUpdatedFields();
                await updateDriver(data, id);
                toast.success("Успешно изменено");
                navigate('/driver/list');
            }
        } catch (error) {
            console.log(error);
            toast.error('Ошибка, попробуйте позже');
        }
    };


    return (
        <div className="driver">
            <div className="container">
                <div className="cargoList__menu">
                    <TopBar />
                </div>
                <div className="cargoList__content">
                    <h2 className="driver__title">{typePage === 'add' ? 'Добавить' : 'Изменить'} данные о водителе</h2>
                    <DriverForm
                        data={driverStore.driverFormData}
                        onChange={handleInputChange}
                        isLoadingData={isLoading}
                        onChangeImage={driverStore.setFormData}
                        onDeleteFile={handleDeleteImage}
                        onLoadImage={loadFile}
                        typePage={typePage}
                    />
                    <div className="driver__btnBox">
                        <button className="driver__button" onClick={handleCLick}>{typePage === 'add' ? 'Опубликовать запись' : 'Сохранить изменения'}</button>
                    </div>
                </div>
            </div>
        </div>
    )
});

export default DriverPostPage;