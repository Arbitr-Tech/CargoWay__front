import { useEffect } from "react";
import TopBar from "../../TopBar";
import AutoForm from "../../forms/AutoForm";
import { observer } from "mobx-react-lite";
import { autoStore } from "../../../stores/AutoStore";
import { loadFile } from "../../../api/commonService";
import { addAuto, updateAuto } from "../../../api/autoService";
import { toJS } from "mobx";
import { useLocation, useNavigate } from "react-router-dom";
import { validateTransportData } from "../../../validation/validations";
import { toast } from "react-toastify";


const AutoPostPage = observer(({ typePage }) => {
    const store = autoStore;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
            if (!location.pathname.startsWith("/auto/edit")) {
                store.resetFormData();
            }
        }, [location.pathname]);

    const handleInputChange = ({ target: { name, value, type, valueAsNumber } }) => {
        if (type === "number") {
            const valNum = Math.max(0, valueAsNumber || 0);
            store.setFormData(name, valNum);
        } else {
            store.setFormData(name, value);
        }
    };

    const handleNestedInputChange = ({ target: { name, dataset, value, type, valueAsNumber } }) => {
        if (type === "number") {
            const valNum = Math.max(0, valueAsNumber || 0);
            store.setNestedFormData(name, dataset.path, valNum);
        } else {
            store.setNestedFormData(name, dataset.path, value);
        }
        
    };

    const handleButton = async () => {
        const errors = validateTransportData(store.autoFormData, store.autoEmbeddedTrailer, store.autoAdditionalTrailers);

        if (Object.keys(errors).length > 0) {
            console.log("Ошибки отправки формы:", errors);
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return;
        }

        try {
            if (typePage === 'add') {
                const data = store.getFormData();
                await addAuto(toJS(data));
                navigate('/auto/list');
                toast.success("Успешно");
            } else {
                const data = store.getUpdatedFields();
                await updateAuto(store.editingTransportId, data);
                navigate('/auto/list');
                toast.success("Успешно");
            }
        } catch (error) {
            console.log('Ошибка отправки формы: ', error);
            toast.error("Ошибка, попробуйте позже");
        }
    };

    return (
        <div className="auto">
            <div className="container">
                <TopBar />
                <h2 className="auto__title">{typePage === 'add' ? 'Добавить машину' : 'Изменить машину'}</h2>
                <AutoForm
                    data={store.autoFormData}
                    onChange={handleInputChange}
                    autoEmbeddedTrailer={store.autoEmbeddedTrailer}
                    autoAdditionalTrailer={store.autoAdditionalTrailers}
                    onNestedChange={handleNestedInputChange}
                    onClickButtonEmbeddedTrailer={store.toggleAutoEmbeddedTrailer}
                    onClickButtonAdditionalTrailer={store.toggleAutoAdditionalTrailers}
                    onLoadImage={loadFile}
                    onChangeImage={store.setFormData}
                    typePage={typePage}
                />
                <div className="auto__btnBox">
                    <button className="auto__button" onClick={handleButton}>{typePage === 'add' ? 'Создать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default AutoPostPage;