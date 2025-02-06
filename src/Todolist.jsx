import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import './style.css'; 

export default function Todolist() {
    let [todo, settodo] = useState([{ task: "Sample Task", id: uuidv4(), isDone: false }]);
    let [newtodo, setnewtodo] = useState("");
    let [editingId, setEditingId] = useState(null);
    let [editedTask, setEditedTask] = useState("");

    let addnewtask = () => {
        if (newtodo.trim() === "") return;
        settodo((prevTodos) => [
            ...prevTodos, { task: newtodo, id: uuidv4(), isDone: false }
        ]);
        setnewtodo("");
    };

    let updatetodovalue = (event) => {
        setnewtodo(event.target.value);
    };

    let deletetodo = (id) => {
        settodo((prevTodos) => prevTodos.filter((item) => item.id !== id));
    };

    let startEditing = (id, task) => {
        setEditingId(id);
        setEditedTask(task);
    };

    let saveEditedTask = (id) => {
        settodo((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, task: editedTask } : todo
            )
        );
        setEditingId(null);
        setEditedTask("");
    };

    let toggleTask = (id) => {
        settodo((prevTodos) =>
            prevTodos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    return (
        <>
            <div className="todo-container">
                <h1 className="header">Todo List</h1>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Add a Task"
                        value={newtodo}
                        onChange={updatetodovalue}
                        className="input-box"
                    />
                    <button className="add-btn" onClick={addnewtask}>Add Task</button>
                </div>

                <hr className="divider" />
                <h4 className="task-title">Tasks Todo</h4>
                <ul className="todo-list">
                    {todo.map((item) => (
                        <li key={item.id} className="todo-item">
                            {editingId === item.id ? (
                                <input
                                    type="text"
                                    value={editedTask}
                                    onChange={(e) => setEditedTask(e.target.value)}
                                    className="edit-input"
                                    
                                />
                            ) : (
                                <span className={`todo-text ${item.isDone ? 'done' : ''}`}>
                                    {item.task}
                                </span>
                            )}
                            <div className="button-group">
                                {editingId === item.id ? (
                                    <button className="save-btn" onClick={() => saveEditedTask(item.id)}>Save</button>
                                ) : (
                                    <>
                                        <button className="edit-btn" onClick={() => startEditing(item.id, item.task)}>Edit</button>
                                        <button className="delete-btn" onClick={() => deletetodo(item.id)}>Delete</button>
                                        <button className="done-btn" onClick={() => toggleTask(item.id)}>
                                            {item.isDone ? "Undo" : "Mark as Done"}
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}
