import { createSlice } from '@reduxjs/toolkit';

const initialState = { characters: [], isEmpty: true, offset: 0 };

const charSlice = createSlice({
   name: 'characters',
   initialState,
   reducers: {
      update(state, action) {
         state.characters = [...state.characters, ...action.payload.newCharacters];
         state.isEmpty = state.characters.length === 0;
         state.offset += 30;
      }
   }
});

export const { update } = charSlice.actions;
export default charSlice.reducer;
