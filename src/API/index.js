import axios from 'axios'



const API = axios.create({ baseURL: 'https://blog-stories-vu.herokuapp.com'})
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile'))
    {
        const obj = JSON.parse(localStorage.getItem('profile'))
        req.headers.Authorization = `${obj.token}`
    }

    return req
})
export const fetchPost = (id) => API.get(`/posts/${id}`)
export const fetchPosts = () => API.get(`/posts`)
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost)
export const deletePost = (id) => API.delete(`/posts/${id}`)
export const likePost = (id) => API.patch(`/posts/${id}/likePost`)
export const comment = (value, id) => API.post(`/posts/${id}/comment`, {value})

export const signIn = (formData) => API.post(`/user/signin`, formData)
export const signUp = (formData) => API.post(`user/signup`, formData)

