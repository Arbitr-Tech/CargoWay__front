import { observer } from "mobx-react-lite";
import SearchForm from "../../forms/SearchForm";
import { motion } from "framer-motion";
import ListItems from "../../ListItems";
import { searchStore } from "../../../stores/SearchStore";
import { listStore } from "../../../stores/ListStore";
import { useEffect, useState } from "react";
import { toJS } from "mobx";
import Pagination from "../../Pagination";
import Popup from "../../Popup";
import { toast } from "react-toastify";

const SearchCargoPage = observer(() => {

    const store = searchStore;
    const [isLoading, setIsLoading] = useState(false);
    const role = localStorage.getItem('role');
    const [popupData, setPopupData] = useState({ isOpen: false, text: "", type: "", item: null });
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        return () => {
            store.reset();
        };
    }, [store]);

    useEffect(() => {
        if (!hasSearched) {
            const loadInitialData = async () => {
                try {
                    setIsLoading(true);
                    await listStore.fetchCargoListOfLatest();
                } catch (error) {
                    toast.error("Ошибка загрузки данных");
                    console.error("Ошибка:", error);
                } finally {
                    setIsLoading(false);
                }
            };
            loadInitialData();
        }
    }, [hasSearched]);


    const handleInputChange = ({ target: { name, value, valueAsNumber, type } }) => {
        if (type === 'number') {
            const val = Math.max(0, valueAsNumber || 0);
            store.setFormData(name, val);
        } else {
            store.setFormData(name, value);
        }
    };

    const handleNestedInputChange = ({ target: { name, dataset, value } }) => {
        store.setNestedFormData(name, dataset.path, value);
    };

    const handleSearchClick = () => {
        if (role === null) {
            openPopup("Для использования поиска необходимо авторизоваться", "auth");
            return;
        }
        handleSearch(1);
    };

    const handleDetailsClick = () => {
        if (role === null) {
            openPopup("Необходимо авторизоваться, чтобы узнать детали заказа", "auth");
            return;
        }
        // handleSearch(1);
    };

    const handleSearch = async (page) => {
        try {
            setIsLoading(true);
            const data = toJS(store.getFilledData());
            listStore.setCurrentPage("FILTERS", page);
            await listStore.fetchCargoListByFilters(data, page);
            setHasSearched(true);
        } catch (error) {
            toast.error("Ошибка поиска, попробуйте позже")
            console.error("Ошибка:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const openPopup = (text, type, item) => {
        setPopupData({ isOpen: true, text, type, item });
    };

    const closePopup = () => {
        setPopupData({ isOpen: false, text: "", type: "", item: null });
    };

    const showSearchResults = hasSearched && listStore.cargoLists.FILTERS.length > 0;
    const showInitialList = !hasSearched && listStore.cargoLists.LATEST.length > 0;
    const showEmptyState = !isLoading && !showSearchResults && !showInitialList;


    return (
        <div className="searchPage">
            <Popup
                isOpen={popupData.isOpen}
                text={popupData.text}
                typePopup={popupData.type}
                onClose={closePopup}
            />
            <motion.div className="searchPage__formBox"
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
                <div className="searchPage__formBox-form">
                    <SearchForm
                        data={store.formData}
                        onChange={handleInputChange}
                        onNestedChange={handleNestedInputChange}
                        onReset={() => {
                            store.reset();
                            setHasSearched(false);
                        }}
                        onSearch={handleSearchClick}
                    />
                </div>
            </motion.div>
            {isLoading ? (
                <div className="searchPage__empty">
                    <p className="searchPage__subtitle">Загрузка списка...</p>
                </div>
            ) : showSearchResults ? (
                <div className="searchPage__list">
                    <ListItems type="main" list={listStore.cargoLists.FILTERS} buttons={[{ label: "Узнать подробности", onClick: handleDetailsClick }]} />
                    <Pagination
                        currentPage={listStore.getCurrentPage("FILTERS")}
                        totalPages={listStore.getTotalPages("FILTERS")}
                        onPageChange={(page) => handleSearch(page)}
                    />
                </div>
            ) : showInitialList ? (
                <div className="searchPage__list">
                    <ListItems
                        type="main"
                        list={listStore.cargoLists.LATEST}
                        buttons={[{ label: "Узнать подробности", onClick: handleDetailsClick }]}
                    />
                </div>
            ) : showEmptyState ? (
                <div className="searchPage__empty">
                    <p className="searchPage__subtitle">Ничего не найдено</p>
                </div>
            ) : null
            }
        </div >
    )
});

export default SearchCargoPage;