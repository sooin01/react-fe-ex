import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CommentState {
  reply: string;
}

const initialState: CommentState = {
  reply: '',
};

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setReply: (state, action: PayloadAction<string>) => {
      state.reply = action.payload;
    },
  },
});

export default commentSlice;
