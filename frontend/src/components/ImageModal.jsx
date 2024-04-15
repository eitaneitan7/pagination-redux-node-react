import React from 'react';
import Modal from 'react-modal';

const ImageModal = ({ image, isOpen, onRequestClose }) => {
    if (!image) return null;

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Image Details"
            className="modal-content mx-auto mt-10 p-5 bg-white rounded shadow-lg outline-none max-w-lg w-full" // Adjusted size here
            overlayClassName="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
            >
            <div className="flex flex-col items-center">
                <h2 className="text-lg font-bold mb-2">{image.tags}</h2>
                <img src={image.webformatURL} alt={image.tags} className="w-full h-auto max-h-80 object-cover"/>
                <p>Views: {image.views}</p>
                <p>Downloads: {image.downloads}</p>
                <p>Likes: {image.likes}</p>
                <button onClick={onRequestClose} className="mt-4 p-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default ImageModal;
