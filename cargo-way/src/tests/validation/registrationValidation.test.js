import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { registrationStore } from '../../stores/RegistrationStore'; 
import { renderWithRouter } from '../helpers/renderWithRouter';
import '@testing-library/jest-dom';

describe('Интеграционный тест регистрации', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Сброс всех моков перед каждым тестом
    });

    test('Первый этап регистрации при вводе некорректных данных физ.лица', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(
                renderWithRouter(null, '/reg')
        );

        const button = screen.getByRole('button', { name: /Далее/i });

        await userEvent.click(button);


        expect(window.alert).toHaveBeenCalled();
        expect(registrationStore.registrationStep).toBe(1);
    });

    test('Первый этап регистрации при вводе корректных данных физ.лица', async () => {
        render(
                renderWithRouter(null, '/reg')
        );

        // Находим элементы формы
        const inputUserType = screen.getByRole('radio', { name: /Физическое лицо/i });
        const inputUserRole = screen.getByRole('radio', { name: /Перевозчик/i });
        const inputUserName = screen.getByPlaceholderText(/логин/i);
        const inputPassword = screen.getByPlaceholderText(/пароль/i);
        const inputEmail = screen.getByPlaceholderText(/почта/i);
        const inputAgreement = screen.getByLabelText(/Соглашаюсь с условиями обработки данных/i);
        const button = screen.getByRole('button', { name: /Далее/i });

        // Заполняем данные
        await userEvent.click(inputUserType);
        await userEvent.click(inputUserRole);
        await userEvent.type(inputUserName, 'testuser');
        await userEvent.type(inputPassword, 'password123');
        await userEvent.type(inputEmail, 'test@example.com');
        await userEvent.click(inputAgreement);
        await userEvent.click(button);

        // Проверяем, что данные реально изменились в MobX-сторе
        expect(registrationStore.registrationFormData.userType).toBe('individual');
        expect(registrationStore.registrationFormData.role).toBe('CARRIER');
        expect(registrationStore.registrationFormData.username).toBe('testuser');
        expect(registrationStore.registrationFormData.password).toBe('password123');
        expect(registrationStore.registrationFormData.email).toBe('test@example.com');
        expect(registrationStore.registrationFormData.agreement).toBe(true);

        // Проверяем, что шаг регистрации изменился
        expect(registrationStore.registrationStep).toBe(2);
    });
});
