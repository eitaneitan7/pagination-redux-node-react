import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { setCategory, fetchImages } from '../features/images/imageSlice';

Modal.setAppElement('#root'); 

const CategorySelector = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const dispatch = useDispatch();

    const categories = ['flowers', 'cars', 'animals', 'cities', 'food','anime','gaming']; // Example categories

    const handleCategorySelect = (category) => {
        dispatch(setCategory(category));
        dispatch(fetchImages({ category, page: 1 }));
        setModalIsOpen(false);
    };

    return (
        <div>
            <button onClick={() => setModalIsOpen(true)} className="m-4 p-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Select Category
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Category Selector"
                className="modal-content mx-auto mt-10 p-5 bg-white rounded shadow-lg outline-none"
                overlayClassName="modal-overlay fixed inset-0 bg-gray-800 bg-opacity-50"
            >
                <h2 className="text-xl font-bold mb-4">Choose a Category</h2>
                {categories.map(category => (
                    <button key={category} onClick={() => handleCategorySelect(category)}
                            className="block w-full text-left p-2 hover:bg-gray-100">
                        {category}
                    </button>
                ))}
            </Modal>
        </div>
    );
};

export default CategorySelector;
