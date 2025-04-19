import React from "react";
import Popup from "../Popup";
import SearchForm from "../forms/SearchForm";
import ListItems from "../ListItems";
import TopBar from "../TopBar";
import { observer } from "mobx-react-lite";
import { mainStore } from "../../stores/MainSearchStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { userStore } from "../../stores/UserStore";
import { getCargoByFiltres } from "../../api/cargoService";
import { useLocation } from "react-router-dom";

const MainPage = observer(() => {

    const store = mainStore;
    const role = userStore.role;
    const location = useLocation();
    console.log(role);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await store.fetchListsLatest(); // Вызываем асинхронную функцию
    //     };

    //     fetchData();
    // }, [location.pathname]);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        store.setFormData(name, value, type, checked);
    };

    // useEffect(() => {
    //     document.body.style.overflow = store.isPopupOpen ? "hidden" : "";
    //     return () => {
    //         document.body.style.overflow = "";
    //     };
    // }, [store.isPopupOpen]);

    const handleContactsClick = (item) => {
        console.log(item.id)
        store.openPopup(item);
        console.log(store.popupContent)
    }

    const handleCargoClick = async () => {
        try {
            const res = await getCargoByFiltres(store.formData);
            console.log(res);
            store.setCargoSearchList(res);
        } catch (error) {
            console.log("Ошибка удаления груза: ", error);
        }
    }

    const getPageContent = () => {
        switch (store.page) {
            case 'MainSearchPage':
                return (
                    <>
                        <h2 className="searchPage__desc">Последние записи</h2>
                        <div className="searchPage__box">
                            <motion.div initial={{ x: -200, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="searchPage__box-motion">
                                <ListItems list={store.cargoListLatest} type="main" buttons={[{label: "Узнать подробности", onClick: handleContactsClick}]}/>
                            </motion.div>
                            <motion.div initial={{ x: 200, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="searchPage__box-motion">
                                <ListItems list={store.autoListLatest} type="main" buttons={[{label: "Узнать подробности", onClick: handleContactsClick}]} />
                            </motion.div>
                        </div>
                    </>
                )
            case 'SearchAutoPage':
                return (
                    <div className="searchPage__box">
                        <ListItems type="main" buttons={[{label: "Узнать подробности", onClick: handleContactsClick}]} />
                    </div>
                )
            case 'SearchCargoPage':
                return (
                    <div className="searchPage__box">
                        <ListItems type="main" list={store.cargoListSearch} buttons={[{label: "Узнать подробности", onClick: handleContactsClick}]} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="searchPage">
            <div className="container">
                <Popup isOpen={store.isPopupOpen} text={role && role !== '' ? store.popupContent : 'Для просмотра необходимо авторизоваться'} typePopup={role && role !== '' ? 'contacts' : ''} onClose={store.closePopup} />
                <div className="searchPage__menu">
                    <div className="searchPage__menu-topBar">
                        <TopBar />
                    </div>
                </div>
                <div className="searchPage__text">
                    <h2 className="searchPage__text-label">Транспорт для груза, груз для транспорта — <span>всё</span> у нас</h2>
                    <div className="searchPage__text-link">
                        <p className="searchPage__text-p">Наша платформа поможет вам быстро найти груз или транспорт. Просто, удобно и без лишних усилий.</p>
                        <a href="#search">Перейти к поиску</a>
                    </div>
                </div>
                <div className="searchPage__img">
                    <img src="/assets/img/truck.svg" alt="Truck" />
                </div>
                <div className="searchPage__formBox">
                    <div className="searchPage__formBox-header">
                        <motion.div
                            initial={
                                {
                                    opacity: 0,
                                    y: 100
                                }
                            }
                            whileInView={
                                {
                                    opacity: 1,
                                    y: 0
                                }
                            }
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        >
                            <h2 className="searchPage__formBox-text">Логистика</h2>
                        </motion.div>
                        <motion.div
                            initial={
                                {
                                    opacity: 0,
                                    y: 100
                                }
                            }
                            whileInView={
                                {
                                    opacity: 1,
                                    y: 0
                                }
                            }
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="searchPage__formBox-img">
                                <img src="/assets/img/box.svg" alt="Box" />
                            </div>
                        </motion.div>
                    </div>
                    <motion.div className="searchPage__formBox-motion"
                        initial={
                            {
                                scale: 0
                            }
                        }
                        whileInView={
                            {
                                scale: 1
                            }
                        }
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div className="searchPage__formBox-main" id="search">
                            <SearchForm
                                data={store.formData}
                                onChange={handleInputChange}
                                onClickAuto={() => store.page === 'MainSearchPage' ? store.setPage('SearchAutoPage') : store.page === 'SearchCargoPage' ? store.setPage('MainSearchPage') : console.log(store.formData)}
                                onClickCargo={() => store.page === 'MainSearchPage' ? store.setPage('SearchCargoPage') : store.page === 'SearchAutoPage' ? store.setPage('MainSearchPage') : handleCargoClick()}
                                page={store.page}
                            />
                        </div>
                    </motion.div>
                </div>
                {getPageContent()}
            </div>

        </div >
    )
});

export default MainPage;