import { create } from 'zustand';
import ApiUtil from '../../../utils/ApiUtil';
import Code from '../model/Code';

interface CodeState {
  codes: Map<string, Code[]>;
  getCodes: (codeGroupIds: string[]) => Promise<void>;
  getCode: (codeGroupId: string, codeId: string) => string;
}

const useCodeStore = create<CodeState>((set, get) => ({
  codes: new Map(),
  getCodes: async (codeGroupIds) => {
    const response = await ApiUtil.get<Map<string, Code[]>>('/code/codes', {
      codeGroupIds: codeGroupIds,
    });
    if (response) {
      set({ codes: new Map(Object.entries(response.data)) });
    }
  },
  getCode: (codeGroupId: string, codeId: string) => {
    return (
      get()
        .codes.get(codeGroupId)
        ?.find((code) => code.codeId === codeId)?.codeName ?? codeId
    );
  },
}));

export default useCodeStore;
