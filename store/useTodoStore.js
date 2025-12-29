import { create } from "zustand";

export const useTodoStore = create((set) => ({
  // état global
  todos: [],
  // actions
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
}));
