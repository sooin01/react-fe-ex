import useStore from './stores/useStore';

const Counter = () => {
  const { count, increase, decrease } = useStore();
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{count}</b>입니다.
      </p>
      <button onClick={increase}>+1</button>
      <button onClick={decrease}>-1</button>
    </div>
  );
};

export default Counter;
