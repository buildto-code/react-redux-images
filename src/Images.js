import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, clearImage, selectImage } from './store/actions/images.actions';

const Images = () => {
    const dispatch = useDispatch();
    const images = useSelector((state) => state.images);
    const selectedImage = useSelector((state) => state.selectedImage);

    useEffect(() => {
        if(!images.length) {
            dispatch(fetchImages);
        }
    });

    const handleClick = (image) => {
        dispatch(selectImage(image));
    }

    const clearSelected = () => {
        dispatch(clearImage);
    }

    return (
        <div className="app-container">
            <div className="images-panel">
                {images.map((image, i) => <img key={i} onClick={() => handleClick(image)} alt={image.author} src={`${image.download_url}.jpg`} />)}
            </div>
            <div className="show-image">
                {selectedImage ?
                    <div className="selected-container">
                        <h1>{selectedImage.author}</h1>
                        <img alt="Selected" src={`${selectedImage.download_url}.jpg`} />
                        <button onClick={() => clearSelected()}>Clear</button>
                    </div>
                :
                    <p>Please selec an image...</p>
                }
            </div>
        </div>
    );
}

export default Images;