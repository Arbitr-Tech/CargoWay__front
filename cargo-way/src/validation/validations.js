const validateRegistration = (data, agreement) => {
    const errors = {};
    if (!data.legalTypeDto) errors.legalTypeDto = "Тип пользователя обязателен";
    if (!data.role) errors.role = "Выберите одну из ролей";
    if (!data.username || !/^.{5,50}$/.test(data.username)) errors.username = "Логин должен состоять от 5 до 50 символов";
    if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) errors.email = "Введите корректный email";
    if (!data.password || data.password.length < 8) errors.password = "Пароль должен быть не менее 8 символов";
    if (!agreement) errors.agreement = "Необходимо согласиться с условиями обработки данных";

    return errors;
};

const validateStepTwo = (userType, data) => {
    const errors = {};
    if (userType === "individual") {
        if (!data.fullname) errors.fullname = "ФИО обязательно";
        if (!data.passportNum || !/^\d{6}$/.test(data.passportNum)) {
            errors.passportNum = "Номер паспорта должен содержать 6 цифр";
        }
        if (!data.passportSeries || !/^\d{4}$/.test(data.passportSeries)) {
            errors.passportSeries = "Серия паспорта должна содержать 4 цифры";
        }
        if (!data.whoGive) errors.whoGive = "Укажите, кем выдан паспорт";
        if (!data.departmentCode || !/^\d{3}-\d{3}$/.test(data.departmentCode)) {
            errors.departmentCode = "Код подразделения обязателен и должен быть в формате '000-000'";
        } 
    } else {
        if (!data.inn || !/^\d{10}$/.test(data.inn)) {
            errors.inn = "ИНН должен содержать 10 цифр";
        }
        if (!data.ogrn || !/^\d{13}$/.test(data.ogrn)) {
            errors.ogrn = "ОГРН должен содержать 13 цифр";
        }
        if (!data.bic || !/^\d{9}$/.test(data.bic)) {
            errors.bic = "БИК должен содержать 9 цифр";
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
        // if (data.driverLicenseNumber && !/^\d{10}$/.test(data.driverLicenseNumber)) {
        //     errors.driverLicenseNumber = "Номер водительских прав должен содержать 10 цифр";
        // }
        if (!data.phoneNumber || !/^\+?\d{11}$/.test(data.phoneNumber)) {
            console.log('Ошибка номера телефона', data.phoneNumber);
            errors.phoneNumber = "Некорректный номер телефона";
        }
        if (!data.photos || data.photos.length < 2) errors.photos = "Добавьте фото документов (основная страница и страница с пропиской)";
    } else {
        if (!data.name) errors.name = "Название компании обязательно";
        if (!data.registrationDate) errors.registrationDate = "Дата регистрации компании обязательна";
        // if (!data.dateRegInSystem) errors.dateRegInSystem = "Дата регистрации в системе обязательна";
    }

    return errors;
};

export {validateRegistration, validateStepTwo, validateStepThree};