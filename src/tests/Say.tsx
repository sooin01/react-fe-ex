import { useState } from 'react';

const Say = () => {
    const [message, setMessage] = useState('');
    const [color, setColor] = useState('blue');
    return (
        <div>
            <button onClick={() => setMessage('안녕하세요.')}>입장</button>
            <button onClick={() => setMessage('안녕히가세요.')}>퇴장</button>
            <h1 style={{ color }}>{message}</h1>
        </div>
    );
};

export default Say;
