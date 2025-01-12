import { postStore } from "../../stores/PostStore";
import CargoForm from "../forms/CargoForm";
import TopBar from "../TopBar";
import { observer } from "mobx-react";

const CargoPostPage = observer(({ typePage }) => {
    const store = postStore;

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        store.setFormData(name, value, type, checked, event);
    };

    return (
        <div className="cargo">
            <div className="container">
                <TopBar />
                <h2 className="cargo__title">{typePage === 'add' ? 'Добавить груз' : 'Изменить груз'}</h2>
                <CargoForm data={store.cargoFormData} image={store.cargoFormData.cargoPhoto} onChange={handleInputChange} />
                <div className="cargo__btnBox">
                    <button className="cargo__button">{typePage === 'add' ? 'Опубликовать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default CargoPostPage;