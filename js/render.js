import { comments } from './data.js'
import { createCommentHTML } from './renderUtils.js'
import {  initLikeListenner, initQuoteListenner } from './handlers.js'

export function renderComments() {
    const commentsList = document.querySelector('.comments')
    commentsList.innerHTML = comments.map(createCommentHTML).join('')

    initLikeListenner()
    initQuoteListenner()
}
