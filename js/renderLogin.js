import { login, setName, setToken } from './api.js'
import { renderComments } from './render.js'
import { renderRegistration } from './renderRegistration.js'

export const renderLogin = () => {
    const container = document.querySelector('.container')

    const loginHtml = `
        <section class="add-form">
            <h1>Форма входа</h1>
            <input 
                type="text"
                class="add-form-name"
                placeholder="Введите логин"
                id="login"
                required
            />
            <input 
                type="password"
                class="add-form-name"
                placeholder="Введите пароль"
                id="password"
                required
            />
            <fieldset class="add-form-registry">
                <button class="add-form-button-main button-main" type="submit">
                    Войти
                </button>
                <u class="add-form-button-link registry">
                    Зарегистрироваться 
                </u>
            </fieldset>
        </section>
    `

    container.innerHTML = loginHtml

    document.querySelector('.registry').addEventListener('click', () => {
        renderRegistration()
    })

    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')


    submitButtonEl.addEventListener('click', () => {
        const login = loginEl.value.trim()
        const password = passwordEl.value.trim()

        if (!login || !password) {
            alert('Заполните все поля')
            return
        }

        login(login, password)
            .then((response) => {
                if (response.status === 400) throw new Error('Неверные данные')
                return response.json()
            })
            .then((data) => {
                if (!data.user?.token) throw new Error('Ошибка сервера')
                setToken(data.user.token)
                setName(data.user.name)
                renderComments()
            })
            .catch((error) => {
                alert(error.message)
                passwordEl.value = ''
            })
    })
}
