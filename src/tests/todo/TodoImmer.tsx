import { ChangeEvent, FormEvent, useCallback, useRef, useState } from 'react';

type ArrayType = {
    array: {
        id: number;
        name: string;
        username: string;
    }[];
    uselessValue: any;
};

const TodoImmer = () => {
    const nextId = useRef(1);
    const [form, setForm] = useState({ name: '', username: '' });
    const [data, setData] = useState<ArrayType>({ array: [], uselessValue: null });
    const onChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            const { name, value } = e.target;
            setForm({
                ...form,
                [name]: value,
            });
        },
        [form]
    );
    const onSubmit = useCallback(
        (e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setData({
                ...data,
                array: data.array.concat({
                    id: nextId.current,
                    name: form.name,
                    username: form.username,
                }),
            });
            setForm({ name: '', username: '' });
            nextId.current += 1;
        },
        [data, form]
    );
    const onRemove = useCallback(
        (id: number) => {
            setData({
                ...data,
                array: data.array.filter((d) => d.id !== id),
            });
        },
        [data]
    );
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="username" placeholder="아이디" value={form.username} onChange={onChange} />
                <input name="name" placeholder="이름" value={form.name} onChange={onChange} />
                <button type="submit">등록</button>
            </form>
            <div>
                <ul>
                    {data.array.map((d) => (
                        <li key={d.id} onClick={() => onRemove(d.id)}>
                            {d.username} ({d.name})
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TodoImmer;
