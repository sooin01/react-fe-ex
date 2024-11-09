import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

type ColorContextType = {
  state: { color: string; subcolor: string };
  actions: {
    setColor: Dispatch<SetStateAction<string>>;
    setSubcolor: Dispatch<SetStateAction<string>>;
  };
};

const ColorContext = createContext<ColorContextType>({
  state: { color: 'black', subcolor: 'red' },
  actions: {
    setColor: () => {},
    setSubcolor: () => {},
  },
});

export const ColorProvider = ({ children }: { children: ReactNode }) => {
  const [color, setColor] = useState('black');
  const [subcolor, setSubcolor] = useState('red');
  const value: ColorContextType = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor },
  };
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

export const ColorConsumer = ColorContext.Consumer;

export default ColorContext;
