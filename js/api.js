import { formatDate } from './utils.js'
const host = 'https://wedev-api.sky.pro/api/v2/Wenger-Artem'
const authHost = 'https://wedev-api.sky.pro/api/user'

let _token = localStorage.getItem('token') || ''
let _name = localStorage.getItem('name') || ''


export const getToken = () => _token

export const getName = () => _name
export const token = getToken()
export const setToken = (newToken) => {
    _token = newToken
    localStorage.setItem('token', newToken)
}

export const setName = (newName) => {
    _name = newName
    localStorage.setItem('name', newName)
}

const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json()
        throw new Error(
            errorData.error || `HTTP error! status: ${response.status}`,
        )
    }
    return response.json()
}


export const login = (login, password) => {
    return fetch(`${authHost}/login`, {
        method: 'POST',
        body: JSON.stringify({ login, password }),
    }).then((response) => {
        if (!response.ok) {
            return response.json().then((err) => {
                throw new Error(err.error || 'Ошибка входа')
            })
        }
        return response.json()
    })
}


export const registration = async (name, login, password) => {
    try {
        const response = await fetch(authHost, {
            method: 'POST',
            body: JSON.stringify({
                name,
                login,
                password,
            }),
        })
        return handleResponse(response)
    } catch (error) {
        console.error('Registration error:', error)
        throw error
    }
}


export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    _token = ''
    _name = ''
}


export const postComment = (text) => {
    return fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
            text,
        }),
    })
        .then((response) => {
            if (response.status === 401) throw new Error('Не авторизован')
            if (response.status === 400) throw new Error('Неверный запрос')
            if (response.status === 500) throw new Error('Ошибка сервера')
            return response.json()
        })
        .then(() => fetchComments()) 
}

export const fetchComments = () => {
    return fetch(host + '/comments', {
        headers: {
            Authorization: `Bearer ${getToken()}`,
        },
    })
        .then((response) => response.json())
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
