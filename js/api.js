const host = 'https://wedev-api.sky.pro/api/v1/Wenger-Artem'

import { formatDate } from './utils.js';

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => res.json())
        .then((responseData) => {
            return responseData.comments.map((comment) => ({
                name: comment.author.name,
                date: formatDate(new Date(comment.date)), 
                text: comment.text,
                likes: comment.likes,
                isLiked: false
            }));
        });
};

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        body: JSON.stringify({
            text,
            name,
        }),
    })
        .then((Response) => {
            if (Response.status === 500) {
                throw new Error('Ошибка сервера')
            }
            if (Response.status === 400) {
                throw new Error('Неверный запрос')
            }
            if (Response.status === 201) {
                return Response.json()
            }
        })
        .then(() => {
            return fetchComments()
        })
}
