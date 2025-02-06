const API_URL = "http://192.168.1.47:8080/tasks"; 

// Obtener tareas
export const fetchTasks = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Error al obtener las tareas");
  return response.json();
};

// Agregar una tarea
export const addTask = async (titulo: string, descripcion: string, estado: boolean = false) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descripcion, estado }), // Ahora enviamos el estado
  });
  if (!response.ok) throw new Error("Error al agregar la tarea");
  return response.json();
};

// Actualizar tarea
export const updateTask = async (taskId: number, titulo: string, descripcion: string, estado: boolean) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ titulo, descripcion, estado }), // Enviar estado como booleano
  });
  if (!response.ok) throw new Error("Error al actualizar la tarea");
  return response.json();
};

// Eliminar tarea
export const deleteTask = async (taskId: number) => {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Error al eliminar la tarea");
  return true; // Devuelve `true` si se eliminó correctamente
};
