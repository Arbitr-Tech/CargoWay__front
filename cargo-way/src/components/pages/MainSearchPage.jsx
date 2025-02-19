import Popup from "../Popup";
import SearchForm from "../search/autoAndCargo/SearchForm";
import SearchListResults from "../search/autoAndCargo/SearchListResults";
import TopBar from "../TopBar";
import { observer } from "mobx-react-lite";
import { mainSearchStore } from "../../stores/MainSearchStore";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { userStore } from "../../stores/UserStore";
import { getCargoByFiltres } from "../../api/cargoService";
import { useLocation } from "react-router-dom";

const MainSearchPage = observer(() => {

    const store = mainSearchStore;
    const role = userStore.role;
    const location = useLocation();
    console.log(role);

    useEffect(() => {
        const fetchData = async () => {
            await store.fetchListsLatest(); // Вызываем асинхронную функцию
        };

        fetchData();
    }, [location.pathname]);

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;

        store.setFormData(name, value, type, checked);
    };

    useEffect(() => {
        document.body.style.overflow = store.isPopupOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [store.isPopupOpen]);

    const list = [
        { id: 1, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", bodyType: "тент", loadType: "задняя", unloadType: "ручная", photos: "photo_url_here" },
        { id: 2, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", bodyType: "тент", loadType: "задняя", unloadType: "ручная", photos: "photo_url_here" },
        { id: 3, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", bodyType: "тент", loadType: "задняя", unloadType: "ручная", photos: "photo_url_here" },
        { id: 4, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", bodyType: "тент", loadType: "задняя", unloadType: "ручная", photos: "photo_url_here" },
        { id: 5, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", bodyType: "тент", loadType: "задняя", unloadType: "ручная", photos: "photo_url_here" },
        { id: 6, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", bodyType: "тент", loadType: "задняя", unloadType: "ручная", photos: "photo_url_here" },
        { id: 7, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", bodyType: "тент", loadType: "задняя", unloadType: "ручная", photos: "photo_url_here" },
        { id: 8, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", bodyType: "тент", loadType: "задняя", unloadType: "ручная", photos: "photo_url_here" },
        { id: 9, name: "краска", description: "Грунтовка акриловая для стен и потолков", weight: 20, volume: 15, dimensions: { length: 30, width: 30, height: 40 }, route: { from: "Россия", to: "Турция" }, typePay: "Наличными", price: 12000, readyDate: "2025-01-18", bodyType: "тент", loadType: "задняя", unloadType: "ручная", photos: "photo_url_here" },
    ]
    const list2 = [
        { id: 1, brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transportNumber: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailerNumber: 54321 }, capacity: 25000, bodyType: "тентованный", loadType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here", typePay: "Наличными", price: 15000 },
        { id: 2, brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transportNumber: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailerNumber: 54321 }, capacity: 25000, bodyType: "тентованный", loadType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here", typePay: "Наличными", price: 15000 },
        { id: 3, brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transportNumber: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailerNumber: 54321 }, capacity: 25000, bodyType: "тентованный", loadType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here", typePay: "Наличными", price: 15000 },
        { id: 4, brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transportNumber: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailerNumber: 54321 }, capacity: 25000, bodyType: "тентованный", loadType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here", typePay: "Наличными", price: 15000 },
        { id: 5, brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transportNumber: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailerNumber: 54321 }, capacity: 25000, bodyType: "тентованный", loadType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here", typePay: "Наличными", price: 15000 },
        { id: 6, brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transportNumber: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailerNumber: 54321 }, capacity: 25000, bodyType: "тентованный", loadType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here", typePay: "Наличными", price: 15000 },
        { id: 7, brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transportNumber: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailerNumber: 54321 }, capacity: 25000, bodyType: "тентованный", loadType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here", typePay: "Наличными", price: 15000 },
        { id: 8, brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transportNumber: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailerNumber: 54321 }, capacity: 25000, bodyType: "тентованный", loadType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here", typePay: "Наличными", price: 15000 },
        { id: 9, brand: "Volvo", model: "FH16", year: 2021, dimensions: { length: 700, width: 250, height: 300 }, cargo_type: "краска", volume: 90, category: "седельный тягач", transportNumber: 12345, trailer_details: { dimensions: { length: 1350, width: 250, height: 400 }, cargo_type: "рефрижератор", volume: 120, trailerNumber: 54321 }, capacity: 25000, bodyType: "тентованный", loadType: "задняя", date: "2025-01-18", route: { from: "Москва", to: "Екатеринбург" }, autoPhoto: "photo_url_here", typePay: "Наличными", price: 15000 },
    ]

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
                                <SearchListResults list={store.cargoListLatest} typeButton='main' onClickOne={handleContactsClick} />
                            </motion.div>
                            <motion.div initial={{ x: 200, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="searchPage__box-motion">
                                <SearchListResults list={store.autoListLatest} typeButton='main' onClickOne={handleContactsClick} />
                            </motion.div>
                        </div>
                    </>
                )
            case 'SearchAutoPage':
                return (
                    <div className="searchPage__box">
                        <SearchListResults list={list} typeButton='main' onClickOne={handleContactsClick} />
                    </div>
                )
            case 'SearchCargoPage':
                return (
                    <div className="searchPage__box">
                        <SearchListResults list={store.cargoListSearch} typeButton='main' onClickOne={handleContactsClick} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="searchPage">
            <div className={`overlay ${store.isPopupOpen ? 'overlay--show' : ''} `}></div>
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

export default MainSearchPage;