import { fetchComments, postComment } from './api.js'
import { comments, updateComments } from './data.js'
import { renderComments } from './render.js'
import { escapeHtml } from './utils.js'

export function initAddCommentHandler() {
    const addButton = document.querySelector('.add-form-button')
    const textInput = document.querySelector('.add-form-text')

    addButton?.addEventListener('click', async () => {
        const text = escapeHtml(textInput?.value.trim() || '')

        if (!text) {
            textInput?.classList.add('-error')
            return
        }

        try {
            addButton.disabled = true
            await postComment(text)
            const updatedComments = await fetchComments() // Добавлено получение обновленных комментариев
            updateComments(updatedComments)
            renderComments()
            textInput.value = ''
        } catch (error) {
            alert(error.message)
        } finally {
            addButton.disabled = false
        }
    })
}

export function initLikeHandlers() {
    const likeButtons = document.querySelectorAll('.like-button')

    likeButtons.forEach((button, index) => {
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
