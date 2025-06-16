import { toJS } from "mobx";
import { deleteFile, loadFile } from "../../../api/commonService";
import { cargoStore } from "../../../stores/CargoStore";
import CargoForm from "../../forms/CargoForm";
import TopBar from "../../TopBar";
import { observer } from "mobx-react-lite";
import { addCargo, getDetailsCargo, updateCargo } from "../../../api/cargoService";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { validateCargo } from "../../../validation/validations";
import { userStore } from "../../../stores/UserStore";

const CargoPostPage = observer(({ typePage }) => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id;
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            setIsLoading(true);
            try {
                const data = await getDetailsCargo(id);
                cargoStore.setCargoFormDataFromServer(data.cargo);
            } finally {
                setIsLoading(false);
            };
        };

        if (!location.pathname.startsWith("/cargo/edit")) {
            cargoStore.resetFormData();
        } else {
            getData();
        }
    }, [location.pathname]);

    const handleInputChange = ({ target: { name, value, valueAsNumber, type } }) => {
        if (type === 'number') {
            const valNum = Math.max(0, valueAsNumber || 0);
            cargoStore.setFormData(name, valNum);
        } else {
            cargoStore.setFormData(name, value);
        }
    };

    const handleDeleteImage = async (id) => {
        await deleteFile(id);
    };

    const handleNestedInputChange = ({ target: { name, dataset, value, valueAsNumber, type } }) => {
        if (type === 'number') {
            const valNum = Math.max(0, valueAsNumber || 0);
            cargoStore.setNestedFormData(name, dataset.path, valNum);
        } else {
            cargoStore.setNestedFormData(name, dataset.path, value);
        }
    };

    const handleClickButton = async () => {
        const errors = validateCargo(cargoStore.cargoFormData);

        if (Object.keys(errors).length > 0) {
            console.log("Ошибки отправки формы:", errors);
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return;
        }

        if ((userStore.userFormData.legalType === "INDIVIDUAL" &&
            userStore.userFormData.individual === null) ||
            (userStore.userFormData.legalType === "COMPANY" &&
                userStore.userFormData.company === null) ||
            userStore.userFormData.contactData === null
        ) {
            toast.warning("Для дальнейшей работы необходимо заполнить данные профиля и контактные данные");
            return
        };

        try {
            if (typePage === 'add') {
                await addCargo(toJS(cargoStore.cargoFormData));
                toast.success("Успешно создано")
                navigate('/');
            } else {
                const data = cargoStore.getUpdatedFields();
                await updateCargo(id, data);
                toast.success("Успешно изменено")
                navigate('/');
            }
        } catch (error) {
            toast.error('Ошибка');
            console.log('Ошибка отправки формы: ', error);
        }
    };

    return (
        <div className="cargo">
            <div className="container">
                <TopBar />
                <h2 className="cargo__title">{typePage === 'add' ? 'Добавить' : 'Изменить'} груз</h2>
                <CargoForm
                    data={cargoStore.cargoFormData}
                    onChange={handleInputChange}
                    onNestedChange={handleNestedInputChange}
                    isLoadingData={isLoading}
                    onChangeImage={cargoStore.setFormData}
                    onDeleteFile={handleDeleteImage}
                    onLoadImage={loadFile}
                    typePage={typePage}
                />
                <div className="cargo__btnBox">
                    <button className="cargo__button"
                        onClick={handleClickButton}
                    >{typePage === 'add' ? 'Создать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default CargoPostPage;