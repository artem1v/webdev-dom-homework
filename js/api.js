const host = 'https://wedev-api.sky.pro/api/v1/Wenger-Artem'

export const fetchComments = () => {
    return fetch(host + '/comments')
        .then((res) => {
            return res.json()
        })
        .then((responseData) => {
            const appComments = responseData.comments.map((Comment) => {
                return {
                    name: Comment.author.name,
                    date: new Date(Comment.date),
                    text: Comment.text,
                    likes: Comment.likes,
                    isLiked: false,
                }
            })

            return appComments
        })
}

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
