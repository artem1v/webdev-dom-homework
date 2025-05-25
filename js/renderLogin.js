import { login, setToken, setName, fetchComments } from './api.js'
import { updateComments } from './data.js'
import { renderComments } from './render.js'
import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')
    container.innerHTML = `
        <div class="auth-form">
            <h2>Вход</h2>
            <input type="text" class="auth-input" id="login-input" placeholder="Логин">
            <input type="password" class="auth-input" id="password-input" placeholder="Пароль">
            <button class="auth-button" id="login-button">Войти</button>
            <div class="auth-link" id="to-register">Нет аккаунта? Зарегистрироваться</div>
            <div class="auth-error" id="login-error"></div>
        </div>
    `

    // Обработчики событий
    document
        .getElementById('to-register')
        .addEventListener('click', renderRegistration)

    document
        .getElementById('login-button')
        .addEventListener('click', async () => {
            const loginValue = document.getElementById('login-input').value
            const passwordValue =
                document.getElementById('password-input').value

            try {
                // Правильный вызов функции login
                const response = await login(loginValue, passwordValue)

                setToken(response.user.token)
                setName(response.user.name)

                // Загружаем комментарии
                const commentsData = await fetchComments()
                updateComments(commentsData)
                renderComments()
            } catch (error) {
                alert(error.message)
            }
        })
}
