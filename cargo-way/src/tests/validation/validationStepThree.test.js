import { validateStepThree } from '../../validation/validations';

const dataIndividualCorrect = {
    phoneNumber: "88888888888",
    photos: [
        { guid: "" },
        { guid: "" }
    ]
};

const dataIndividualIncorrect = {
    phoneNumber: "888888888888",
    photos: [
        { guid: "" }
    ]
};

const dataCompanyCorrect = {
    name: "asdf group",
    registrationDate: "2022-01-03"
};

const dataCompanyIncorrect = {
    name: "",
    registrationDate: ""
};

describe('Валидация данных третьего этапа', () => {
    test('Валидация корректных данных третьего этапа регистрации физ.лиц', () => {
        expect(validateStepThree('individual', dataIndividualCorrect)).toEqual({});
    })

    test('Валидация корректных данных третьего этапа регистрации юр.лиц', () => {
        expect(validateStepThree('company', dataCompanyCorrect)).toEqual({});
    })

    test('Валидация некорректных данных третьего этапа регистрации физ.лиц', () => {
        expect(validateStepThree('individual', dataIndividualIncorrect)).toEqual({
            "phoneNumber": "Некорректный номер телефона",
            "photos": "Добавьте фото документов (основная страница и страница с пропиской)"
        });
    })

    test('Валидация некорректных данных третьего этапа регистрации юр.лиц', () => {
        expect(validateStepThree('company', dataCompanyIncorrect)).toEqual({
            "name": "Название компании обязательно",
            "registrationDate": "Дата регистрации компании обязательна",
        });
    })
})