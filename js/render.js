import { comments } from './data.js'
import { createCommentHTML } from './renderUtils.js'
import { initLikeHandlers, initQuoteHandler } from './handlers.js'

export function renderComments() {
    const commentsList = document.querySelector('.comments')
    commentsList.innerHTML = comments.map(createCommentHTML).join('')

    initLikeHandlers()
    initQuoteHandler()
}
