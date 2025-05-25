import { getToken, fetchComments } from './api.js'
import { renderComments } from './render.js'
import { updateComments } from './data.js'
import { initLikeHandlers, initQuoteHandler } from './handlers.js'

document.addEventListener('DOMContentLoaded', () => {
    renderComments()

    const commentsContainer = document.querySelector('.comments')

    document.addEventListener('DOMContentLoaded', () => {
        if (getToken()) {
            fetchCommentsAndRender()
        } else {
            renderComments()
        }
    })

    if (!commentsContainer) {
        console.error('Элемент .comments не найден после рендера')
        return
    }

    if (getToken()) {
        fetchCommentsAndRender(commentsContainer)
    }
})

export function fetchCommentsAndRender() {
    const container = document.querySelector('.comments')
    if (!container) return

    container.innerHTML = 'Загрузка...'

    fetchComments()
        .then((data) => {
            updateComments(data)
            renderComments()
        })
        .catch((error) => {
            console.error('Ошибка загрузки:', error)
            container.innerHTML = 'Ошибка загрузки комментариев'
        })
}

document.addEventListener('DOMContentLoaded', () => {
    renderComments() // Это вызовет все нужные обработчики
})
