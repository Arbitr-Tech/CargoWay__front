import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { registrationStore } from '../../stores/RegistrationStore';
import { renderWithRouter } from '../helpers/renderWithRouter';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true, // Обязательно указываем, что запрос прошел успешно
        json: () => Promise.resolve({ access_token: 'aass' }), // Имитируем ответ сервера
    })
);



describe('Регистрация физ.лица', () => {
    let history;

    beforeEach(() => {
        jest.restoreAllMocks();
        registrationStore.submitRegistration();
        localStorage.clear();
        history = createMemoryHistory()
    });

    const fillFirstStep = async () => {
        const inputUserType = screen.getByRole('radio', { name: /Физическое лицо/i });
        const inputUserRole = screen.getByRole('radio', { name: /Перевозчик/i });
        const inputUserName = screen.getByPlaceholderText(/логин/i);
        const inputPassword = screen.getByPlaceholderText(/пароль/i);
        const inputEmail = screen.getByPlaceholderText(/почта/i);
        const inputAgreement = screen.getByLabelText(/Соглашаюсь с условиями обработки данных/i);
        const button = screen.getByRole('button', { name: /Далее/i });

        await userEvent.click(inputUserType);
        await userEvent.click(inputUserRole);
        await userEvent.type(inputUserName, 'testuser');
        await userEvent.type(inputPassword, 'password123');
        await userEvent.type(inputEmail, 'test@example.com');
        await userEvent.click(inputAgreement);
        await userEvent.click(button);
    };

    const fillSecondStep = async () => {
        const inputFullName = screen.getByPlaceholderText(/фио/i);
        const inputPassportNum = screen.getByPlaceholderText(/номер паспорта/i);
        const inputPassportSeries = screen.getByPlaceholderText(/серия паспорта/i);
        const inputWhoGive = screen.getByPlaceholderText(/кем выдан паспорт/i);
        const inputDepartmentCode = screen.getByPlaceholderText(/код подразделения/i);
        const button = screen.getByRole('button', { name: /Далее/i });

        await userEvent.type(inputFullName, 'Иванов Иван Иванович');
        await userEvent.type(inputPassportNum, '111111');
        await userEvent.type(inputPassportSeries, '1111');
        await userEvent.type(inputWhoGive, 'МВД ПО РО');
        await userEvent.type(inputDepartmentCode, '000-000');
        await userEvent.click(button);
    };

    const fillThirdStep = async () => {
        const inputPhoneNumber = screen.getByPlaceholderText(/номер телефона/i);
        const button = screen.getByRole('button', { name: /отправить/i });

        await userEvent.type(inputPhoneNumber, '88888888888');

        const updatedPhotos = [{ guid: 'some-guid' }, { guid: 'some-other-guid' }];
        registrationStore.setRegistrationNestedFormData('individualData', {
            ...registrationStore.registrationFormData.individualData,
            photos: updatedPhotos,
        });

        await userEvent.click(button);
    };


    test('Валидация на первом этапе регистрации при вводе некорректных данных физ.лица', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(
            renderWithRouter(null, '/reg')
        );

        const inputUserName = screen.getByPlaceholderText(/логин/i);
        const inputPassword = screen.getByPlaceholderText(/пароль/i);
        const inputEmail = screen.getByPlaceholderText(/почта/i);
        const button = screen.getByRole('button', { name: /Далее/i });

        await userEvent.type(inputUserName, 'test');
        await userEvent.type(inputPassword, 'pass');
        await userEvent.type(inputEmail, 'testexample.m');
        await userEvent.click(button);


        expect(window.alert).toBeCalledWith(
            "Тип пользователя обязателен\n" +
            "Выберите одну из ролей\n" +
            "Логин должен состоять от 5 до 50 символов\n" +
            "Введите корректный email\n" +
            "Пароль должен быть не менее 8 символов\n" +
            "Необходимо согласиться с условиями обработки данных"
        );
        expect(registrationStore.registrationStep).toBe(1);
    });

    test('Валидация на первом этапе регистрации при вводе корректных данных физ.лица', async () => {
        render(
            renderWithRouter(null, '/reg')
        );

        await fillFirstStep();

        expect(registrationStore.registrationStep).toBe(2);
    });

    test('Валидация на втором этапе при вводе некорректных данных', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(renderWithRouter(null, '/reg'));

        await fillFirstStep();

        const inputPassportNum = screen.getByPlaceholderText(/номер паспорта/i);
        const inputPassportSeries = screen.getByPlaceholderText(/серия паспорта/i);
        const inputDepartmentCode = screen.getByPlaceholderText(/код подразделения/i);
        const button = screen.getByRole('button', { name: /Далее/i });

        await userEvent.type(inputPassportNum, '1');
        await userEvent.type(inputPassportSeries, '11');
        await userEvent.type(inputDepartmentCode, '0-000');
        await userEvent.click(button);

        expect(window.alert).toBeCalledWith(
            'ФИО обязательно\n' +
            'Номер паспорта должен содержать 6 цифр\n' +
            'Серия паспорта должна содержать 4 цифры\n' +
            'Укажите, кем выдан паспорт\n' +
            'Код подразделения обязателен и должен быть в формате \'000-000\''
        );
        expect(registrationStore.registrationStep).toBe(2);
    });

    test('Валидация на втором этапе регистрации при вводе корректных данных физ.лица', async () => {
        render(
            renderWithRouter(null, '/reg')
        );

        await fillFirstStep();
        await fillSecondStep();

        expect(registrationStore.registrationStep).toBe(3);
    });

    test('Валидация на третьем этапе при вводе некорректных данных', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(renderWithRouter(null, '/reg'));

        await fillFirstStep();
        await fillSecondStep();

        const inputPhoneNumber = screen.getByPlaceholderText(/номер телефона/i);
        const button = screen.getByRole('button', { name: /отправить/i });

        await userEvent.type(inputPhoneNumber, '899999999999999');
        await userEvent.click(button);

        expect(window.alert).toBeCalledWith(
            'Некорректный номер телефона\n'+
            'Добавьте фото документов (основная страница и страница с пропиской)'
        );
        expect(registrationStore.registrationStep).toBe(3);
    });

    test('Валидация на третьем этапе регистрации при вводе корректных данных физ.лица', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(renderWithRouter(null, '/reg'));

        await fillFirstStep();
        await fillSecondStep();
        await fillThirdStep();

        expect(window.alert).not.toBeCalled();
    });

    test('Успешная регистрация физ.лица', async () => {
        render(
            renderWithRouter(null, '/reg')
        );

        await fillFirstStep();
        await fillSecondStep();
        await fillThirdStep();

        expect(global.fetch).toBeCalled();

        expect(localStorage.getItem('accessToken')).toBe('aass');
        expect(localStorage.getItem('role')).toBe('CARRIER');

        expect(history.location.pathname).toBe('/');
    })

});
