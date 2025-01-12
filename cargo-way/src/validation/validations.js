const validateStepOne = (data) => {
    const errors = {};
    if (!data.userType) errors.userType = "Тип пользователя обязателен";
    if (!data.login) errors.login = "Логин обязателен";
    if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) errors.email = "Введите корректный email";
    if (!data.password || data.password.length < 6) errors.password = "Пароль должен быть не менее 6 символов";
    if (!data.agreement) errors.agreement = "Необходимо согласиться с условиями обработки данных";

    return errors;
};

const validateStepTwo = (userType, data) => {
    const errors = {};
    if (userType === "individual") {
        if (!data.fullName) errors.fullName = "ФИО обязательно";
        if (!data.passportSeriesNumber || !/^\d{10}$/.test(data.passportSeriesNumber)) {
            errors.passportSeriesNumber = "Серия и номер паспорта должны содержать 10 цифр";
        }
        if (!data.dateGet) errors.dateGet = "Дата выдачи паспорта обязательна";
        if (!data.passportIssuedBy) errors.passportIssuedBy = "Укажите, кем выдан паспорт";
        if (!data.placeOfBirth) errors.placeOfBirth = "Место рождения обязательно";
    } else {
        if (!data.inn || !/^\d{10}$/.test(data.inn)) {
            errors.inn = "ИНН должен содержать 10 цифр";
        }
        if (!data.ogrn || !/^\d{13}$/.test(data.ogrn)) {
            errors.ogrn = "ОГРН должен содержать 13 цифр";
        }
        if (!data.bik || !/^\d{9}$/.test(data.bik)) {
            errors.bik = "БИК должен содержать 9 цифр";
        }
        if (!data.correspondentAccount || !/^\d{20}$/.test(data.correspondentAccount)) {
            errors.correspondentAccount = "Корреспондентский счет должен содержать 20 цифр";
        }
    }

    return errors;
};

const validateStepThree = (userType, data) => {
    const errors = {};
    if (userType === "individual") {
        if (data.driverLicenseNumber && !/^\d{10}$/.test(data.driverLicenseNumber)) {
            errors.driverLicenseNumber = "Номер водительских прав должен содержать 10 цифр";
        }
        if (!data.phoneNumber || !/^\+?\d{11}$/.test(data.phoneNumber)) {
            errors.phoneNumber = "Некорректный номер телефона";
        }
        if (!data.identityDocuments) errors.identityDocuments = "Добавьте скан-копии документов";
    } else {
        if (!data.companyName) errors.companyName = "Название компании обязательно";
        if (!data.dateRegCompany) errors.dateRegCompany = "Дата регистрации компании обязательна";
        if (!data.dateRegInSystem) errors.dateRegInSystem = "Дата регистрации в системе обязательна";
    }

    return errors;
};

export {validateStepOne, validateStepTwo, validateStepThree};