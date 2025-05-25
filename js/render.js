import { comments } from './data.js'
import { createCommentHTML } from './renderUtils.js'
import { initAddCommentHandler, initLikeHandlers } from './handlers.js'
import { getToken, getName, logout } from './api.js'
import { renderLogin } from './renderLogin.js'

export const renderComments = () => {
    const container = document.querySelector('.container')
    container.innerHTML = `
        <ul class="comments">
            ${comments.map(createCommentHTML).join('')}
        </ul>
        ${getToken() ? getAuthForm() : getLoginPrompt()}}
    `

    initLikeHandlers()
    if (getToken()) {
        initAddCommentHandler()
        const logoutBtn = document.querySelector('.logout-button')
        if (logoutBtn) {
            logoutBtn.addEventListener('click', logout)
        }
    } else {
        const loginLink = document.querySelector('.login-link')
        if (loginLink) {
            loginLink.addEventListener('click', (e) => {
                e.preventDefault()
                renderLogin()
            })
        }
    }
    setupEventListeners()
}

function getAuthForm() {
    return `
        <div class="add-form">
            <input class="add-form-name" value="${getName()}" readonly>
            <textarea class="add-form-text" placeholder="Ваш комментарий"></textarea>
            <div class="form-actions">
                <button class="add-form-button">Отправить</button>
                <button class="logout-button">Выйти</button>
            </div>
        </div>
    `
}

function getLoginPrompt() {
    return `
        <div class="login-prompt">
            <p>Для комментариев <button class="login-link">войдите</button></p>
        </div>
    `
}

function setupEventListeners() {
    document.querySelector('.logout-button')?.addEventListener('click', () => {
        logout()
        renderLogin() 
    })
}
