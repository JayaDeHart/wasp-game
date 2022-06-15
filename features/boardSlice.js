import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  resources: [],
  players: [],
};

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addResource: (state, action) => {
      state.resources.push(action.payload);
    },
    addPlayer: (state, action) => {
      state.players.push(action.payload);
    },
  },
});

export const { addPlayer, addResource } = boardSlice.actions;

export default boardSlice.reducer;
