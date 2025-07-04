import { makeAutoObservable } from "mobx";
import { getDriversByProfile } from "../api/driverService";
import { getOtherProfileData } from "../api/profileService";
import { getReviews } from "../api/reviewService";

class OtherProfileStore {
    profileData = {
        username: "",
        legalType: "",
        userRating: 0
    };

    comment = {
        ALL: [],
        MINE: []
    }

    pages = {
        ALL: { current: 1, total: 1 },
        MINE: { current: 1, total: 1 }
    };

    constructor() {
        makeAutoObservable(this)
    };

    async fetchProfileData(id) {
        try {
            const data = await getOtherProfileData(id);
            const { legalType, userRating } = data
            this.profileData = {
                'username': data.userData.username,
                'legalType': legalType,
                'userRating': userRating
            };
        } catch (error) {
            console.error("Ошибка при получении данных профиля:", error);
        }
    }

    async fetchReviewsList(profileId, reviewType, pageNumber) {
        try {
            const data = await getReviews(profileId, reviewType, pageNumber);
            this.comment[reviewType] = data.content;
            this.pages[reviewType] = {
                current: data.pageNumber,
                total: data.totalPages,
            };
        } catch (error) {
            console.error("Ошибка при получении списка отзывов:", error);
        };
    };

    getCurrentPage(reviewType) {
        return this.pages[reviewType]?.current ?? 1;
    }

    setCurrentPage(reviewType, page) {
        this.pages[reviewType] = { ...this.pages[reviewType], current: page };
    }

    getTotalPages(reviewType) {
        return this.pages[reviewType]?.total ?? 1;
    }

    reset = () => {
        this.profileData = {
            username: "",
            legalType: "",
            userRating: 0
        };
        this.comment = {
            ALL: [],
            MINE: []
        }
        this.pages = {
            ALL: { current: 1, total: 1 },
            MINE: { current: 1, total: 1 }
        };
    }
}

export const otherProfileStore = new OtherProfileStore();