import useInputs from './hooks/useInputs';

const Info = () => {
  const { state, onChange } = useInputs({
    name: '',
    nickname: '',
  });

  return (
    <div>
      <div>
        <b>Name: </b>
        <input name="name" value={state.name} onChange={onChange} />
        <b>Nickname: </b>
        <input name="nickname" value={state.nickname} onChange={onChange} />
      </div>
    </div>
  );
};

export default Info;
