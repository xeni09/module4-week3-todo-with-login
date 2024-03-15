import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import './Todo.css';

export const Todo = ({task, toggleComplete, deleteTodo, editTodo}) => {
  const [bgColor, setBgColor] = React.useState('#0a9396');

  const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
    id: task.id,
    disabled: task.isEditing, 
  });


  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    backgroundColor: bgColor,
  };

  const handleToggleComplete = () => {
    toggleComplete(task.id);
    setBgColor(bgColor === '#0a9396' ? '#136466' : '#0a9396');
  };

  const handleEdit = (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    editTodo(task.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation(); // Stop event propagation
    deleteTodo(task.id);
  };

  
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className='Todo'>
      <FontAwesomeIcon  className='circle-icon'
  icon={task.completed ? faCheckCircle : faCircle} 
  onMouseDown={handleToggleComplete}
/>
        <p className={`${task.completed ? 'completed': ""}`}>{task.task}</p>
        <div className='icon-container'>
       
        <FontAwesomeIcon icon={faPenToSquare} 
        onMouseDown={handleEdit}
        style={{ pointerEvents: 'auto' }}

        />
<FontAwesomeIcon icon={faTrash} 
  onMouseDown={handleDelete}
/> 
        </div>
      </div>
  );
};