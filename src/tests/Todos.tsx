import { create } from 'zustand';

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodosStore = {
  input: string;
  todos: Todo[];
  set: (input: string) => void;
  insert: (input: string) => void;
  toggle: (id: number) => void;
  remove: (id: number) => void;
};

const useTodosStore = create<TodosStore>()((set) => ({
  input: '',
  todos: [],
  set: (input) => set((state) => ({ input })),
  insert: (input) =>
    set((state) => ({
      todos: state.todos.concat({
        id: state.todos.length + 1,
        text: input,
        done: false,
      }),
    })),
  toggle: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    })),
  remove: (id) =>
    set((state) => ({ todos: state.todos.filter((todo) => todo.id !== id) })),
}));

const Todos = () => {
  const { input, todos, set, insert, toggle, remove } = useTodosStore();
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (input) {
            insert(input);
            set('');
          }
        }}
      >
        <input value={input} onChange={(e) => set(e.target.value)} />
        <button type="submit">등록</button>
      </form>
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.done}
                readOnly={true}
                onClick={() => {
                  toggle(todo.id);
                }}
              />
              {todo.text}
              <button onClick={() => remove(todo.id)}>삭제</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todos;
