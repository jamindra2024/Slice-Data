import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const formDataSlice = createSlice({
  name: 'formData',
  initialState,
  reducers: {
    addFormData: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('formData', JSON.stringify(state));
    },
    setFormData: (state, action) => {
      return action.payload;
    },
    updateFormData: (state, action) => {
      const { id, title, image,description, date,time } = action.payload;
      const existingData = state.find((data) => data.id === id);
      if (existingData) {
        existingData.title = title;
        existingData.image = image;
        existingData.description = description;
        existingData.date = date;
        existingData.time = time;
        localStorage.setItem('formData', JSON.stringify(state));
      }
    },
    deleteFormData: (state, action) => {
      const newState = state.filter((data) => data.id !== action.payload);
      localStorage.setItem('formData', JSON.stringify(newState));
      return newState;
    },
  },
});

export const { addFormData, setFormData, updateFormData, deleteFormData } = formDataSlice.actions;
export default formDataSlice.reducer;
