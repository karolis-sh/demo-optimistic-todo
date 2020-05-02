const random = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const delay = (fn) => (...args) =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      try {
        resolve(fn(...args));
      } catch (err) {
        reject(err);
      }
    }, random(1000, 2000))
  );

let seq = 0;
const id = () => ++seq;

const todos = [
  { id: id(), title: 'Make some coffee', completed: true },
  { id: id(), title: 'Write some code', completed: false },
  { id: id(), title: 'Chill', completed: false },
];

export default {
  getTodos: delay(() => todos),
  addTodo: delay((title) => {
    const todo = todos.find((item) => item.title.toLowerCase() === title.toLowerCase());
    if (todo) {
      throw new Error('Todo already in list');
    } else {
      todos.push({ id: id(), title, completed: false });
    }
  }),
  toggleTodo: delay((id) => {
    const todo = todos.find((item) => item.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    } else {
      throw new Error();
    }
  }),
};
