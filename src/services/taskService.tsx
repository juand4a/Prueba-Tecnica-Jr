const API_URL = "http://192.168.1.47:8081/api/Task"; // URL del backend en Spring Boot

// Obtener tareas desde la API
export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener las tareas");
  return response.json();
};

// Agregar una nueva tarea
export const addTask = async (titulo: string, descripcion: string) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descripcion }), // Los campos deben coincidir con los del backend
  });
  if (!response.ok) throw new Error("Error al agregar la tarea");
  return response.json();
};

// Eliminar una tarea por ID
export const deleteTask = async (taskId: number) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar la tarea");
  return response.json();
};

// Actualizar una tarea por ID
export const updateTask = async (taskId: number, titulo: string, descripcion: string) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descripcion }),
  });
  if (!response.ok) throw new Error("Error al actualizar la tarea");
  return response.json();
};
