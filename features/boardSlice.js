import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  resources: [],
  players: [],
  board: null,
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
    setBoard: (state, action) => {
      state.board = action.payload;
    },
  },
});

export const { addPlayer, addResource, setPlayers, setBoard } =
  boardSlice.actions;

export default boardSlice.reducer;
