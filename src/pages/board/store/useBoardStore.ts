import { create } from 'zustand';
import apiUtil from '../../../utils/ApiUtil';
import Page from '../../common/model/Page';
import Board from '../model/Barod';

interface BoardState {
  page: Page<Board>;
  board?: Board | null;
  getBoards: ({
    page,
    pageSize,
  }: {
    page?: number;
    pageSize?: number;
  }) => Promise<void>;
  getBoard: (seq: number) => Promise<void>;
  clearBoards: () => void;
  setBoard: (_board: Board) => void;
  saveBoard: (_board: Board) => Promise<Board>;
  deleteBoard: (seqs: number[]) => Promise<void>;
}

const initialState = {
  content: [],
  pageable: { pageNumber: 0, pageSize: 5 },
  totalElements: 0,
  totalPages: 0,
};

const useBoardStore = create<BoardState>((set, get) => ({
  page: initialState,
  getBoards: async ({
    page = get().page?.pageable.pageNumber,
    pageSize = get().page?.pageable.pageSize,
  }) => {
    const response = await apiUtil.get<Page<Board>>('/board/boards', {
      page: page,
      size: pageSize,
    });
    if (response) {
      set((state) => ({
        page: response.data,
        Board: null,
      }));
    }
  },
  getBoard: async (seq) => {
    const response = await apiUtil.get<Board>(`/board/boards/${seq}`);
    set((state) => ({ board: response.data }));
  },
  clearBoards: () => {
    set({ page: initialState });
  },
  setBoard: (_board) => {
    set((state) => ({
      board: _board,
    }));
  },
  saveBoard: async (_board) => {
    const response = await apiUtil.post<Board>('/board/boards', _board);
    return response.data;
  },
  deleteBoard: async (seqs) => {
    await apiUtil.delete('/board/boards', {
      seqs: seqs,
    });
  },
}));

export default useBoardStore;
