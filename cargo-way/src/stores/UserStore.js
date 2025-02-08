import { makeAutoObservable } from "mobx";

class UserStore {
    role = localStorage.getItem('role') || '';

    constructor() {
        makeAutoObservable(this);
    }

    setRole(newRole) {
        if (newRole === '') {
            localStorage.removeItem('role');
        } else {
            localStorage.setItem('role', newRole);
        }
        this.role = newRole;
    }
}

export const userStore = new UserStore();