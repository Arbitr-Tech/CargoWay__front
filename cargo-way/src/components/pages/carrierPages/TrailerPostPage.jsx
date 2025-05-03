import { useEffect } from "react";
import TopBar from "../../TopBar";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";
import { useLocation, useNavigate } from "react-router-dom";
import { trailerStore } from "../../../stores/TrailerStore";
import TrailerForm from "../../forms/TrailerForm";
import { addTrailer, updateTrailer } from "../../../api/trailerService";
import { toast } from "react-toastify";
import { validateTrailerData } from "../../../validation/validations";


const TrailerPostPage = observer(({ typePage }) => {
    const store = trailerStore;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location.pathname.startsWith("/trailer/edit")) {
            store.resetFormData();
        }
    }, [location.pathname]);

    const handleInputChange = ({ target: { name, value, valueAsNumber, type } }) => {
        if (type === "number") {
            const valNum = Math.max(0, valueAsNumber || 0);
            store.setFormData(name, valNum);
        } else {
            store.setFormData(name, value);
        }
    };

    const handleButtonClick = async () => {
        const errors = validateTrailerData(store.trailerFormData);

        if (Object.keys(errors).length > 0) {
            console.log("Ошибки отправки формы:", errors);
            Object.values(errors).forEach(errorMessage => {
                toast.error(errorMessage);
            });
            return;
        }

        try {
            if (typePage === 'add') {
                await addTrailer(toJS(store.trailerFormData));
            } else {
                const data = store.getUpdatedFields();
                await updateTrailer(store.editingTrailerId, data);
            }
            navigate('/trailer/list');
            toast.success('Успешно');
        } catch (error) {
            console.log('Ошибка отправки формы: ', error);
            toast.error('Ошибка, попробуйте позже');
        };
    }

    return (
        <div className="trailer">
            <div className="container">
                <TopBar />
                <h2 className="trailer__title">{typePage === 'add' ? 'Добавить прицеп' : 'Изменить прицеп'}</h2>
                <TrailerForm
                    data={store.trailerFormData}
                    onChange={handleInputChange}
                />
                <div className="trailer__btnBox">
                    <button className="trailer__button" onClick={handleButtonClick}>{typePage === 'add' ? 'Создать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default TrailerPostPage;