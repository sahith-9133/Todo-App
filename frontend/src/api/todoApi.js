import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/todos';

// Get all todos with optional completed filter
export const getAllTodos = (completed) => {
  const params = completed !== undefined ? { completed } : {};
  return axios.get(BASE_URL, { params });
};

// Get single todo by ID
export const getTodoById = (id) => axios.get(`${BASE_URL}/${id}`);

// Create new todo
export const createTodo = (todo) => axios.post(BASE_URL, todo);

// Update existing todo
export const updateTodo = (id, todo) => axios.put(`${BASE_URL}/${id}`, todo);

// Delete todo
export const deleteTodo = (id) => axios.delete(`${BASE_URL}/${id}`);
