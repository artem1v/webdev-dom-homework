import { renderComments } from './render.js'
import {
    initAddCommentHandler,
    initLikeHandlers,
    initQuoteHandler,
} from './handlers.js'
import { fetchComments } from './api.js'
import { updateComments } from './data.js'

document.querySelector(".comments").innerHTML = 
"Прожалуйста подождите, загружаю комментарий..."


document.addEventListener('DOMContentLoaded', () => {
    fetchComments().then(data =>{
        updateComments(data)
        renderComments()
    })
    initAddCommentHandler()
    initLikeHandlers()
    initQuoteHandler()
    
})

