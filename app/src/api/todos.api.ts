const apiUrl = "http://localhost:5000/api";

interface BaseResponse {
  data?: any;
  success: boolean;
  error?: string;
}

export const fetchTodos = async (): Promise<BaseResponse> => {
  return await fetch(`${apiUrl}/todos`).then((response) => response.json());
};

export const createTodo = async (title: string): Promise<BaseResponse> => {
  return await fetch(`${apiUrl}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  }).then((response) => response.json());
};

export const removeTodo = async (id: string | number) => {
  return await fetch(`${apiUrl}/todos/${id}`, { method: "DELETE" }).then(
    (response) => response.json()
  );
};

export const updateTodo = async (id: string | number, isDone: boolean) => {
  return await fetch(`${apiUrl}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isDone }),
  }).then((response) => response.json());
};
