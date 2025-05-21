import { registration, setName, setToken } from './api.js'
import { initAddCommentHandler } from './handlers.js'
import { renderLogin } from './renderLogin.js'

export const renderRegistration = () => {
    const container = document.querySelector('.container')

    if (!container) {
        console.error('Контейнер не найден!')
        return
    }
    const loginHtml = `
        <section class="add-form">
                <h1>Форма регистрации</h1>
                    <input 
                    type="name"
                    class="add-form-name"
                    placeholder="Введите имя"
                    id="name"
                    required
                />
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
                ></input>
                <fieldset class="add-form-registry">
                    <button class="add-form-button-main button-main" type="submit">
                        Зарегистрироваться</button>
                        <u class="add-form-button-link entry">
                             Войти
                        </u>
                </fieldset>
            </section>
    `

    container.innerHTML = loginHtml

    document.querySelector('.entry').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.querySelector('#name')
    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const submitButtonEl = document.querySelector('.button-main')

    submitButtonEl.addEventListener('click', () => {
        const name = nameEl.value.trim()
        const login = loginEl.value.trim()
        const password = passwordEl.value.trim()

        if (!name || !login || !password) {
            alert('Все поля обязательны для заполнения!')
            return
        }

        registration(name, login, password)
            .then((data) => {
                console.log('Ответ сервера:', data)

                if (!data.user || !data.user.token) {
                    throw new Error('Некорректный ответ сервера')
                }

                setToken(data.user.token)
                setName(data.user.name)
                initAddCommentHandler()
            })
            .catch((error) => {
                alert(error.message)
            })
    })
}
