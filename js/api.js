const host = 'https://wedev-api.sky.pro/api/v2/Wenger-Artem'
const authHost = 'https://wedev-api.sky.pro/api/user'

let _token = localStorage.getItem('token') || ''
let _name = localStorage.getItem('name') || ''

export const getName = () => _name

export const setName = (newName) => {
    _name = newName
    localStorage.setItem('name', newName)
}

export let token = _token

export const setToken = (newToken) => {
    _token = newToken
    localStorage.setItem('token', newToken)
}

import { renderComments } from './render.js'
import { formatDate } from './utils.js'

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => res.json())
        .then((responseData) => {
            return responseData.comments.map((comment) => ({
                name: comment.author.name,
                date: formatDate(new Date(comment.date)),
                text: comment.text,
                likes: comment.likes,
                isLiked: false,
            }))
        })
}

export const postComment = (text, name) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
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

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({ name, login, password }),
    }).then((response) => {
        if (!response.ok) {
            return response.json().then((err) => {
                throw new Error(err.error || 'Ошибка регистрации')
            })
        }
        return response.json()
    })
}

export const logout = () => {
    try {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        token = ''
        name = ''
        renderComments()
    } catch (error) {
        console.error('Ошибка выхода:', error)
    }
}


export const checkAuth = () => {
    return !!token;
};