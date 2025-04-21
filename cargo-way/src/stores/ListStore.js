import { makeAutoObservable } from "mobx";
import { getCargoByCategory } from "../api/cargoService";

class ListStore {
    cargoLists = {
        INTERNAL: [],
        EXTERNAL: [],
        HISTORY: [],
    };

    pages = {
        INTERNAL: { current: 0, total: 1 },
        EXTERNAL: { current: 0, total: 1 },
        HISTORY: { current: 0, total: 1 },
    };

    constructor() {
        makeAutoObservable(this);
    }

    async fetchCargoList(category, pageNumber) {
        try {
            const dataCargo = await getCargoByCategory(category, pageNumber);
            console.log(dataCargo.content);
            this.cargoLists[category] = dataCargo.content;
            this.pages[category] = {
                current: dataCargo.pageNumber,
                total: dataCargo.totalPages,
            };
        } catch (error) {
            console.error("Ошибка при получении списка грузов:", error);
        }
    }

    getCurrentPage(category) {
        return this.pages[category]?.current ?? 0;
    }

    setCurrentPage(category, page) {
        this.pages[category] = {...this.pages[category], current: page};
    }

    getTotalPages(category) {
        return this.pages[category]?.total ?? 1;
    }
}

export const listStore = new ListStore();
