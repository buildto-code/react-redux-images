const fetchImages = async (dispatch, getState) => {
    dispatch({ type: 'images/loading' });
    const response = await fetch('https://picsum.photos/v2/list?page=1&limit=30');
    const payload = await response.json();
    dispatch({ type: 'images/success', payload })
};

const updateImages = (images) => async (
    dispatch,
    getState
) => {
    const payload = images;
    dispatch({ type: 'images/update', payload });
};

const clearImage = async (dispatch, getState) => {
    const payload = null;
    dispatch({ type: 'images/select', payload })
};

const selectImage = (image) => async (
    dispatch,
    getState
) => {
    const payload = image;
    dispatch({ type: 'images/select', payload });
};

export { fetchImages, updateImages, selectImage, clearImage };