import { renderComments } from './render.js'
import {
    initAddCommentListener,
    initLikeListener,
    initQuoteListener,
} from './handlers.js'

document.addEventListener('DOMContentLoaded', () => {
    renderComments()
    initAddCommentListener()
    initLikeListener()
    initQuoteListener()
})
