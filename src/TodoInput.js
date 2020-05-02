import React, { useState } from 'react';

export default function TodoInput({ addTodo }) {
  const [text, setText] = useState('');
  const [error, setError] = useState();
  const [isAdding, setIsAdding] = useState();

  const onSubmit = async (e) => {
    e.preventDefault();
    e.persist();

    setError();
    if (!text || isAdding) return;
    setIsAdding(true);
    try {
      await addTodo(text);
      setText('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <form className="TodoInput" onSubmit={onSubmit}>
      <div>
        <input placeholder="New todo" value={text} onChange={(e) => setText(e.target.value)} />
        <button type="submit" disabled={isAdding}>
          ADD
        </button>
      </div>
      {error && <p className="TodoInput__error">{error}</p>}
    </form>
  );
}
