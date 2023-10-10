import React, { useState } from 'react';

interface item {
    id: number;
    text: string;
    completed: boolean;
}

export const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<item[]>([
        { id: 1, text: "Finish Todo List", completed: false },
    ]);
    const [input, setInput] = useState<string>("");
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editingValue, setEditingValue] = useState<string>("");

    const handleToggle = (id: number) => {
        setTodos(
            todos.map((todo) => {
                if (todo.id === id) {
                    return { ...todo, completed: !todo.completed };
                }
                return todo;
            })
        );
    };

    const handleDelete = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleClick = () => {
        const newTodo: item = { id: Date.now(), text: input, completed: false };
        setTodos([...todos, newTodo]);
    }

    const handleEditStart = (id: number, text: string) => {
        setEditingId(id);
        setEditingValue(text);
    };

    const handleEditSubmit = (id: number) => {
        setTodos(todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, text: editingValue };
            }
            return todo;
        }));
        setEditingId(null);
        setEditingValue("");
    };

    return (
        <div className="main-container">
            <h1>Todo List</h1>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {
                            editingId === todo.id ? (
                                <>
                                    <input value={editingValue} onChange={e => setEditingValue(e.currentTarget.value)} />
                                    <button onClick={() => handleEditSubmit(todo.id)}>Submit</button>
                                </>
                            ) : (
                                <>
                                    <span 
                                        onClick={() => handleToggle(todo.id)} 
                                        style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                                    >
                                        {todo.text}
                                    </span>
                                    <button className="btn-delete" onClick={(e) => { e.stopPropagation(); handleDelete(todo.id); }}>Delete</button>
                                    <button className="btn-edit" onClick={(e) => { e.stopPropagation(); handleEditStart(todo.id, todo.text); }}>Edit</button>
                                </>
                            )
                        }
                    </li>
                ))}
            </ul>
            <input 
                type="text" 
                placeholder="Add todo item" 
                onChange={(e) => setInput(e.currentTarget.value)}
            />
            <button onClick={handleClick}>Add</button>
        </div>
    )
}
