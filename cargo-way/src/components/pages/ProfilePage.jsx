import { React, useEffect } from "react";
import { userStore } from "../../stores/UserStore";
import CompanyInfoForm from "../forms/profileForms/CompanyInfoForm";
import ContactInfoForm from "../forms/profileForms/ContactInfoForm";
import TopBar from "../TopBar";
import { observer } from "mobx-react-lite";
import { getProfileData, updateProfileData } from "../../api/profileService";
import { toJS } from "mobx";
import { toast } from "react-toastify";
import IndividualInfoForm from "../forms/profileForms/IndividualInfoForm";

const ProfilePage = observer(() => {
    const store = userStore;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfileData();
                console.log(data);
                store.setUserFormData(data);
                console.log("UF: ", store.userFormData);
            } catch (error) {
                console.log(error);
                toast.error('Произошла ошибка, попробуйте позже');
            }

        };

        fetchData();
    }, []);

    const handleNestedInputChange = ({ target: { name, dataset, value } }) => {
        store.setNestedFieldsData(name, dataset.path, value);
    };

    const handleClickMainInfoButton = async () => {
        try {
            const updatedData = store.getUpdatedFields();
            console.log(updatedData);
            const newData = await updateProfileData(toJS(updatedData));
            store.setUserFormData(newData);
            toast.success("Успешно")
        } catch (error) {
            console.log('Ошибка отправки изменений: ', error);
            store.reset();
            toast.error('Произошла ошибка, попробуйте позже');
        }
    }

    const getRoleName = (role) => {
        switch (role) {
            case 'CARRIER': return 'Перевозчик';
            case 'CUSTOMER': return 'Заказчик';
            default: return '';
        }
    };

    return (
        <div className="profile">
            <div className="container">
                <TopBar />
                <div className="profile__inner">
                    <div className="profile__userInfo">
                        <div className="profile__userInfo-main">
                            <h2 className="profile__main-title">Основная информация</h2>
                            <div className="profile__main-rating">
                                <p className="profile__rating-item">Рейтинг от пользователей: <span>{store.originalUserFormData?.userRating}</span></p>
                                <p className="profile__rating-item">Рейтинг системы: <span>{store.originalUserFormData?.systemRating}</span></p>
                            </div>
                            <div className="profile__main-data">
                                <p className="profile__data-item">Имя пользователя: <span>{store.originalUserFormData.userData?.username || ''}</span></p>
                                <p className="profile__data-item">Почта: <span>{store.originalUserFormData.userData?.email || ''}</span></p>
                                <p className="profile__data-item">
                                    Роль: <span>{getRoleName(store.originalUserFormData.userData?.role)}</span>
                                </p>
                            </div>
                        </div>
                        <div className="profile__userInfo-contact">
                            <ContactInfoForm
                                data={store.userFormData}
                                isNull={store.originalUserFormData.contactData === null}
                                onClickButton={handleClickMainInfoButton}
                                onNestedChange={handleNestedInputChange}
                            />
                        </div>
                    </div>
                    <div className="profile__companyInfo">
                        <CompanyInfoForm
                            data={store.userFormData}
                            isNull={store.originalUserFormData.company === null}
                            onClickButton={handleClickMainInfoButton}
                            onNestedChange={handleNestedInputChange}
                        />
                        <IndividualInfoForm
                            data={store.userFormData}
                            isNull={store.originalUserFormData.individual === null}
                            onClickButton={handleClickMainInfoButton}
                            onNestedChange={handleNestedInputChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
});

export default ProfilePage;