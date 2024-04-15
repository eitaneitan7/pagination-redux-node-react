import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching images with optional sorting
export const fetchImages = createAsyncThunk(
  'images/fetchAllImages',
  async ({ category, sortBy }, { rejectWithValue }) => {
    try {
      let url = `api/images?category=${category}`;

      const response = await axios.get(url);
      
      // Sort images based on the sorting criteria
      let sortedImages = response.data;
      if (sortBy === 'downloads') {
        sortedImages = sortedImages.sort((a, b) => b.downloads - a.downloads); // Sort by download count
      } else if (sortBy === 'likes') {
        sortedImages = sortedImages.sort((a, b) => b.likes - a.likes); // Sort by number of likes
      }

      return sortedImages;
    } catch (error) {
      return rejectWithValue(error.toString());
    }
  }
);

// Initial state for the images slice
const initialState = {
  allImages: [],
  visibleImages: [],
  currentPage: 1,
  category: 'flowers',  
  error: null,
  loading: false,
};

// Redux slice for managing images state
const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setPage(state, action) {
      state.currentPage = action.payload;
      const startIndex = (state.currentPage - 1) * 9;
      state.visibleImages = state.allImages.slice(startIndex, startIndex + 9);
    },
    setCategory(state, action) {  
      state.category = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
          // Handle pending state of fetchImages async thunk
      .addCase(fetchImages.pending, (state) => {
        state.loading = true;
      })
          // Handle fulfilled state of fetchImages async thunk
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.loading = false;
        state.allImages = action.payload;
        state.visibleImages = action.payload.slice(0, 9); // Initialize with the first 9 images
      })
          // Handle rejected state of fetchImages async thunk
      .addCase(fetchImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setPage, setCategory } = imagesSlice.actions;  
export default imagesSlice.reducer;
