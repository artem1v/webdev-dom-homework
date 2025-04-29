import { renderComments } from './render.js'
import { initAddCommentListenner } from './handlers.js'

document.addEventListener('DOMContentLoaded', () => {
    renderComments()
    initAddCommentListenner()
})
