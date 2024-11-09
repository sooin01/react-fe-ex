import { ChangeEvent, KeyboardEvent, useState } from 'react';

const EventPractice = () => {
    const [form, setForm] = useState({
        username: '',
        message: '',
    });
    const { username, message } = form;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const nextForm = {
            ...form,
            [e.target.name]: e.target.value,
        };
        setForm(nextForm);
    };
    const onClick = () => {
        setForm({ username: '', message: '' });
    };
    const onKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClick();
        }
    };
    return (
        <div>
            <input type="text" name="username" value={username} placeholder="사용자명" onChange={onChange} />
            <input
                type="text"
                name="message"
                value={message}
                placeholder="메시지내용"
                onChange={onChange}
                onKeyUp={onKeyUp}
            />
            <button onClick={onClick}>확인</button>
        </div>
    );
};

export default EventPractice;
