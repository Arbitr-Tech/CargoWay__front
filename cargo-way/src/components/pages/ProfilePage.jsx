import { useEffect } from "react";
import { userStore } from "../../stores/UserStore";
import CompanyInfoForm from "../forms/profileForms/CompanyInfoForm";
import ContactInfoForm from "../forms/profileForms/ContactInfoForm";
import MainInfoForm from "../forms/profileForms/MainInfoForm";
import TopBar from "../TopBar";
import { observer } from "mobx-react-lite";
import { getProfileData, updateProfileData } from "../../api/profileService";
import { useLocation } from "react-router-dom";
import { toJS } from "mobx";
import { toast } from "react-toastify";

const ProfilePage = observer(() => {
    const store = userStore;
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getProfileData();
                console.log(data)
                store.setUserFormData(data);
            } catch (error) {
                console.log(error);
                toast.error('Произошла ошибка, попробуйте позже')
            }

        };

        fetchData();
    }, []);

    const handleInputChange = ({ target: { name, value } }) => {
        store.setFieldsData(name, value);
    };

    const handleNestedInputChange = ({ target: { name, dataset, value } }) => {
        store.setNestedFieldsData(name, dataset.path, value);
    };

    const handleClickMainInfoButton = async () => {
        try {
            const updatedData = store.getUpdatedFields();
            console.log(updatedData);
            // const dataAfterParse = {
            //     company: updatedData.company ? toJS(updatedData.company) : undefined,
            //     contactData: updatedData.contactData ? toJS(updatedData.contactData) : undefined,
            // };

            // const cleanData = Object.fromEntries(
            //     Object.entries(dataAfterParse).filter(([_, v]) => v !== undefined)
            // );

            // console.log(cleanData);
            await updateProfileData(toJS(updatedData));
        } catch (error) {
            console.log('Ошибка отправки изменений: ', error);
        }
        // console.log(store.userFormData);
    }

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
                                <p className="profile__data-item">Роль: <span>{store.originalUserFormData.userData?.role || ''}</span></p>
                            </div>
                        </div>
                        <div className="profile__userInfo-contact">
                            <ContactInfoForm
                                data={store.userFormData}
                                isNull={store.userFormData.contactData === null || Object.keys(store.userFormData.contactData).length === 0}
                                onClickButton={handleClickMainInfoButton}
                                onNestedChange={handleNestedInputChange}
                            />
                        </div>
                    </div>
                    <div className="profile__companyInfo">
                        <CompanyInfoForm
                            data={store.userFormData}
                            isNull={store.userFormData.company === null || Object.keys(store.userFormData.company).length === 0}
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