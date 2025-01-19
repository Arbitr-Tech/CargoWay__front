import { useState } from "react";
import TopBar from "../TopBar";
import AutoForm from "../forms/AutoForm";
import { observer } from "mobx-react-lite";
import { postStore } from "../../stores/PostStore";


const AutoPostPage = observer(({ typePage }) => {
    const store = postStore;

    const handleInputChange = ({target: { name, value, type, file }}) => {
        store.setFormData(name, value, type, file?.[0], 'auto');
    };

    const handleNestedInputChange = ({ target: { name, dataset, value } }) => {
        // const resValue = name === 'dimensions' ? +value : value;
        store.setNestedFormData(name, dataset.path, value, 'auto');
    };

    const handleTwiceNestedInputChange = ({ target: { name, dataset, value } }) => {
        store.setTwiceNestedFormData(name, dataset.path, dataset.pathtwo, Number(value), 'auto');
    };

    const handleButton = () => {
        console.log(store.autoFormData)
    };

    return (
        <div className="auto">
            
            <div className="container">
                <TopBar />
                <h2 className="auto__title">{typePage === 'add' ? 'Добавить машину' : 'Изменить машину'}</h2>
                <AutoForm data={store.autoFormData} image={store.autoFormData.autoPhoto} onChange={handleInputChange} onNestedChange={handleNestedInputChange} onTwiceNesctedChange={handleTwiceNestedInputChange}/>
                <div className="auto__btnBox">
                    <button className="auto__button" onClick={handleButton}>{typePage === 'add' ? 'Опубликовать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default AutoPostPage;