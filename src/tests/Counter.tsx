import { useAppDispatch, useAppSelector } from '../stores/hooks';
import { decrement, increment } from './stores/slices/counterSlice';

const Counter = () => {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{count}</b>입니다.
      </p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
    </div>
  );
};

export default Counter;
