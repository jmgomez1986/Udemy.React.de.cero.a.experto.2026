import * as z from 'zod';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  pending: number;
  completed: number;
}

export type TaskAction =
  | { type: 'ADD_TODO'; payload: { text: string } }
  | { type: 'TOGGLE_TODO'; payload: { id: number } }
  | { type: 'DELETE_TODO'; payload: { id: number } };

const TodoSheme = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const TaskStateScheme = z.object({
  todos: z.array(TodoSheme),
  length: z.number(),
  pending: z.number(),
  completed: z.number(),
});

export const getTaskInitialState = (): TaskState => {
  const localStorageInitialState = localStorage.getItem('taskState');

  if (localStorageInitialState) {
    const result = TaskStateScheme.safeParse(
      JSON.parse(localStorageInitialState),
    );

    if (result.error) {
      return {
        todos: [],
        length: 0,
        pending: 0,
        completed: 0,
      };
    }
    return JSON.parse(localStorageInitialState);
  }

  return {
    todos: [],
    length: 0,
    pending: 0,
    completed: 0,
  };
};

export const taskReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newState = {
        id: Date.now(),
        text: action.payload.text,
        completed: false,
      };

      return {
        ...state,
        todos: [newState, ...state.todos],
        length: state.todos.length + 1,
        pending: state.pending + 1,
      };
    }

    case 'DELETE_TODO': {
      const updatedTodos = state.todos.filter(
        (todo) => todo.id !== action.payload.id,
      );

      return {
        ...state,
        todos: updatedTodos,
        length: updatedTodos.length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
        completed: updatedTodos.filter((todo) => todo.completed).length,
      };
    }

    case 'TOGGLE_TODO': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }

        return todo;
      });
      return {
        ...state,
        todos: updatedTodos,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
        completed: updatedTodos.filter((todo) => todo.completed).length,
      };
    }

    default:
      return state;
  }
};
