import { comments } from './data.js';
import { createCommentHTML } from './renderUtils.js';
import { addLikeListeners } from './handlers.js';
import { addCommentClickListeners } from './handlers.js';

export function renderComments() {
    const commentsList = document.querySelector('.comments');
    if (!commentsList) return;

    commentsList.innerHTML = comments.map(createCommentHTML).join('');
    addLikeListeners();
    addCommentClickListeners();
}