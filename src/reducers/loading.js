export default (isLoading = true, action) => {
    switch (action.type) {
        case 'LOADING':
            isLoading = true
            return isLoading
        case 'END_LOADING':
            isLoading = false
            return isLoading
        default:
            return isLoading
    }
}                               