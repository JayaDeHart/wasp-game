import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'unset',
  role: null,
  host: false,
  lobby: '/initial',
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
    setHost: (state, action) => {
      state.host = action.payload;
    },
    setLobby: (state, action) => {
      state.lobby = action.payload;
    },
  },
});

export const { setName, setRole, setHost, setLobby } = selfSlice.actions;

export default selfSlice.reducer;
