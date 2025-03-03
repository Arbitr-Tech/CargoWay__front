import { validateStepTwo } from '../../validation/validations';

const dataIndividualCorrect = {
    fullname: "Иванов Иван Иванович",
    passportNum: 111111,
    passportSeries: 1111,
    whoGive: "МВД",
    departmentCode: "000-000"
};

const dataIndividualIncorrect = {
    fullname: "",
    passportNum: "k111111",
    passportSeries: 111,
    whoGive: "",
    departmentCode: "000-0000"
};

const dataCompanyCorrect = {
    inn: 1111111111,
    ogrn: 1111111111111,
    bic: 111111111,
    correspondentAccount: '11111111111111111111',
};

const dataCompanyIncorrect = {
    inn: "11111111111111111111111",
    ogrn: "",
    bic: 11111111111,
    correspondentAccount: '0',
};

describe('Валидация данных второго этапа', () => {
    test('Валидация корректных данных второго этапа регистрации физ.лиц', () => {
        expect(validateStepTwo('individual', dataIndividualCorrect)).toEqual({});
    })

    test('Валидация корректных данных второго этапа регистрации юр.лиц', () => {
        expect(validateStepTwo('company', dataCompanyCorrect)).toEqual({});
    })

    test('Валидация некорректных данных второго этапа регистрации физ.лиц', () => {
        expect(validateStepTwo('individual', dataIndividualIncorrect)).toEqual({
            "departmentCode": "Код подразделения обязателен и должен быть в формате '000-000'",
            "fullname": "ФИО обязательно",
            "passportNum": "Номер паспорта должен содержать 6 цифр",
            "passportSeries": "Серия паспорта должна содержать 4 цифры",
            "whoGive": "Укажите, кем выдан паспорт",
        });
    })

    test('Валидация некорректных данных второго этапа регистрации юр.лиц', () => {
        expect(validateStepTwo('company', dataCompanyIncorrect)).toEqual({
            "bic": "БИК должен содержать 9 цифр",
            "correspondentAccount": "Корреспондентский счет должен содержать 20 цифр",
            "inn": "ИНН должен содержать 10 цифр",
            "ogrn": "ОГРН должен содержать 13 цифр",
        });
    })
})