import { API_URL } from "../../actions/apiUrl";

// LOG USER IN
export const LoggingIn = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Accept: "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (!response.ok) {
    throw new Error("Something Went Wrong!");
  }

  const data = await response.json();
  const token = data.auth_token;
  const user = data.user;

  return { user, token };
};

// FETCH TODO DATA
export const fetchData = async (token) => {
  const response = await fetch(`${API_URL}/todos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Fetching todo data failed!");
  }
  const todos = await response.json();

  return todos;
};

// Add TODO
export async function addTodo(todoData, token) {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: JSON.stringify(todoData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not create Todo.");
  }
  const data = await response.json();

  return data;
}

// Update Todo
export async function updateTodo(id, token, content) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(content),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not update Todo.");
  }
  const data = await response.json();

  return data;
}

// Update Todo
export async function deleteTodo(id, token) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Could not delete Todo.");
  }
  const data = await response.json();

  return data;
}

// FETCH STEPS
export async function fetchSteps(id, token) {
  const response = await fetch(`${API_URL}/todos/${id}/items`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Fetching steps failed");
  }
  const data = await response.json();

  return data;
}
