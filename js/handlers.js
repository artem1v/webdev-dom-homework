import { fetchComments, postComment } from './api.js'
import { comments, updateComments } from './data.js'
import { renderComments } from './render.js'
import { escapeHtml } from './utils.js'

const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')

export function initAddCommentHandler() {
    const addButton = document.querySelector('.add-form-button')
    const textInput = document.querySelector('.add-form-text')

    addButton?.addEventListener('click', () => {
        const text = escapeHtml(textInput.value.trim())

        if (!text) {
            textInput.style.border = '2px solid red'
            return
        }

        postComment(text)
            .then(() => fetchComments())
            .then((comments) => {
                updateComments(comments)
                renderComments()
            })
            .catch((error) => {
                alert(error.message)
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
                const textInput = document.querySelector('.add-form-text') 
                if (!textInput) return 

                const quotedComment = comments[index]
                textInput.value = `> ${quotedComment.text}\n\n@${quartedComment.name}, `
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
