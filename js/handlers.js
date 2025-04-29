import { comments } from './data.js'
import { renderComments } from './render.js'
import { escapeHtml, getCurrentDateTime } from './utils.js'

const addButton = document.querySelector('.add-form-button')
const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')

export function initAddCommentListenner() {
    addButton.addEventListener('click', () => {
        const name = escapeHtml(nameInput.value.trim())
        const text = escapeHtml(textInput.value.trim())

        if (!validateForm(name, text)) return

        comments.push({
            name,
            text,
            date: getCurrentDateTime(),
            likes: 0,
            isLiked: false,
        })

        renderComments()
        clearForm()
    })
}

export function initLikeListenner() {
    document.querySelectorAll('.like-button').forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            comments[index].isLiked = !comments[index].isLiked
            comments[index].likes += comments[index].isLiked ? 1 : -1
            renderComments()
        })
    })
}

export function initQuoteListenner() {
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

function clearForm() {
    nameInput.value = ''
    textInput.value = ''
    nameInput.style.border = ''
    textInput.style.border = ''
}
