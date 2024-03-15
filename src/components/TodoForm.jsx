import {useState} from 'react';
import './TodoForm.css'; 

export const TodoForm = ({addTodo}) => {
  const [value, setValue] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== '') {
      addTodo(value);
      setValue('');
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
      <input type='text' 
        className={`todo-input ${hasError ? 'todo-input-error' : ''}`}
        value={value} placeholder='What do you need to do?' 
        onChange={(e) => {
        setValue(e.target.value);
        setHasError(false);
        }}/>
    
    <button type='submit' className='todo-btn'>Add Task</button>
    </form>
  );
};