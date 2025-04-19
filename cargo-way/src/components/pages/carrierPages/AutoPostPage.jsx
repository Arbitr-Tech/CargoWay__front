import { useEffect, useState } from "react";
import TopBar from "../../TopBar";
import AutoForm from "../../forms/AutoForm";
import { observer } from "mobx-react-lite";
import { autoStore } from "../../../stores/AutoStore";
import { loadFile } from "../../../api/commonService";
import { addAuto } from "../../../api/autoService";
import { toJS } from "mobx";
import { useLocation, useNavigate } from "react-router-dom";


const AutoPostPage = observer(({ typePage }) => {
    const store = autoStore;
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
            if (!location.pathname.startsWith("/auto/edit")) {
                store.resetFormData();
            }
        }, [location.pathname]);

    const handleInputChange = ({ target: { name, value } }) => {
        store.setFormData(name, value);
    };

    const handleNestedInputChange = ({ target: { name, dataset, value } }) => {
        // const resValue = name === 'dimensions' ? +value : value;
        store.setNestedFormData(name, dataset.path, value);
    };

    const handleTwiceNestedInputChange = ({ target: { name, dataset, value } }) => {
        store.setTwiceNestedFormData(name, dataset.path, dataset.pathtwo, Number(value));
        console.log(store.autoFormData)
    };

    const handleClickDriver = (event) => {
        store.setDriver(Number(event.target.dataset.id));
    };

    const handleButton = async () => {
        try {
            if (typePage === 'add') {
                await addAuto(toJS(store.autoFormData));
                console.log(toJS(store.autoFormData))
                navigate('/auto/list');
            } else {
                // const data = store.getUpdatedFields();
                // await updateCargo(store.editingCargoId, data);
                // navigate('/cargo/list');
            }
        } catch (error) {
            console.log('Ошибка отправки формы: ', error);
        }
    };

    return (
        <div className="auto">
            <div className="container">
                <TopBar />
                <h2 className="auto__title">{typePage === 'add' ? 'Добавить машину' : 'Изменить машину'}</h2>
                <AutoForm
                    data={store.autoFormData}
                    autoTrailer={store.autoTrailer}
                    dropDown={store.autoDropDownDriver}
                    onChange={handleInputChange}
                    onNestedChange={handleNestedInputChange}
                    onTwiceNesctedChange={handleTwiceNestedInputChange}
                    onClickButtonTrailer={store.setAutoTrailer}
                    onClickDriver={handleClickDriver}
                    onClickMenu={store.setDropDown}
                    onClickMenuButton={() => store.setFormData('driver', '')}
                    onLoadImage={loadFile}
                    onChangeImage={store.setFormData}
                />
                <div className="auto__btnBox">
                    <button className="auto__button" onClick={handleButton}>{typePage === 'add' ? 'Создать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default AutoPostPage;