import { useState } from 'react';
import { MdAdd } from 'react-icons/md';
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }: { onInsert: (text: string) => void }) => {
    const [value, setValue] = useState('');
    return (
        <div>
            <form
                className="TodoInsert"
                onSubmit={(e) => {
                    if (value) {
                        onInsert(value);
                        setValue('');
                    }
                    e.preventDefault();
                }}
            >
                <input
                    placeholder="할 일을 입력하세요"
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                />
                <button type="submit">
                    <MdAdd />
                </button>
            </form>
        </div>
    );
};

export default TodoInsert;
