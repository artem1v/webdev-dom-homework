import { renderComments } from './render.js'
import {
    initAddCommentHandler,
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
   })

