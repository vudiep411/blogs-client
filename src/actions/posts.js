import * as api from '../API'

// Action

export const getPost = (id) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING'})

        const { data } = await api.fetchPost(id)
        dispatch({type: 'FETCH_POST', payload: data})

        dispatch({type: 'END_LOADING'})
    } catch(err) {
        console.log(err)
    }
}

export const getPosts = () => async (dispatch) => {
    try {
        dispatch({type: 'LOADING'})

        const { data } = await api.fetchPosts()
        dispatch({type: 'FETCH_ALL', payload: data})

        dispatch({type: 'END_LOADING'})
    } catch(err) {
        console.log(err)
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING'})

        const { data } = await api.createPost(post)
        dispatch({ type: 'CREATE', payload: data})

        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error)
    }
}

export const updatePosts = (id, post) => async (dispatch) => {
    try {
        const { data } =  await api.updatePost(id, post)
        dispatch({type: 'UPDATE', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const deletePosts = (id) => async (dispatch) => {
    try {
        dispatch({type: 'LOADING'})

        await api.deletePost(id)
        dispatch({type: 'DELETE', payload: id})

        dispatch({type: 'END_LOADING'})
    } catch (error) {
        console.log(error)
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } =  await api.likePost(id)
        dispatch({type: 'LIKE', payload: data})
    } catch (error) {
        console.log(error)
    }
}

export const commentPost = (value, id) => async (dispatch) => {
    try {
        const { data } = await api.comment(value, id)
        dispatch({type: 'COMMENT', payload: data})
        return data.comments
    } catch (error) {
        console.log(error)
    }
}