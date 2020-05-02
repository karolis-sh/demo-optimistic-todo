import React, { useEffect, useState } from 'react';

import api from './api';
import TodoInput from './TodoInput';
import TodoList from './TodoList';
import Loader from './Loader';

export default function App() {
  const [shouldFetch, setShouldFetch] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (shouldFetch && !isFetching && !isAdding && !isToggling) {
      setIsFetching(true);
      api.getTodos().then((result) => {
        setTodos(result);
        setShouldFetch(false);
        setIsFetching(false);
      });
    }
  }, [shouldFetch, isFetching, isAdding, isToggling]);

  const addTodo = async (title) => {
    try {
      setIsAdding(true);
      await api.addTodo(title);
      setShouldFetch(true);
    } finally {
      setIsAdding(false);
    }
  };

  const onToggle = async (id) => {
    try {
      setIsToggling(true);
      await api.toggleTodo(id);
      setShouldFetch(true);
    } finally {
      setIsToggling(false);
    }
  };

  return (
    <div className="TodoApp">
      <h1>Todos {(isFetching || isAdding || isToggling) && <Loader />}</h1>
      <TodoInput addTodo={addTodo} />
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  );
}
