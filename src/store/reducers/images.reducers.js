const initState = {
    images: [],
    selectedImage: null,
    loading: false
}

const imagesReducer = (state = initState, action) => {
    switch (action.type) {
        case 'images/loading': {
            return { ...state, loading: true }
        }
        case 'images/success': {
            return { ...state, loading: false, images: action.payload }
        }
        case 'images/select': {
            return { ...state, selectedImage: action.payload }
        }
        case 'images/update': {
            return { ...state, images: action.payload }
        }
        default:
            return state
    }
};

export default imagesReducer;