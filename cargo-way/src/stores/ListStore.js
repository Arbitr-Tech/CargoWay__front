import { makeAutoObservable } from "mobx";
import { getCargoByStatus } from "../api/cargoService";

class ListStore {
    cargoLists = {
        DRAFT: [],
        COMPLETED: [],
        IN_PROGRESS: [],
    };

    pages = {
        DRAFT: { current: 0, total: 1 },
        COMPLETED: { current: 0, total: 1 },
        IN_PROGRESS: { current: 0, total: 1 },
    };

    constructor() {
        makeAutoObservable(this);
    }

    async fetchCargoList(status, pageNumber) {
        try {
            const dataCargo = await getCargoByStatus(status, pageNumber);
            console.log(dataCargo.content)
            this.cargoLists[status] = dataCargo.content;
            this.pages[status] = {
                current: dataCargo.pageNumber,
                total: dataCargo.totalPages,
            };
        } catch (error) {
            console.error("Ошибка при получении списка грузов:", error);
        }
    }

    getCurrentPage(status) {
        return this.pages[status]?.current ?? 0;
    }

    setCurrentPage(status, page) {
        this.pages[status] = {...this.pages[status], current: page};
    }

    getTotalPages(status) {
        return this.pages[status]?.total ?? 1;
    }
}

export const listStore = new ListStore();
