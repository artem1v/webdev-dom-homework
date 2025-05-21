import { getName, token } from "./api.js";
import { comments } from "./data.js";
import { renderLogin } from "./renderLogin.js";
import { initLikeHandlers, initQuoteHandler } from "./handlers.js";



export const createCommentHTML = (comment) => {
    return `
    <li class="comment">
    <div class="comment-header">
    <div>${comment.name}</div>
    <div>${comment.date}</div>
    </div>
    <div class="comment-body">
    <div class="comment-text">
      ${comment.text}
    </div>
    </div>
    <div class="comment-footer">
    <div class="likes">
      <span class="likes-counter">${comment.likes}</span>
      <button class="like-button ${comment.isLiked ? '-active-like' : ''}"></button>
    </div>
    </div>
    </li>
    `
}

const getAddCommentsHtml = () => `
    <div class="add-form">
        <input
            type="text"
            class="add-form-name"
            placeholder="Введите ваше имя"
            readonly
            value="${getName()}"
        />
        <textarea
            type="textarea"
            class="add-form-text"
            placeholder="Введите ваш комментарий"
            rows="4"
        ></textarea>
        <div class="add-form-row">
            <button class="add-form-button">Написать</button>
        </div>
        <div class="form-loading" style="display: none; margin-top: 20px;">
            Комментарий добавляется...
        </div>
    </div>`

const linkToLoginText = `<p>Чтобы отправить комментарий, <span class="link-login">войдите</span></p>`

export const renderCommentsUtils = (container) => {
    const baseHtml = `
        <ul class="comments">
            ${comments.map((comment) => createCommentHTML(comment)).join('')}
        </ul>
        ${token ? getAddCommentsHtml() : linkToLoginText} // Вызываем функцию здесь
    `

    container.innerHTML = baseHtml

    if (token) {
        initLikeHandlers()
        initQuoteHandler()
    } else {
        document
            .querySelector('.link-login')
            ?.addEventListener('click', renderLogin)
    }
}
