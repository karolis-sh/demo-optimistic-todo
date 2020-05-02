import React, { useState } from 'react';

export default function TodoInput({ addTodo }) {
  const [text, setText] = useState('');
  const [error, setError] = useState();

  const onSubmit = async e => {
    e.preventDefault();
    e.persist();

    setError();
    if (!text) return;
    try {
      await addTodo(text);
      setText('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="TodoInput" onSubmit={onSubmit}>
      <div>
        <input placeholder="New todo" value={text} onChange={e => setText(e.target.value)} />
        <button type="submit">ADD</button>
      </div>
      {error && <p className="TodoInput__error">{error}</p>}
    </form>
  );
}
