import { registration, setToken, setName } from './api.js'
import { renderComments } from './render.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')
    container.innerHTML = `
        <div class="auth-form">
            <h2>Регистрация</h2>
            <input type="text" class="auth-input" id="name-input" placeholder="Имя">
            <input type="text" class="auth-input" id="login-input" placeholder="Логин">
            <input type="password" class="auth-input" id="password-input" placeholder="Пароль">
            <button class="auth-button" id="register-button">Зарегистрироваться</button>
            <div class="auth-link" id="to-login">Уже есть аккаунт? Войти</div>
            <div class="auth-error" id="register-error"></div>
        </div>
    `

    document.getElementById('to-login').addEventListener('click', renderLogin)

    document
        .getElementById('register-button')
        .addEventListener('click', async () => {
            const nameInput = document.getElementById('name-input')
            const loginInput = document.getElementById('login-input')
            const passwordInput = document.getElementById('password-input')
            const errorElement = document.getElementById('register-error')

            try {

                if (passwordInput.value.trim().length < 3) {
                    throw new Error('Пароль должен быть не менее 3 символов')
                }

                const data = await registration(
                    nameInput.value.trim(),
                    loginInput.value.trim(),
                    passwordInput.value.trim(),
                )

                if (data.user && data.user.token) {
                    setToken(data.user.token)
                    setName(data.user.name)
                    renderComments()
                } else {
                    throw new Error('Неверный ответ сервера')
                }
            } catch (error) {
                errorElement.textContent = error.message || 'Ошибка регистрации'
                console.error('Registration failed:', error)
            }
        })
}
