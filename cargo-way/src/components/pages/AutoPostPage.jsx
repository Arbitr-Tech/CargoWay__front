import { useState } from "react";
import TopBar from "../TopBar";
import AutoForm from "../forms/AutoForm";
import { observer } from "mobx-react";
import { postStore } from "../../stores/PostStore";


const AutoPostPage = observer(({ typePage }) => {
    const store = postStore;

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        store.setFormData(name, value, type, checked, event);
    };

    return (
        <div className="auto">
            
            <div className="container">
                <TopBar />
                <h2 className="auto__title">{typePage === 'add' ? 'Добавить машину' : 'Изменить машину'}</h2>
                <AutoForm data={store.autoFormData} image={store.autoFormData.autoPhoto} onChange={handleInputChange} />
                <div className="auto__btnBox">
                    <button className="auto__button">{typePage === 'add' ? 'Опубликовать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default AutoPostPage;