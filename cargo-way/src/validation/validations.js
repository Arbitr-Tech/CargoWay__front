const validateRegistration = (data, agreement) => {
    const errors = {};
    if (!data.legalType) errors.legalType = "Тип пользователя обязателен";
    if (!data.role) errors.role = "Выберите одну из ролей";
    if (!data.username || !/^.{5,50}$/.test(data.username)) errors.username = "Логин должен состоять от 5 до 50 символов";
    if (!data.email || !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email)) errors.email = "Введите корректный email";
    if (!data.password || data.password.length < 8) errors.password = "Пароль должен быть не менее 8 символов";
    if (!agreement) errors.agreement = "Необходимо согласиться с условиями обработки данных";

    return errors;
};

const validateContactData = (data, isFirstTime = false) => {
    const errors = {};
    const { telegramLink, whatsappLink, phoneNumber } = data;

    if (isFirstTime) {
        if (!telegramLink) errors.telegramLink = "Ссылка на Telegram обязательна";
        if (!whatsappLink) errors.whatsappLink = "Ссылка на WhatsApp обязательна";
        if (!phoneNumber) errors.phoneNumber = "Номер телефона обязателен";
    }

    if (!/^(https?:\/\/)?(t\.me\/|@)[a-zA-Z0-9_]{5,}$/.test(telegramLink)) {
        errors.telegramLink = "Некорректная ссылка Telegram. Пример: @username или https://t.me/username";
    }

    if (whatsappLink && !/^(\+?\d{10,15})$/.test(whatsappLink)) {
        errors.whatsappLink = "Некорректная ссылка WhatsApp. Пример: 89991234567";
    }

    if (phoneNumber && !/^(\+?\d{10,15})$/.test(phoneNumber)) {
        errors.phoneNumber = "Введите номер телефона в формате 89991234567";
    }

    return errors;
}

const validateIndividaulData = (data, isFirstTime = false) => {
    const errors = {};
    const { fullName, passportNumber, issuedBy, issueDate, departmentCode, registrationAddress } = data;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isFirstTime) {
        if (!fullName) errors.fullName = "ФИО обязательно для заполнения";
        if (!passportNumber) errors.passportNumber = "Серия и номер паспорта обязательны для заполнения";
        if (!issuedBy) errors.issuedBy = "Укажите, кем выдан паспорт";
        if (!issueDate) errors.issueDate = "Укажите, когда был выдан паспорт";
        if (!departmentCode) errors.departmentCode = "Код подразделения обязателен дл заполнения";
        if (!registrationAddress) errors.registrationAddress = "Адрес регистрации обязателен для заполнения";
    }

    const cleanValuePassportNum = passportNumber.replace(/\s/g, '');

    if(!/^\d{10}$/.test(cleanValuePassportNum)) {
        errors.passportNum = "Серия и номер паспорта должны быть в формате: 1234 567891";
    }

    if (!/^\d{3}-\d{3}$/.test(departmentCode)) {
        errors.departmentCode = "Код подразделения должен быть в формате '000-000'";
    }

    const inputDate = new Date(issueDate);
    inputDate.setHours(0, 0, 0, 0);
    if (inputDate > today) errors.issueDate = "Дата выдачи паспорта не может быть позднее текущей даты";

    return errors;
}

const validateCompanyData = (data, isFirstTime = false) => {
    const errors = {};
    const { name, inn, ogrn, bic, correspondentAccount, registrationDate } = data;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Убираем время для точного сравнения дат

    if (isFirstTime) {
        if (!name) errors.name = "Название компании обязательно для заполнения";
        if (!inn) errors.inn = "ИНН обязателен для заполнения";
        if (!ogrn) errors.ogrn = "ОГРН обязателен для заполнения";
        if (!bic) errors.bic = "БИК обязателен для заполнения";
        if (!correspondentAccount) errors.correspondentAccount = "Корреспондентский счет обязателен для заполнения";
        if (!registrationDate) errors.registrationDate = "Укажите дату регистрации компании";
    }

    if (!/^\d{10}$/.test(inn)) {
        errors.inn = "ИНН должен содержать 10 цифр";
    }
    if (!/^\d{13}$/.test(ogrn)) {
        errors.ogrn = "ОГРН должен содержать 13 цифр";
    }
    if (!/^\d{9}$/.test(bic)) {
        errors.bic = "БИК должен содержать 9 цифр";
    }
    if (!/^\d{20}$/.test(correspondentAccount)) {
        errors.correspondentAccount = "Корреспондентский счет должен содержать 20 цифр";
    }

    const inputDate = new Date(registrationDate);
    inputDate.setHours(0, 0, 0, 0);
    if (inputDate > today) errors.registrationDate = "Дата регистрации не может быть позднее текущей даты";

    return errors;
}

export { validateRegistration, validateContactData, validateCompanyData, validateIndividaulData };