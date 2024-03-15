import { useState } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';


export const TodoWrapper = () => {
    const [todos, setTodos] = useState([]);
  
    const addTodo = todo => {
        setTodos([...todos, {id: uuidv4(), task: todo, completed: false, isEditing: false }]);
        console.log(todos);
    };
      
    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id === id ? {... todo, completed: !todo.completed} : todo ))
    };

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const editTodo = id => {
        setTodos(todos.map (todo => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
    }
    const sensors = useSensors(
        useSensor(PointerSensor, {activationConstraint: {delay: 1, tolerance: 0}}),
        useSensor(KeyboardSensor)
      );

        const handleDragEnd = (event) => {
            const {active, over} = event;
            const activeTodo = todos.find((todo) => todo.id === active.id);
          
            // If any todo item is being edited, return early
            if (todos.some(todo => todo.isEditing)) {
              return;
            }
          
            // If over is null or the active and over elements are the same, return early
            if (!over || active.id === over.id) {
              return;
            }
          
            if (activeTodo) {
              setTodos((todos) => {
                const oldIndex = todos.findIndex((todo) => todo.id === active.id);
                const newIndex = todos.findIndex((todo) => todo.id === over.id);
                return arrayMove(todos, oldIndex, newIndex);
              });
            }
          };

    return (
      <div className='TodoWrapper'>
          <h1>ToDo List</h1>
          <TodoForm addTodo={addTodo} />
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={todos.map((todo) => todo.id)} strategy={verticalListSortingStrategy}>
                  {todos.map((todo, index) => (
                      todo.isEditing ? (
                          <EditTodoForm key={todo.id} editTodo={editTask} task={todo}/> 
                      ) : (
                          <Todo 
                              key={todo.id}
                              task={todo}
                              toggleComplete={toggleComplete}
                              deleteTodo={deleteTodo} 
                              editTodo={editTodo} 
                          />
                      )
                  ))}
              </SortableContext>
          </DndContext>
      </div>
  );
};