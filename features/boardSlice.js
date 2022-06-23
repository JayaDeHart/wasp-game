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
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
  },
});

export const { addPlayer, addResource, setPlayers } = boardSlice.actions;

export default boardSlice.reducer;
