import { ChangeEvent, useReducer } from 'react';

interface State {
    name: string;
    nickname: string;
}

interface Action {
    name: string;
    value: string;
}

const reducer = (state: State, action: Action): State => {
    console.log(state, action);
    return {
        ...state,
        [action.name]: action.value,
    };
};

const useInputs = (initialState: State) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(e.target);
    };
    return { state, onChange };
};

export default useInputs;
