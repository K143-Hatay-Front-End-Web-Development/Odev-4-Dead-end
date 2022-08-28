import { configureStore } from '@reduxjs/toolkit';
import charReducer from './characters';

export const store = configureStore({
   reducer: {
      chars: charReducer
   },
});