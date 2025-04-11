import { comments } from './data.js'
import { renderComments } from './render.js'
import { escapeHtml, getCurrentDateTime } from './utils.js'

const addButton = document.querySelector('.add-form-button')
const nameInput = document.querySelector('.add-form-name')
const textInput = document.querySelector('.add-form-text')

let quotedCommentIndex = null
function quoteComment(index) {
    const comment = comments[index]
    const quotePrefix = '> '
    const quotedText = `${quotePrefix}${comment.text}\n\n@${comment.name}, `
    textInput.value = quotedText
    quotedCommentIndex = index
}

export function addCommentClickListeners() {
    const commentElements = document.querySelectorAll('.comment')

    commentElements.forEach((commentElement, index) => {
        commentElement.addEventListener('click', (event) => {
            if (!event.target.closest('.like-button')) {
                quoteComment(index)
                textInput.focus()
            }
        })
    })
}

export function setupHandlers() {
    addButton.addEventListener('click', addComment)
    //addLikeListeners()
}

function addComment() {
    const name = escapeHtml(nameInput.value.trim())
    let text = escapeHtml(textInput.value.trim())

    if (quotedCommentIndex !== null) {
        const originalAuthor = comments[quotedCommentIndex].name
        text += `\n\n(Ответ на комментарий @${originalAuthor})`
        quotedCommentIndex = null
    }

    let isError = false

    if (name === '') {
        nameInput.style.border = '2px solid red'
        isError = true
    } else {
        nameInput.style.border = ''
    }

    if (text === '') {
        textInput.style.border = '2px solid red'
        isError = true
    } else {
        textInput.style.border = ''
    }

    if (isError) {
        return
    }

    if (!isError) {
        comments.push({
            name,
            date: getCurrentDateTime(),
            text,
            likes: 0,
            isLiked: false,
        })
        renderComments()
        nameInput.value = ''
        textInput.value = ''
    }
}

export function addLikeListeners() {
    const likeButtons = document.querySelectorAll('.like-button')
    likeButtons.forEach((button, index) => {
        button.replaceWith(button.cloneNode(true))
    })

    document.querySelectorAll('.like-button').forEach((button, index) => {
        button.addEventListener('click', (event) => {
            event.stopPropagation()
            toggleLike(index)
        })
    })
}

export function toggleLike(index) {
    const comment = comments[index]
    comment.isLiked = !comment.isLiked
    comment.likes += comment.isLiked ? 1 : -1
    renderComments()
}
