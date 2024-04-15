import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from '../features/images/imageSlice';

export default configureStore({
  reducer: {
    images: imagesReducer,
  },
});
