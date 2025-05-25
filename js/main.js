import { token, fetchComments } from './api.js'
import { renderComments } from './render.js'
import { updateComments } from './data.js'
import { initLikeHandlers, initQuoteHandler } from './handlers.js'

document.addEventListener('DOMContentLoaded', () => {
    renderComments()

    const commentsContainer = document.querySelector('.comments')

    if (!commentsContainer) {
        console.error('Элемент .comments не найден после рендера')
        return
    }

    if (token) {
        fetchCommentsAndRender(commentsContainer)
    }
})

function fetchCommentsAndRender(container) {
    container.innerHTML = 'Загрузка...'

    fetchComments()
        .then((data) => {
            updateComments(data)
            renderComments()
            initLikeHandlers() 
            initQuoteHandler() 
        })
        .catch(() => {
            container.innerHTML = 'Ошибка загрузки'
        })
}
