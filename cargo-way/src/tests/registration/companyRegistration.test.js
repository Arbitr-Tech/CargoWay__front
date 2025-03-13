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
        const inputUserType = screen.getByRole('radio', { name: /юридическое лицо/i });
        const inputUserRole = screen.getByRole('radio', { name: /перевозчик/i });
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
        const inputInn = screen.getByPlaceholderText(/инн/i);
        const inputOgrn = screen.getByPlaceholderText(/огрн/i);
        const inputBic = screen.getByPlaceholderText(/бик/i);
        const inputCorrespondentAccount = screen.getByPlaceholderText(/Корреспондентский сче/i);
        const button = screen.getByRole('button', { name: /Далее/i });

        await userEvent.type(inputInn, '1111111111');
        await userEvent.type(inputOgrn, '1111111111111');
        await userEvent.type(inputBic, '111111111');
        await userEvent.type(inputCorrespondentAccount, '11111111111111111111');
        await userEvent.click(button);
    };

    const fillThirdStep = async () => {
        const inputName = screen.getByPlaceholderText(/название компании/i);
        const inputDate = screen.getByLabelText(/Дата регистрации компании:/i);
        const button = screen.getByRole('button', { name: /отправить/i });

        await userEvent.type(inputName, 'Гриб');
        await userEvent.type(inputDate, '2020-01-14');
        await userEvent.click(button);
    };

    test('Валидация на втором этапе при вводе некорректных данных юр.лица', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(renderWithRouter(null, '/reg'));

        await fillFirstStep();

        const inputInn = screen.getByPlaceholderText(/инн/i);
        const inputOgrn = screen.getByPlaceholderText(/огрн/i);
        const inputBic = screen.getByPlaceholderText(/бик/i);
        const inputCorrespondentAccount = screen.getByPlaceholderText(/Корреспондентский сче/i);
        const button = screen.getByRole('button', { name: /Далее/i });

        await userEvent.type(inputInn, '11111111');
        await userEvent.type(inputOgrn, '11');
        await userEvent.type(inputBic, 'm,');
        await userEvent.type(inputCorrespondentAccount, '1111111');
        await userEvent.click(button);

        expect(window.alert).toBeCalledWith(
            'ИНН должен содержать 10 цифр\n' +
            'ОГРН должен содержать 13 цифр\n' +
            'БИК должен содержать 9 цифр\n' +
            'Корреспондентский счет должен содержать 20 цифр'
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

    test('Валидация на третьем этапе при вводе некорректных данных юр.лица', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(renderWithRouter(null, '/reg'));

        await fillFirstStep();
        await fillSecondStep();

        const button = screen.getByRole('button', { name: /отправить/i });
        await userEvent.click(button);

        expect(window.alert).toBeCalledWith(
            'Название компании обязательно\n'+
            'Дата регистрации компании обязательна'
        );
        expect(registrationStore.registrationStep).toBe(3);
    });

    test('Валидация на третьем этапе регистрации при вводе корректных данных юр.лица', async () => {
        jest.spyOn(window, 'alert').mockImplementation(() => { });

        render(renderWithRouter(null, '/reg'));

        await fillFirstStep();
        await fillSecondStep();
        await fillThirdStep();

        expect(window.alert).not.toBeCalled();
    });

    test('Успешная регистрация юр.лица', async () => {
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
