import { ChangeEvent, useCallback, useMemo, useRef, useState } from 'react';

const Average = () => {
    const getAverage = (numbers: number[]) => {
        console.log('평균 계산 중..');
        if (numbers.length === 0) return 0;
        return numbers.reduce((a, b) => a + b) / numbers.length;
    };
    const [list, setList] = useState<number[]>([]);
    const [number, setNumber] = useState<string>('');
    const inputEl = useRef<HTMLInputElement>(null);
    return (
        <div>
            <input
                value={number}
                onChange={useCallback((e: ChangeEvent<HTMLInputElement>) => {
                    setNumber(e.target.value);
                }, [])}
                ref={inputEl}
            />
            <button
                onClick={useCallback(() => {
                    if (number) {
                        setList(list.concat(parseInt(number)));
                        setNumber('');
                        inputEl.current!.focus();
                    }
                }, [list, number])}
            >
                등록
            </button>
            <ul>
                {list.map((value, index) => (
                    <li key={index}>{value}</li>
                ))}
            </ul>
            <div>
                <b>평균값:</b> {useMemo(() => getAverage(list), [list])}
            </div>
        </div>
    );
};

export default Average;
