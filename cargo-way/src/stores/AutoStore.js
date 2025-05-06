import { makeAutoObservable } from "mobx";
import { getTrailerByProfile } from "../api/trailerService";
import { getTransportsByProfile } from "../api/autoService";

class AutoStore {

    autoEmbeddedTrailer = false;
    autoAdditionalTrailers = false;

    autoFormData = {
        driverId: "",
        brand: "",
        model: "",
        manufactureYear: 0,
        transportNumber: "",
        embeddedTrailerDetails: {
            liftingCapacity: 0,
            bodyType: "",
            loadType: "",
            unloadType: "",
            length: 0,
            width: 0,
            height: 0,
            volume: 0
        },
        trailersIds: [],
        // photos: []
    };

    autoFormDataServer = {
        brand: "",
        model: "",
        manufactureYear: 0,
        transportNumber: "",
        embeddedTrailer: {},
        trailers: [],
        driver: {},
    }

    transportList = [];
    page = { current: 1, total: 1 };

    originalTransportFormData = {};
    editingTransportId = null;

    constructor() {
        makeAutoObservable(this)
    };

    setFormData = (name, value) => {
        this.autoFormData = { ...this.autoFormData, [name]: value }
    }

    setNestedFormData = (formName, secondName, newData) => {
        this.autoFormData = {
            ...this.autoFormData,
            [formName]: {
                ...this.autoFormData[formName],
                [secondName]: newData
            }
        };
    };

    toggleAutoEmbeddedTrailer = () => {
        this.autoEmbeddedTrailer = !this.autoEmbeddedTrailer;
    };

    toggleAutoAdditionalTrailers = () => {
        this.autoAdditionalTrailers = !this.autoAdditionalTrailers;
    };

    getFormData = () => {
        let clonedForm = { ...this.autoFormData };
        if (!this.autoEmbeddedTrailer) {
            delete clonedForm['embeddedTrailerDetails'];
        }
        if (!this.autoAdditionalTrailers) {
            delete clonedForm['trailersIds'];
        }
        return clonedForm;
    };

    async fetchTransportList(pageNumber) {
        try {
            const dataTransport = await getTransportsByProfile(pageNumber);
            console.log(dataTransport.content);
            this.transportList = dataTransport.content;
            this.page = { current: dataTransport.pageNumber, total: dataTransport.totalPages };
        } catch (error) {
            console.error("Ошибка при получении списка грузов:", error);
        }
    };

    getCurrentPage() {
        return this.page?.current ?? 1;
    }

    setCurrentPage(page) {
        this.page = { ...this.page, current: page };
    }

    getTotalPages() {
        return this.page?.total ?? 1;
    }

    transformServerToClientData = (serverData) => {
        if(serverData.trailers.length !== 0) {
            this.autoAdditionalTrailers = true;
        }
        if(Object.keys(serverData.embeddedTrailer).length !== 0) {
            this.autoEmbeddedTrailer = true;
        }

        return {
            driverId: serverData.driver?.id || "",
            brand: serverData.brand || "",
            model: serverData.model || "",
            manufactureYear: serverData.manufactureYear || 0,
            transportNumber: serverData.transportNumber || "",
            embeddedTrailerDetails: {
                liftingCapacity: serverData.embeddedTrailer?.liftingCapacity || 0,
                bodyType: serverData.embeddedTrailer?.bodyType || "",
                loadType: serverData.embeddedTrailer?.loadType || "",
                unloadType: serverData.embeddedTrailer?.unloadType || "",
                length: serverData.embeddedTrailer?.length || 0,
                width: serverData.embeddedTrailer?.width || 0,
                height: serverData.embeddedTrailer?.height || 0,
                volume: serverData.embeddedTrailer?.volume || 0
            },
            trailersIds: serverData.trailers?.map(trailer => trailer.id) || [],
            // photos: serverData.photos || []
        };
    };

    setTransportFormDataFromServer = (id, data) => {
        this.editingTransportId = id;
        this.autoFormData = this.transformServerToClientData(data);
        this.originalTransportFormData = this.autoFormData;
    }

    getUpdatedFields = () => {
        const updatedFields = {};

        for (const key in this.autoFormData) {
            if (JSON.stringify(this.autoFormData[key]) !== JSON.stringify(this.originalTransportFormData[key])) {
                updatedFields[key] = this.autoFormData[key];
            }
        }

        // return this.getFormData(updatedFields);
        return updatedFields;
    }


    resetFormData = () => {
        this.autoFormData = {
            driverId: '',
            brand: "",
            model: "",
            manufactureYear: 0,
            transportNumber: "",
            embeddedTrailerDetails: {
                liftingCapacity: 0,
                bodyType: "",
                loadType: "",
                unloadType: "",
                length: 0,
                width: 0,
                height: 0,
                volume: 0
            },
            trailersIds: []
            // photos: []
        };
        this.autoEmbeddedTrailer = false;
        this.autoAdditionalTrailers = false;
    }

};

export const autoStore = new AutoStore();