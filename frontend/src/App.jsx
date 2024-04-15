// App.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchImages, setPage, setCategory } from './features/images/imageSlice';
import ImageGrid from './components/ImageGrid';
import CategorySelector from './components/CategorySelector';

function App() {
  const dispatch = useDispatch();
  const { currentPage, category, allImages, visibleImages } = useSelector(state => state.images);
  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    dispatch(fetchImages({ category, sortBy }));
    if (sortBy === 'downloads') {
      dispatch(fetchImages({ category, sortBy }));
    }
  }, [dispatch, category, sortBy]); // Add sortBy to the dependency array
  const handleNextPage = () => {
    if ((currentPage - 1) * 9 + visibleImages.length < allImages.length) {
      dispatch(setPage(currentPage + 1));
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1));
    }
  };

  const handleSortByChange = (e) => {
    const sortByValue = e.target.value;
    setSortBy(sortByValue);
    dispatch(fetchImages({ category, sortBy: sortByValue }));
  };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center p-4 bg-white shadow-md">
        <button onClick={handlePrevPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Prev
        </button>
        <CategorySelector />
        <select onChange={handleSortByChange} className="border rounded px-2 py-1">
          <option value="">Sort By</option>
          <option value="id">ID</option>
          <option value="likes">Likes</option>
          <option value="downloads">Downloads</option> 
        </select>
        <button onClick={handleNextPage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Next
        </button>
      </div>
      <ImageGrid />
    </div>
  );
}

export default App;
