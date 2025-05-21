import { token, fetchComments } from './api.js'
import { renderComments } from './render.js'
import { updateComments } from './data.js'

document.addEventListener('DOMContentLoaded', () => {
    if (token) {
        fetchCommentsAndRender()
    } else {
        renderComments()
    }
})

function fetchCommentsAndRender() {
    document.querySelector('.comments').innerHTML = 'Загрузка...'

    fetchComments()
        .then((data) => {
            updateComments(data)
            renderComments()
        })
        .catch(() => {
            document.querySelector('.comments').innerHTML = 'Ошибка загрузки'
        })
}
