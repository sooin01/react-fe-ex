import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
  async ({
    pageNumber,
    pageSize,
  }: {
    pageNumber?: number;
    pageSize?: number;
  }) => {
    const response = await apiUtil.get<Page<Board>>('/board/boards', {
      page: pageNumber,
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
    // getBoards
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
