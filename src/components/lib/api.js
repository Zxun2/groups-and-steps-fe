import { API_URL } from "../../actions/apiUrl";

// LOG USER IN
export const LoggingIn = async (email, password) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  // Error is handled by the Try-Catch blog in Login.jsx
  if (response.status === 422 || !response.ok) {
    if (!response.ok) {
      throw new Error("Something went wrong! Please try again.");
    }
    throw new Error(data.message);
  }

  const token = data.auth_token;
  const user = data.user;

  return { user, token };
};

// REGISTER USER IN
export const Register = async (name, email, password, passwordConfirmation) => {
  const response = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });

  const data = await response.json();

  // Error is handled by the Try-Catch blog in Login.jsx
  if (response.status === 422 || !response.ok) {
    if (!response.ok) {
      throw new Error("Something went wrong! Please try again.");
    }
    throw new Error(data.message);
  }

  const { message, auth_token: token, user } = data;

  return { message, user, token };
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
export async function addTodo(token, todoData) {
  const response = await fetch(`${API_URL}/todos`, {
    method: "POST",
    body: JSON.stringify(todoData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  if (response.status === 422) {
    throw new Error(data.message);
  }

  return data;
}

// UPDATE TODO
export async function updateTodo(token, id, content) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "PUT",
    body: JSON.stringify(content),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("There was an error updating the Todo.");
  }
  const data = await response.json();

  return data;
}

// DELETE TODO
export async function deleteTodo(token, id) {
  const response = await fetch(`${API_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("There was an error deleting the Todo.");
  }
  const data = await response.json();

  return data;
}

// FETCH STEPS
export async function fetchSteps(token, id) {
  const response = await fetch(`${API_URL}/todos/${id}/items`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("There was an error fetching the Steps.");
  }
  const data = await response.json();

  return data;
}

// UPDATE STEPS
export async function updateStep(token, todo_id, step_id, content) {
  const response = await fetch(`${API_URL}/todos/${todo_id}/items/${step_id}`, {
    method: "PUT",
    body: JSON.stringify(content),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("There was an error updating the Step.");
  }
  const data = await response.json();

  return data;
}

// Add STEP
export async function addStep(token, stepData, todo_id) {
  const newStepData = { ...stepData, completed: false };
  const response = await fetch(`${API_URL}/todos/${todo_id}/items`, {
    method: "POST",
    body: JSON.stringify(newStepData),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("There was an error creating the Step.");
  }
  const data = await response.json();

  return data;
}

// DELETE TODO
export async function deleteStep(token, todo_id, step_id) {
  const response = await fetch(`${API_URL}/todos/${todo_id}/items/${step_id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("There was an error deleting the Step.");
  }
  const data = await response.json();

  return data;
}
