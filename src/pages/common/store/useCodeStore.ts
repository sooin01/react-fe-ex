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
    const response = await ApiUtil.get<Code[]>('/code/codes', {
      codeGroupIds: codeGroupIds,
    });

    const map = new Map<string, Code[]>();
    response.data.forEach((code) => {
      if (!map.has(code.codeGroupId)) {
        map.set(code.codeGroupId, []);
      }
      map.get(code.codeGroupId)?.push(code);
    });

    set({ codes: map });
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
