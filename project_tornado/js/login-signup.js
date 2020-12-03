"use strict";

const logRegUI = {
    wrapper: document.createElement("div"),
    loginWindow: document.createElement("div"),
    authorizationLabel: document.createElement("h3"),
    loginForm: document.createElement("form"),
    nameField: document.createElement("input"),
    passwordField: document.createElement("input"),
    submitBtn: document.createElement("button"),
    registrationLink: document.createElement("a"),
    signUpWindow: document.createElement("div"),
    signUpForm: document.createElement("form"),
    signupLabel: document.createElement("h3"),
    regNameField: document.createElement("input"),
    regLoginField: document.createElement("input"),
    regPasswordField: document.createElement("input"),
    regConfirmPasswordField: document.createElement("input"),
    regSubmitBtn: document.createElement("button"),
    closeWindowMark: document.createElement("p"),
    nameRegExp: /^(([a-z]+\s?){1,3})$/i,
    loginRegExp: /^(?=.*[a-z])[a-z0-9]{3,12}$/i,
    passwordRegExp: /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{5,20}/i,
    allFieldsValid: false,
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
        this.nameField.placeholder = "Имя пользователя";
        this.nameField.autocomplete = "username";
        this.passwordField.placeholder = "Пароль";
        this.submitBtn.textContent = "Войти";
        this.registrationLink.textContent = "Нет записи? Нажмите сюда."
        this.passwordField.type = "password";
        this.passwordField.autocomplete = "current-password";
        this.closeWindowMark.innerHTML = "&#10006;";
        this.closeWindowMark.id = "mark-close";
        document.body.append(this.wrapper);
        this.wrapper.append(this.loginWindow);
        this.loginWindow.append(this.closeWindowMark);
        this.loginWindow.append(this.loginForm);
        this.loginForm.append(this.authorizationLabel);
        this.loginForm.append(this.nameField);
        this.loginForm.append(this.passwordField);
        this.loginForm.append(this.submitBtn);
        this.loginWindow.append(this.registrationLink);

        this.loginWindow.onclick = (e) => {
            e.stopPropagation();
        }
        this.wrapper.onclick = () => {
            this.clearRegForm();
            this.wrapper.remove();
        }

        this.submitBtn.onclick = (e) => {
            e.preventDefault();
            this.clearRegForm();
            this.wrapper.remove();
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
        this.regNameField.placeholder = "Имя";
        this.regNameField.name = "reg-name";
        this.regNameField.autocomplete = "name";
        this.regLoginField.placeholder = "Логин";
        this.regLoginField.name = "reg-login";
        this.regLoginField.autocomplete = "username";
        this.regPasswordField.placeholder = "Пароль";
        this.regPasswordField.type = "password";
        this.regPasswordField.name = "reg-password";
        this.regPasswordField.autocomplete = "new-password"
        this.regConfirmPasswordField.placeholder = "Подтверждение пароля";
        this.regConfirmPasswordField.autocomplete = "new-password";
        this.regConfirmPasswordField.type = "password";
        this.regConfirmPasswordField.name = "reg-password-confirm";
        this.regSubmitBtn.textContent = "Отправить";
        document.body.append(this.wrapper);
        this.wrapper.append(this.signUpWindow);
        this.signUpWindow.append(this.closeWindowMark);
        this.signUpWindow.append(this.signUpForm);
        this.signUpForm.append(this.signupLabel);
        this.signUpForm.append(this.regNameField);
        this.signUpForm.append(this.regLoginField);
        this.signUpForm.append(this.regPasswordField);
        this.signUpForm.append(this.regConfirmPasswordField);
        this.signUpForm.append(this.regSubmitBtn);
        this.regSubmitBtn.onclick = (e) => {
            e.preventDefault();
            this.validateAllRegFields();
            if(this.allFieldsValid) {
                usersDB[this.regLoginField.value.trim()] = {
                    userName: this.regNameField.value.trim(),
                    password: this.regPasswordField.value.trim(),
                }
                this.clearRegForm();
                this.wrapper.remove();
                infoWindowUI.show("Registration sucessfull!");
            }
        }

        this.signUpWindow.onclick = (e) => {
            e.stopPropagation();
        }
        this.regNameField.onchange = () => this.validateName();
        this.regLoginField.onchange = () => this.validateLogin();
        this.regPasswordField.onchange = () => this.validatePassword();
        this.regConfirmPasswordField.onchange = () => this
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
        if(this.nameRegExp.test(this.regNameField.value.trim())) {
            this.highlightCorrectField(this.regNameField);
            this.allFieldsValid = true;
        } else {
            this.highlightIncorrectField(this.regNameField);
            this.allFieldsValid = false;
        }
    },
    validateLogin() {
        if(usersDB[this.regLoginField.value.trim()]) {
            this.allFieldsValid = false;
            return this.highlightIncorrectField(this.regLoginField, "yes");
        }
        else if(this.loginRegExp.test(this.regLoginField.value.trim())) {
            this.highlightCorrectField(this.regLoginField);
            this.allFieldsValid = true;
        } else {
            this.highlightIncorrectField(this.regLoginField);
            this.allFieldsValid = false;
        }
    },
    validatePassword() {
        if(this.passwordRegExp.test(this.regPasswordField.value.trim())) {
            this.highlightCorrectField(this.regPasswordField);
            this.allFieldsValid = true;
        } else {
            this.highlightIncorrectField(this.regPasswordField);
            this.allFieldsValid = false;
        }
    },
    validateConfirmPassword() {
        if(this.regPasswordField.value.trim() === this.regConfirmPasswordField
            .value.trim() &&
            this.passwordRegExp.test(this.regConfirmPasswordField.value.trim())) {
            this.highlightCorrectField(this.regConfirmPasswordField);
            this.allFieldsValid = true;
        } else {
            this.highlightIncorrectField(this.regConfirmPasswordField);
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
        case "reg-name":
            error.textContent =
                "Имя должно состоять только из букв, длина имени от 1 буквы, максимум 3 слова."
            break;
        case "reg-login":
            error.textContent = "Логин должен быть от 3 до 12 символов, без пробелов.";
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
    }
}

const usersDB = {

};
