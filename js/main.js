import { renderComments } from './render.js'
import {
    initAddCommentHandler,
    initLikeHandlers,
    initQuoteHandler,
} from './handlers.js'

document.addEventListener('DOMContentLoaded', () => {
    renderComments()
    initAddCommentHandler()
    initLikeHandlers()
    initQuoteHandler()
})
