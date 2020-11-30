"use strict";

function createLoginWindow() {
    const wrapper = document.createElement("div");
    const loginWindow = document.createElement("div");
    const authorisationLabel = document.createElement("h3");
    const loginForm = document.createElement("form");
    const nameField = document.createElement("input");
    const passwordField = document.createElement("input");
    const submitBtn = document.createElement("button");
    const registrationLink = document.createElement("a");

    authorisationLabel.textContent = "Авторизация:";
    wrapper.className = "window-wrapper";
    loginWindow.className = "login-area";
    loginForm.className = "lr-form";
    nameField.placeholder = "Имя пользователя";
    passwordField.placeholder = "Пароль";
    submitBtn.textContent = "Войти";
    registrationLink.textContent = "Нет записи? Нажмите сюда."
    passwordField.type = "password";

    document.body.append(wrapper);
    wrapper.append(loginWindow);
    loginWindow.append(loginForm);
    loginForm.append(authorisationLabel);
    loginForm.append(nameField);
    loginForm.append(passwordField);
    loginForm.append(submitBtn);
    loginWindow.append(registrationLink);

    loginWindow.onclick = (e) => {
        e.stopPropagation();
    }
    wrapper.onclick = (e) => {
        wrapper.remove();
    }

    submitBtn.onclick = (e) => {
        e.preventDefault();
    }

    registrationLink.onclick = () => {
       wrapper.remove();
       createRegistrationWindow();
    }
}


function createRegistrationWindow() {
    const wrapper = document.createElement("div");
    const signUpWindow = document.createElement("div");
    const signUpForm = document.createElement("form");
    const signupLabel = document.createElement("h3");
    const nameField = document.createElement("input");
    const loginField = document.createElement("input");
    const passwordField = document.createElement("input");
    const confirmPasswordField = document.createElement("input");
    const submitBtn = document.createElement("button");

    wrapper.className = "window-wrapper";
    signUpWindow.className = "signup-area";
    signUpForm.className = "lr-form";

    signupLabel.textContent = "Регистрация:";
    nameField.placeholder = "Имя";
    loginField.placeholder = "Логин";
    passwordField.placeholder = "Пароль";
    passwordField.type = "password";
    confirmPasswordField.placeholder = "Подтверждение пароля";
    confirmPasswordField.type = "password";
    submitBtn.textContent = "Отправить"

    document.body.append(wrapper);
    wrapper.append(signUpWindow);
    signUpWindow.append(signUpForm);
    signUpForm.append(signupLabel);
    signUpForm.append(nameField);
    signUpForm.append(loginField);
    signUpForm.append(passwordField);
    signUpForm.append(confirmPasswordField);
    signUpForm.append(submitBtn);

    submitBtn.onclick = (e) => {
        e.preventDefault();
    }

    signUpWindow.onclick = (e) => {
        e.stopPropagation();
    }
    wrapper.onclick = (e) => {
        wrapper.remove();
    }
}
