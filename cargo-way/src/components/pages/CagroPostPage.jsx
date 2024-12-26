import { useState } from "react";
import CargoForm from "../forms/CargoForm";
import TopBar from "../TopBar";

const CargoPostPage = ({ typePage }) => {
    const [formData, setFormData] = useState({
        cargoName: "",
        weight: "",
        volume: "",
        date: "",
        loadingLocality: "",
        loadingAddress: "",
        unloadingLocality: "",
        unloadingAddress: "",
        bodyType: [],
        loadingType: [],
        unloadingType: [],
        noncashVAT: "",
        noncash: "",
        cash: "",
        cargoPhoto: ""
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        if (type === 'checkbox') {
            setFormData((prevState) => {
                // Копируем старый массив
                const updatedBodyType = checked
                    ? [...prevState[name], value] // Добавляем значение, если чекбокс выбран
                    : prevState[name].filter((item) => item !== value); // Удаляем значение, если чекбокс снят

                return {
                    ...prevState,
                    [name]: updatedBodyType, // Обновляем состояние
                };
            });
        } else if (type === 'file') {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFormData((prevState) => ({
                        ...prevState,
                        cargoPhoto: reader.result, // Обновляем состояние
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            setFormData((prevState) => ({
                ...prevState,
                [name]: value, // Обновляем остальные поля
            }));
        }
    };

    return (
        <div className="cargo">
            <div className="container">
                <TopBar />
                <h2 className="cargo__title">{typePage === 'add' ? 'Добавить груз' : 'Изменить груз'}</h2>
                <CargoForm data={formData} image={formData.cargoPhoto} onChange={handleInputChange} />
                <div className="cargo__btnBox">
                    <button className="cargo__button">{typePage === 'add' ? 'Опубликовать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
};

export default CargoPostPage;