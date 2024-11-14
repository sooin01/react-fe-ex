import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../stores/store';
import apiUtil from '../../../utils/ApiUtil';
import Page from '../../common/model/Page';
import Board from '../model/Barod';

interface BoardState {
  page: Page<Board>;
}

const initialState: BoardState = {
  page: {
    content: [],
    pageable: { pageNumber: 0, pageSize: 5 },
    totalElements: 0,
    totalPages: 0,
  },
};

export const getBoards = createAsyncThunk(
  'board/getBoards',
  async (
    { page, pageSize }: { page?: number; pageSize?: number },
    thunkAPI,
  ) => {
    const state = thunkAPI.getState() as RootState;
    page = page ? page : state.board.page.pageable.pageNumber;
    pageSize = page ? page : state.board.page.pageable.pageSize;
    const response = await apiUtil.get<Page<Board>>('/board/boards', {
      page: page,
      size: pageSize,
    });
    return response.data;
  },
);

const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoards.fulfilled, (state, action) => {
        state.page = action.payload;
      })
      .addCase(getBoards.rejected, (state, action) => {
        console.log(action.error.message);
      });
  },
});

export default boardSlice;
