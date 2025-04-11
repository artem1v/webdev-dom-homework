import { renderComments } from './render.js'
import { setupHandlers } from './handlers.js'

document.addEventListener('DOMContentLoaded', () => {
    renderComments();
    setupHandlers();
});

