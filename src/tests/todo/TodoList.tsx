import { useCallback, useRef, useState } from 'react';
import { List } from 'react-virtualized';
import TodoInsert from './TodoInsert';
import './TodoList.scss';
import TodoListItem from './TodoListItem';

export interface Todo {
    id: number;
    text: string;
    checked: boolean;
}

const TodoList = () => {
    const todoArr = [];
    for (let i = 1; i <= 5000; i++) {
        todoArr.push({
            id: i,
            text: `할 일 ${i}`,
            checked: false,
        });
    }

    const [todos, setTodos] = useState<Todo[]>(todoArr);
    const nextId = useRef(todos.length + 1);
    const onRemove = useCallback((id: number) => {
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
    }, []);
    const onToggle = useCallback((id: number) => {
        setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, checked: !todo.checked } : todo)));
    }, []);
    return (
        <div>
            <TodoInsert
                onInsert={useCallback((text: string) => {
                    setTodos((todos) =>
                        todos.concat({
                            id: nextId.current,
                            text,
                            checked: false,
                        })
                    );
                    nextId.current += 1;
                }, [])}
            />
            {/* <div className="TodoList">
                {todos.map((todo) => (
                    <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />
                ))}
            </div> */}
            <List
                className="TodoList"
                width={512}
                height={413}
                rowCount={todos.length}
                rowHeight={56}
                rowRenderer={useCallback(
                    ({ index, key, style }) => {
                        const todo = todos[index];
                        return (
                            <TodoListItem todo={todo} key={key} onRemove={onRemove} onToggle={onToggle} style={style} />
                        );
                    },
                    [onRemove, onToggle, todos]
                )}
                list={todos}
                style={{ outline: 'none' }}
            ></List>
        </div>
    );
};

export default TodoList;
