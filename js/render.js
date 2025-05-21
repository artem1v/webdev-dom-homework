import { comments } from './data.js'
import { createCommentHTML } from './renderUtils.js'
import { initAddCommentHandler } from './handlers.js'
import { token } from './api.js'
import { renderLogin } from './renderLogin.js'

export const renderComments = () => {
    const container = document.querySelector('.container')
    container.innerHTML = `
        <ul class="comments">
            ${comments.map(createCommentHTML).join('')}
        </ul>
        ${getAuthSection()}
    `

    if (token) {
        initAddCommentHandler()
    } else {
        document
            .querySelector('.login-link')
            ?.addEventListener('click', renderLogin)
    }
}

function getAuthSection() {
    return token
        ? `
        <div class="add-form">
            <textarea class="add-form-text"></textarea>
            <button class="add-form-button">Написать</button>
            <button class="logout-button">Выйти</button>
        </div>
    `
        : `
       <p>Чтобы оставить комментарий, <a href="#" class="login-link">войдите</a></p>
   `
}

document.querySelector('.logout-button')?.addEventListener('click', logout)
