import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTodo, updateTodo } from '../features/todos/todoSlice';

const Todo = () => {
    const dispatch = useDispatch();
    const todos = useSelector(state => state.todos);
    const [editId, setEditId] = useState('');
    const [editText, setEditText] = useState('');
    const handleEdit = (todo) => {
        setEditId(todo.id);
        setEditText(todo.text);
    }
    const handleSave = (id) => {
        dispatch(updateTodo({id, text: editText}));
        setEditId(null);
    }
  return (
    <ul className='list-none px-5'>
        {todos.map((todo) => (
            <li className='mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded text-white' key={todo.id}>
                {editId === todo.id ? (<input type='text' value={editText} onChange={(e) => (e.target.value)} className='text-black px-2 py-1 rounded'/>) : (<div>{todo.text}</div>)}
                <div className='flex gap-3'>
                {editId === todo.id ? ( <button className='text-white bg-green-500 border-1 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-base' onClick={() => handleSave(todo.id)}>Save</button>) : (
                    <button className='text-white bg-green-500 border-1 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-base' onClick={() => handleEdit(todo)}>Edit</button>)}
                <button onClick={(e) => dispatch(removeTodo(todo.id))} className='text-white bg-red-500 border-1 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-base'>Delete</button>
                </div>
            </li>
        ))}
    </ul>
  )
}

export default Todo