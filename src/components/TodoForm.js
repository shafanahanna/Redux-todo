import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { addtodo, deletetodo, edittodo, toggleComplete } from '../Redux/todoSlice';
import { Button, Form, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function TodoForm() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo);
  const [add, setAdd] = useState("");
  const [edit, setEdit] = useState(null); 

  const handleaddtodo = () => {
    if (add !== "") {
      if (edit !== null) {
        dispatch(edittodo({ id: edit, title: add }));
        setEdit(null);
      } else {
        dispatch(addtodo(add));
      }
      setAdd("");
    }
  };

  const handlecomplete = (id, completed) => {
    dispatch(toggleComplete({ id, completed: !completed }));
  };

  const handledeletetodo = (id) => {
    dispatch(deletetodo(id));
  };

  const handleedittodo = (id, title) => {
    setAdd(title);
    setEdit(id);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title text-center text-black mt-4 mb-4">Make Everyday Productive</h1>
      <Form className="add-todo mb-3">
        <Form.Control
          type="text"
          value={add}
          onChange={(e) => setAdd(e.target.value)}
          placeholder="Add a new task"
          className="todo-input mr-2"
        />
        <span>
          <Button
            onClick={handleaddtodo}
            className={`todo-button ${edit !== null ? 'btn-warning' : 'btn-success'}`}
          >
            {edit !== null ? 'Edit Task' : 'Add Task'}
          </Button>
        </span>
      </Form>
      <ListGroup className="todo-list">
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center todo-item mb-2">
            <input
              type="checkbox"
              className="mr-3"
              onClick={() => handlecomplete(todo.id, todo.completed)}
              checked={todo.completed}
            />
            <span>{todo.title}</span>
            <div>
              <Button
                onClick={() => handledeletetodo(todo.id)}
                variant="danger"
                size="sm"
                className="delete-button ml-3"
              >
                Delete
              </Button>
              <Button
                onClick={() => handleedittodo(todo.id, todo.title)}
                variant="primary"
                size="sm"
                className="edit-button"
              >
                Edit
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h4 className='mt-3'>Total completed items: {todos.filter((todo) => todo.completed === true).length}</h4>
    </div>
  );
}

export default TodoForm;



