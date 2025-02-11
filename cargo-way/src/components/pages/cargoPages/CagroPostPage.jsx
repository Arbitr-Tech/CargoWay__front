import { toJS } from "mobx";
import { loadFile } from "../../../api/commonService";
import { cargoStore } from "../../../stores/CargoStore";
import CargoForm from "../../forms/CargoForm";
import TopBar from "../../TopBar";
import { observer } from "mobx-react-lite";
import { addCargo } from "../../../api/cargoService";
import { useNavigate } from "react-router-dom";

const CargoPostPage = observer(({ typePage }) => {
    const store = cargoStore;
    const navigate = useNavigate();

    const handleInputChange = ({ target: { name, value } }) => {
        const resValue = name === 'weight' || name === 'volume' ? +value : value;
        store.setFormData(name, resValue);
    };

    const handleNestedInputChange = ({ target: { name, dataset, value } }) => {
        const resValue = name === 'dimensions' ? +value : value;
        store.setNestedFormData(name, dataset.path, resValue);
        console.log(store.cargoFormData)
    };

    const handleClickButton = async () => {
        console.log(store.cargoFormData);
        try {
            await addCargo(toJS(store.cargoFormData));
            store.resetFormData();
            navigate('/cargo/list');
        } catch (error) {
            console.log('Ошибка отправки формы: ', error);
        }
    };

    return (
        <div className="cargo">
            <div className="container">
                <TopBar />
                <h2 className="cargo__title">{typePage === 'add' ? 'Добавить' : 'Изменить'} груз</h2>
                <CargoForm data={store.cargoFormData} onChange={handleInputChange} onNestedChange={handleNestedInputChange} onChangeImage={store.setFormData} onLoadImage={loadFile} />
                <div className="cargo__btnBox">
                    <button className="cargo__button"
                        onClick={handleClickButton}
                    >{typePage === 'add' ? 'Создать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default CargoPostPage;