import { postStore } from "../../stores/PostStore";
import CargoForm from "../forms/CargoForm";
import TopBar from "../TopBar";
import { observer } from "mobx-react-lite";

const CargoPostPage = observer(({ typePage }) => {
    const store = postStore;

    const handleInputChange = ({ target: { name, value, type, file } }) => {
        const resValue = name === 'weight' ||  name === 'volume' ? +value : value;
        store.setFormData(name, resValue, type, file?.[0], 'cargo');
        console.log(store.cargoFormData)
    };

    const handleNestedInputChange = ({ target: { name, dataset, value } }) => {
        const resValue = name === 'dimensions' ? +value : value;
        store.setNestedFormData(name, resValue, dataset.path, 'cargo');
        console.log(store.cargoFormData)
    };

    return (
        <div className="cargo">
            <div className="container">
                <TopBar />
                <h2 className="cargo__title">{typePage === 'add' ? 'Добавить' : 'Изменить'} груз</h2>
                <CargoForm data={store.cargoFormData} image={store.cargoFormData.cargoPhoto} onChange={handleInputChange} onNestedChange={handleNestedInputChange}/>
                <div className="cargo__btnBox">
                    <button className="cargo__button">{typePage === 'add' ? 'Опубликовать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default CargoPostPage;