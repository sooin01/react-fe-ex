import cn from 'classnames';
import { CSSProperties, memo } from 'react';
import { MdCheckBox, MdCheckBoxOutlineBlank, MdRemoveCircleOutline } from 'react-icons/md';
import { Todo } from './TodoList';
import './TodoListItem.scss';

type TodoListItemType = {
    todo: Todo;
    onRemove: (id: number) => void;
    onToggle: (id: number) => void;
    style: CSSProperties;
};

const TodoListItem = ({ todo, onRemove, onToggle, style }: TodoListItemType) => {
    const { id, text, checked } = todo;
    return (
        <div className="TodoListItem-virtualized" style={style}>
            <div className="TodoListItem">
                <div className={cn('checkbox', { checked })} onClick={() => onToggle(id)}>
                    {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
                    <div className="text">{text}</div>
                </div>
                <div className="remove" onClick={() => onRemove(id)}>
                    <MdRemoveCircleOutline />
                </div>
            </div>
        </div>
    );
};

export default memo(TodoListItem);
