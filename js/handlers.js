import { postComment } from './api.js'
import { comments, updateComments } from './data.js'
import { renderComments } from './render.js'
import { escapeHtml } from './utils.js'

const addButton = document.querySelector('.add-form-button')
const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')

export function initAddCommentHandler() {
    addButton.addEventListener('click', () => {
        const name = escapeHtml(nameInput.value.trim())
        const text = escapeHtml(textInput.value.trim())

        if (!validateForm(name, text)) return

        document.querySelector('.form-loading').style.display = 'blok'
        document.querySelector('.add-form').style.display = 'none'

        postComment(escapeHtml(textInput.value), escapeHtml(nameInput.value))
            .then((data) => {
                document.querySelector('.form-loading').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'

                updateComments(data)
                renderComments()
                nameInput.value = ''
                textInput.value = ''
                nameInput.style.border = ''
                textInput.style.border = ''
            })
            .catch((error) => {
                document.querySelector('.form-loading').style.display = 'none'
                document.querySelector('.add-form').style.display = 'flex'

                if (error.message === 'Failed to fetch') {
                    alert('Нет интернета, попробуйте снова')
                }

                if (error.message == 'Ошибка сервера') {
                    alert('Ошибка сервера')
                }

                if (error.message === 'Неверный запрос') {
                    alert('Имя и комментарий должны быть не короче 3х символов')

                    nameInput.classList.add('-error')
                    textInput.classList.add('-error')

                    setTimeout(() => {
                        nameInput.classList.remove('-error')
                        textInput.classList.remove('-error')
                    }, 2000)
                }
            })
    })
}

export function initLikeHandlers() {
    document.querySelectorAll('.like-button').forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            comments[index].isLiked = !comments[index].isLiked
            comments[index].likes += comments[index].isLiked ? 1 : -1
            renderComments()
        })
    })
}

export function initQuoteHandler() {
    document.querySelectorAll('.comment').forEach((commentElement, index) => {
        commentElement.addEventListener('click', (event) => {
            if (!event.target.closest('.like-button')) {
                const quotedComment = comments[index]
                textInput.value = `> ${quotedComment.text}\n\n@${quotedComment.name}, `
                textInput.focus()
            }
        })
    })
}

function validateForm(name, text) {
    let isValid = true

    nameInput.style.border = name ? '' : '2px solid red'
    textInput.style.border = text ? '' : '2px solid red'

    if (!name || !text) isValid = false
    return isValid
}
