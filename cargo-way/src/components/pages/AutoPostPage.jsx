import { useState } from "react";
import TopBar from "../TopBar";
import AutoForm from "../forms/AutoForm";

const AutoPostPage = ({ typePage }) => {
    const [formData, setFormData] = useState({
        weight: "",
        volume: "",
        bodyType: [],
        loadingType: [],
        date: "",
        loadingLocality: "",
        unloadingLocality: "",
        noncashVAT: "",
        noncash: "",
        cash: "",
        autoPhoto: ""
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            setFormData((prevState) => {
                const updatedBodyType = checked
                    ? [...prevState[name], value]
                    : prevState[name].filter((item) => item !== value);

                return {
                    ...prevState,
                    [name]: updatedBodyType, 
                };
            });
        } else if (type === 'file') {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData((prevState) => ({
                        ...prevState,
                        autoPhoto: reader.result, 
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value, 
            }));
        }
    };

    return (
        <div className="auto">
            
            <div className="container">
                <TopBar />
                <h2 className="auto__title">{typePage === 'add' ? 'Добавить машину' : 'Изменить машину'}</h2>
                <AutoForm data={formData} image={formData.autoPhoto} onChange={handleInputChange} />
                <div className="auto__btnBox">
                    <button className="auto__button">{typePage === 'add' ? 'Опубликовать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
};

export default AutoPostPage;