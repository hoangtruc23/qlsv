import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  id: number,
  full_name: string,
  card_id: number,
  role: number,
}

const storedUser = localStorage.getItem('user');

const initialState: UserState = storedUser && storedUser != 'undefined'
  ? JSON.parse(storedUser)
  : {
    id: 0,
    fullname: '',
    card_id: 0,
    role: 0
  };

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.full_name = action.payload.full_name;
      state.card_id = action.payload.card_id;
      state.role = action.payload.role;
    },
    clearUser: (state) => {
      state.id = 0;
      state.full_name = '';
      state.card_id = 0;
      state.role = 0;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;