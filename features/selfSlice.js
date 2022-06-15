import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: null,
  role: null,
};

const selfSlice = createSlice({
  name: 'self',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setName, setRole } = selfSlice.actions;

export default selfSlice.reducer;
