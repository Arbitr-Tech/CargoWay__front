import { createMemoryHistory } from "history";
import { autorizationStore } from "../stores/AutorizationStore";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toast } from "react-toastify";
import { renderWithRouter } from "./helpers/renderWithRouter";
import { userStore } from "../stores/UserStore";
import { getProfileData } from "../api/profileService";

jest.mock("react-toastify", () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn()
    }
}));

jest.mock("../api/profileService", () => ({
    getProfileData: jest.fn(),
}));

describe("Авторизация", () => {
    let history;

    beforeEach(() => {
        jest.restoreAllMocks();
        autorizationStore.reset();
        userStore.setRole('');
        localStorage.removeItem('role');
        history = createMemoryHistory();
    });

    const fillElements = async (email, password) => {
        const inputEmail = screen.getByPlaceholderText(/почта/i);
        const inputPassword = screen.getByPlaceholderText(/пароль/i);
        const button = screen.getByRole("button", { name: /войти/i });

        await userEvent.type(inputEmail, email);
        await userEvent.type(inputPassword, password);
        await userEvent.click(button);
    };

    test("Успешная авторизация", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ role: "CUSTOMER" }),
            })
        );

        getProfileData.mockResolvedValue({
            userData: {role: "CUSTOMER"}
        });

        render(renderWithRouter(null, '/auth'));

        await fillElements("user@example.com", "SecurePass123");

        expect(userStore.role).toBe("CUSTOMER");
        expect(toast.success).toHaveBeenCalledWith("Успешный вход");
        expect(history.location.pathname).toBe('/');
    });

    test("Ошибка авторизации (неверные данные)", async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                json: () => Promise.resolve({ message: "Неверный логин или пароль" }),
            })
        );

        render(renderWithRouter(null, '/auth'));

        await fillElements("wrongUser@example.com", "wrongPass");

        expect(userStore.role).toBe("");
        expect(toast.error).toHaveBeenCalledWith("Неверный логин или пароль");
    });
});
