import { useState } from "react";
import TopBar from "../../TopBar";
import AutoForm from "../../forms/AutoForm";
import { observer } from "mobx-react-lite";
import { autoStore } from "../../../stores/AutoStore";


const AutoPostPage = observer(({ typePage }) => {
    const store = autoStore;

    const handleInputChange = ({ target: { name, value, type, file } }) => {
        store.setFormData(name, value, type, file?.[0], 'auto');
    };

    const handleNestedInputChange = ({ target: { name, dataset, value } }) => {
        // const resValue = name === 'dimensions' ? +value : value;
        store.setNestedFormData(name, dataset.path, value);
    };

    const handleTwiceNestedInputChange = ({ target: { name, dataset, value } }) => {
        store.setTwiceNestedFormData(name, dataset.path, dataset.pathtwo, Number(value));
    };

    const handleClickDriver = (event) => {
        store.setDriver(Number(event.target.dataset.id));
    };

    const handleButton = () => {
        console.log(store.autoFormData)
    };

    return (
        <div className="auto">

            <div className="container">
                <TopBar />
                <h2 className="auto__title">{typePage === 'add' ? 'Добавить машину' : 'Изменить машину'}</h2>
                <AutoForm data={store.autoFormData} image={store.autoFormData.autoPhoto} autoTrailer={store.autoTrailer}
                dropDown={store.autoDropDownDriver} onChange={handleInputChange} onNestedChange={handleNestedInputChange}
                onTwiceNesctedChange={handleTwiceNestedInputChange} onClickButtonTrailer={store.setAutoTrailer}
                onClickDriver={handleClickDriver} onClickMenu={store.setDropDown}/>
                <div className="auto__btnBox">
                    <button className="auto__button" onClick={handleButton}>{typePage === 'add' ? 'Опубликовать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default AutoPostPage;