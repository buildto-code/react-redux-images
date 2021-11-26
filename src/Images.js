import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, updateImages, clearImage, selectImage } from './store/actions/images.actions';

const Images = () => {
    const dispatch = useDispatch();
    const [author, setAuthor] = useState('');
    const [image, setImage] = useState('');
    const images = useSelector((state) => state.images);
    const selectedImage = useSelector((state) => state.selectedImage);
    const isLoading = useSelector((state) => state.loading);
    const ref = useRef();

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

    const onFileChange = e => {
        if(!e.target.files) return;
        const tempPath = URL.createObjectURL(e.target.files[0]);
        setImage(tempPath);
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log('e => ', e);
        if(!author || !image) return;
        const newImage = {
            'author': author,
            'download_url': image
        }
        const imagesArray = images;
        imagesArray.unshift(newImage);
        dispatch(updateImages(imagesArray));
        setImage('');
        setAuthor('');
        ref.current.value = "";
    }

    return (
        <div className="app-container">
            <div className="images-panel">
                <form className="images-form" onSubmit={handleSubmit}>
                    <h4>Add an image from your computer:</h4>
                    <label>Author:</label>
                    <input type="text" value={author} name="author" onChange={e => setAuthor(e.target.value)} />
                    <label>Image:</label>
                    <input type="file" ref={ref} onChange={onFileChange} />
                    <input type="Submit" value="Add image" />
                </form>
                {isLoading && <p>Loading images...</p>}
                {images.map((image, i) => <img key={i} onClick={() => handleClick(image)} alt={image.author} src={`${image.download_url}`} />)}
            </div>
            <div className="show-image">
                {selectedImage ?
                    <div className="selected-container">
                        <h1>{selectedImage.author}</h1>
                        <img alt="Selected" src={`${selectedImage.download_url}`} />
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