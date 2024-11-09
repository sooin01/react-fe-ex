import { useState } from 'react';

const IterationSample = () => {
    const [names, setNames] = useState([
        {
            id: 1,
            text: '눈사람',
        },
        {
            id: 2,
            text: '눈사람',
        },
    ]);
    const [inputText, setInputText] = useState('');
    const [nextId, setNextId] = useState(names.length + 1);
    const onClick = () => {
        setNames(
            names.concat({
                id: nextId,
                text: inputText || 'Empty',
            })
        );
        setNextId(nextId + 1);
        setInputText('');
    };
    return (
        <div>
            <input
                value={inputText}
                onChange={(e) => {
                    setInputText(e.target.value);
                }}
            />
            <button onClick={onClick}>추가</button>
            <ul>
                {names.map((name) => (
                    <li
                        key={name.id}
                        onDoubleClick={() => {
                            setNames(names.filter((_name) => _name.id !== name.id));
                        }}
                    >
                        {name.text + '' + name.id}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IterationSample;
