import { comments } from './data.js'
import { createCommentHTML } from './renderUtils.js'
import {
    initAddCommentHandler,
    initLikeHandlers,
    initQuoteHandler,
} from './handlers.js'
import { token, getName, checkAuth } from './api.js'
import { renderLogin } from './renderLogin.js'

export const renderComments = () => {
    const container = document.querySelector('.container')
    if (!container) return

    const authSection = checkAuth()
        ? `
        <div class="add-form">
            <input class="add-form-name" 
                   value="${getName()}" 
                   readonly
                   placeholder="Ваше имя">
            <textarea class="add-form-text" 
                     placeholder="Введите комментарий"></textarea>
            <div class="add-form-row">
                <button class="add-form-button">Написать</button>
            </div>
        </div>
    `
        : `
        <p>Чтобы оставить комментарий, 
            <span class="login-link">войдите</span>
        </p>
    `

    container.innerHTML = `
        <ul class="comments">
            ${comments.map((comment) => createCommentHTML(comment)).join('')}
        </ul>
        ${authSection}
    `

    if (checkAuth()) {
        initAddCommentHandler()
        initLikeHandlers()
        initQuoteHandler()
    } else {
        document
            .querySelector('.login-link')
            ?.addEventListener('click', renderLogin)
    }
}
