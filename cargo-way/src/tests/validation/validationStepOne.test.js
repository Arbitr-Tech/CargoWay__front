import { validateStepOne } from '../../validation/validations';

const dataCorrect = {
    userType: "individual",
    username: "userExample",
    email: "random.user@example.com",
    password: "SecurePass456!",
    role: "FORWARDER",
    agreement: true,
};

const dataIncorrect = {
    userType: "",
    username: "u",
    email: "random.user.com",
    password: "Secu",
    role: "",
    agreement: false
};

const dataWithLowerLimitValues = {
    userType: "individual",
    username: "userE",
    email: "random.user@example.co",
    password: "SecurePa",
    role: "FORWARDER",
    agreement: true
};

const dataWithUpperLimitValues = {
    userType: "individual",
    username: "userrrrrrruserrrrrrruserrrrrrruserrrrrrruserrrrrrr",
    email: "random.user@example.comm",
    password: "SecurePass456!",
    role: "FORWARDER",
    agreement: true
};

describe('Валидация данных первого этапа', () => {
    test('Валидация корректных данных первого этапа регистрации', () => {
        expect(validateStepOne(dataCorrect)).toEqual({});
    })
    
    test('Валидация некорректных данных первого этапа регистрации', () => {
        expect(validateStepOne(dataIncorrect)).toEqual({
            "agreement": "Необходимо согласиться с условиями обработки данных",
            "email": "Введите корректный email",
            "userType": "Тип пользователя обязателен",
            "password": "Пароль должен быть не менее 8 символов",
            "userRole": "Выберите одну из ролей",
            "username": "Логин должен состоять от 5 до 50 символов",
        });
    })

    test('Валидация корректных данных первого этапа регистрации с нижними предельными значениями', () => {
        expect(validateStepOne(dataWithLowerLimitValues)).toEqual({});
    })

    test('Валидация корректных данных первого этапа регистрации с верхними предельными значениями', () => {
        expect(validateStepOne(dataWithUpperLimitValues)).toEqual({});
    })
})