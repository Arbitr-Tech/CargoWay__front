import DriverForm from "../../forms/DriverForm";
import TopBar from "../../TopBar";
import { observer } from "mobx-react-lite";

const DriverPostPage = observer(({typePage}) => {
    return (
        <div className="driver">
            <div className="container">
                <TopBar />
                <h2 className="driver__title">{typePage === 'add' ? 'Добавить' : 'Изменить'} данные о водителе</h2>
                <DriverForm />
                <div className="driver__btnBox">
                    <button className="driver__button">{typePage === 'add' ? 'Опубликовать запись' : 'Сохранить изменения'}</button>
                </div>
            </div>
        </div>
    )
});

export default DriverPostPage;