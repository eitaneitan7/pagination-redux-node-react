import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ImageModal from './ImageModal';

const ImageGrid = () => {
  // Accessing visibleImages from Redux state
  const images = useSelector(state => state.images.visibleImages);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  // Check if images is defined and has elements before trying to render them
  if (!images || images.length === 0) {
    return <div>Loading images or no images found...</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {images.map((image, index) => (
        <div key={index} className="w-full h-64 overflow-hidden rounded shadow-lg" onClick={() => handleImageClick(image)}>
          <img src={image.webformatURL} alt={image.tags} className="w-full h-full object-cover" />
        </div>
      ))}
      <ImageModal image={selectedImage} isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} />
    </div>
  );
};

export default ImageGrid;
