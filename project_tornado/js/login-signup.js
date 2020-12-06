"use strict";

const logRegUI = {
    wrapper: document.createElement("div"),
    loginWindow: document.createElement("div"),
    authorizationLabel: document.createElement("h3"),
    loginForm: document.createElement("form"),
    logName: document.createElement("input"),
    logPassword: document.createElement("input"),
    logSubmitBtn: document.createElement("button"),
    registrationLink: document.createElement("a"),
    signUpWindow: document.createElement("div"),
    signUpForm: document.createElement("form"),
    signupLabel: document.createElement("h3"),
    regName: document.createElement("input"),
    regLogin: document.createElement("input"),
    regPassword: document.createElement("input"),
    regConfirmPassword: document.createElement("input"),
    regSubmitBtn: document.createElement("button"),
    closeWindowMark: document.createElement("p"),
    nameRegExp: /^(([a-z]+\s?){1,3})$/i,
    loginRegExp: /^(?=.*[a-z])[a-z0-9]{3,12}$/i,
    passwordRegExp: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,20}/i,
    allFieldsValid: false,
    loggedUserName: "",
    validateAllRegFields() {
        this.validateName();
        this.validateLogin();
        this.validatePassword();
        this.validateConfirmPassword();
    },
    createLoginWindow() {
        if(this.signUpForm) this.signUpWindow.remove();
        this.authorizationLabel.textContent = "Авторизация:";
        this.wrapper.className = "window-wrapper";
        this.loginWindow.className = "login-area";
        this.loginForm.className = "lr-form";
        this.logName.placeholder = "Имя пользователя";
        this.logName.autocomplete = "username";
        this.logName.name = "log-login";
        this.logPassword.placeholder = "Пароль";
        this.logPassword.name = "log-password";
        this.logSubmitBtn.textContent = "Войти";
        this.registrationLink.textContent = "Нет записи? Нажмите сюда."
        this.logPassword.type = "password";
        this.logPassword.autocomplete = "current-password";
        this.closeWindowMark.innerHTML = "&#10006;";
        this.closeWindowMark.id = "mark-close";
        document.body.append(this.wrapper);
        this.wrapper.append(this.loginWindow);
        this.loginWindow.append(this.closeWindowMark);
        this.loginWindow.append(this.loginForm);
        this.loginForm.append(this.authorizationLabel);
        this.loginForm.append(this.logName);
        this.loginForm.append(this.logPassword);
        this.loginForm.append(this.logSubmitBtn);
        this.loginWindow.append(this.registrationLink);

        this.loginWindow.onclick = (e) => {
            e.stopPropagation();
        }
        this.wrapper.onclick = () => {
            this.clearRegForm();
            this.wrapper.remove();
        }

        this.logSubmitBtn.onclick = (e) => {
            e.preventDefault();
            this.login();
        }

        this.registrationLink.onclick = () => {
            this.clearRegForm();
            this.loginWindow.remove();
            this.createRegistrationWindow();
        }

        this.closeWindowMark.onclick = () => {
            this.clearRegForm();
            this.wrapper.remove();
        }
    },
    createRegistrationWindow() {
        this.wrapper.className = "window-wrapper";
        this.signUpWindow.className = "signup-area";
        this.signUpForm.className = "lr-form";
        this.signupLabel.textContent = "Регистрация:";
        this.regName.placeholder = "Имя";
        this.regName.name = "reg-name";
        this.regName.autocomplete = "name";
        this.regLogin.placeholder = "Логин";
        this.regLogin.name = "reg-login";
        this.regLogin.autocomplete = "username";
        this.regPassword.placeholder = "Пароль";
        this.regPassword.type = "password";
        this.regPassword.name = "reg-password";
        this.regPassword.autocomplete = "new-password"
        this.regConfirmPassword.placeholder = "Подтверждение пароля";
        this.regConfirmPassword.autocomplete = "new-password";
        this.regConfirmPassword.type = "password";
        this.regConfirmPassword.name = "reg-password-confirm";
        this.regSubmitBtn.textContent = "Отправить";
        document.body.append(this.wrapper);
        this.wrapper.append(this.signUpWindow);
        this.signUpWindow.append(this.closeWindowMark);
        this.signUpWindow.append(this.signUpForm);
        this.signUpForm.append(this.signupLabel);
        this.signUpForm.append(this.regName);
        this.signUpForm.append(this.regLogin);
        this.signUpForm.append(this.regPassword);
        this.signUpForm.append(this.regConfirmPassword);
        this.signUpForm.append(this.regSubmitBtn);
        this.regSubmitBtn.onclick = (e) => {
            e.preventDefault();
            this.validateAllRegFields();
            this.createUser();
        }

        this.signUpWindow.onclick = (e) => {
            e.stopPropagation();
        }
        this.regName.onchange = () => this.validateName();
        this.regLogin.onchange = () => this.validateLogin();
        this.regPassword.onchange = () => this.validatePassword();
        this.regConfirmPassword.onchange = () => this
            .validateConfirmPassword();
        this.wrapper.onclick = () => {
            this.clearRegForm();
            this.wrapper.remove();
        }

        this.closeWindowMark.onclick = () => {
            this.clearRegForm();
            this.wrapper.remove();
        }
    },
    validateName() {
        if(this.nameRegExp.test(this.regName.value.trim())) {
            this.highlightCorrectField(this.regName);
            this.allFieldsValid = true;
        } else {
            this.highlightIncorrectField(this.regName);
            this.allFieldsValid = false;
        }
    },
    validateLogin() {
        if(usersDB[this.regLogin.value.trim()]) {
            this.allFieldsValid = false;
            return this.highlightIncorrectField(this.regLogin, "yes");
        } else if(this.loginRegExp.test(this.regLogin.value.trim())) {
            this.highlightCorrectField(this.regLogin);
            this.allFieldsValid = true;
        } else {
            this.highlightIncorrectField(this.regLogin);
            this.allFieldsValid = false;
        }
    },
    validatePassword() {
        if(this.passwordRegExp.test(this.regPassword.value.trim())) {
            this.highlightCorrectField(this.regPassword);
            this.allFieldsValid = true;
        } else {
            this.highlightIncorrectField(this.regPassword);
            this.allFieldsValid = false;
        }
    },
    validateConfirmPassword() {
        if(this.regPassword.value.trim() === this.regConfirmPassword
            .value.trim() &&
            this.passwordRegExp.test(this.regConfirmPassword.value.trim())
        ) {
            this.highlightCorrectField(this.regConfirmPassword);
            this.allFieldsValid = true;
        } else {
            this.highlightIncorrectField(this.regConfirmPassword);
            this.allFieldsValid = false;
        }
    },

    highlightCorrectField(fieldName) {
        fieldName.style.border = "none";
        fieldName.style.boxShadow =
            "0 0 5px 0px rgb(43, 255, 0), inset 0 0 3px 0px rgb(43, 255, 0)";
        if(fieldName.nextSibling.tagName == "P") fieldName.nextSibling
            .remove();
    },
    highlightIncorrectField(fieldName, option) {
        fieldName.style.border = "none";
        fieldName.style.boxShadow =
            "0 0 5px 0px  rgb(255, 0, 76), inset 0 0 3px 0px  rgb(255, 0, 76)";
        this.createErrorMessage(fieldName, option);


    },
    clearRegForm() {
        document.querySelectorAll("div.window-wrapper > div > form > input")
            .forEach(input => {
                input.value = "";
                input.style = "";
            });
        document.querySelectorAll(".logReg-error").forEach(message =>
            message.remove());
    },
    createErrorMessage(fieldName, option = "no") {
        let error = document.createElement("p");
        error.className = "logReg-error";
        switch (fieldName.name) {
        case "log-login":
            error.textContent = "Такого пользователя не существует";
            break;
        case "log-password":
            error.textContent = "Пароль не правильный.";
            break;
        case "reg-name":
            error.textContent =
                "Имя должно состоять только из букв, длина имени от 1 буквы, максимум 3 слова."
            break;
        case "reg-login":
            error.textContent =
                "Логин должен быть от 3 до 12 символов, без пробелов.";
            if(option === "yes") error.textContent = "Логин уже занят";
            break;
        case "reg-password":
            error.textContent =
                "Пароль должен быть от 5 до 20 символов, содержать буквы и цифры, без пробелов.";
            break;
        case "reg-password-confirm":
            error.textContent = "Пароли не совпадают.";
            break;
        }
        if(fieldName.nextSibling.className !== "logReg-error") fieldName
            .after(error);
        fieldName.onclick = () => {
            fieldName.style = "";
            if(fieldName.nextSibling.tagName == "P") fieldName
                .nextSibling.remove();
        };
    },
    createUser() {
        if(this.allFieldsValid) {
            usersDB[this.regLogin.value.trim()] = {
                name: this.regName.value.trim(),
                password: this.regPassword.value.trim(),
            }
            this.clearRegForm();
            this.wrapper.remove();
            infoWindowUI.show("Регистрация завершена успешно.");
        }
    },
    login() {
        if(usersDB[this.logName.value]) {
            this.highlightCorrectField(this.logName);
            if(usersDB[this.logName.value].password === this.logPassword
                .value.trim()) {
                    const userAvatarArea = document.getElementById("btn-login-icon");
                    const loginButtonText = document.getElementById("btn-login-text");
                    userAvatarArea.src = usersDB[this.logName.value].avatar;
                    loginButtonText.textContent = usersDB[this.logName.value].name;
                    this.loggedUserName = usersDB[this.logName.value].name;
                    cartUI.cleanCart();
                this.clearRegForm();
                this.wrapper.remove();
                infoWindowUI.show("Вы успешно вошли в свой кабинет.");
                LOGIN_BTN.onclick = "";
            } else {
                this.highlightIncorrectField(this.logPassword);
            }
        } else {
            this.highlightIncorrectField(this.logName);
        }
    }
}

const usersDB = {
    admin: {
        name: "Максим",
        password: "admin",
        avatar: "images/user_avatars/admin.gif",
    }
};
