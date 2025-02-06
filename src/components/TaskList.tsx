import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../services/taskService";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  titulo: string;
  descripcion: string;
}

interface TaskListProps {
  filter: string;
  reload: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ filter, reload }) => {
  const [tasks, setTasks] = useState<Task[]>([]); // Estado de las tareas
  const [loading, setLoading] = useState(false); // Estado de carga

  // Función para cargar tareas
  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks();
      console.log("Datos recibidos del backend:", data); // Verificar datos recibidos
      setTasks(data); // Actualizar estado con los datos
    } catch (error) {
      console.error("Error al cargar las tareas:", error); // Manejar errores
    } finally {
      setLoading(false);
    }
  };

  // useEffect para cargar tareas al montar el componente o al cambiar "reload"
  useEffect(() => {
    loadTasks();
  }, [reload]);

  // Función para manejar la eliminación de una tarea
  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      // Filtrar las tareas eliminando la que coincide con el ID
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  // Función para filtrar tareas basado en la prop "filter"
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      // Aquí puedes agregar lógica si usas un campo "completed"
      return false; // Ejemplo: task.completed === true
    } else if (filter === "pending") {
      // Aquí puedes agregar lógica si usas un campo "pending"
      return false; // Ejemplo: task.completed === false
    }
    return true; // Si no hay filtro, devolver todas las tareas
  });

  // Verificar las tareas que se renderizan
  console.log("Tareas a renderizar:", filteredTasks);

  return (
    <div>
      <h3 className="text-center mb-3">Lista de Tareas</h3>
      {loading && <p className="text-center">Cargando...</p>}
      <div className="row g-3">
        {/* Mostrar mensaje si no hay tareas */}
        {filteredTasks.length === 0 && !loading ? (
          <p className="text-center">No hay tareas disponibles.</p>
        ) : (
          // Renderizar las tareas disponibles
          filteredTasks.map((task) => (
            <div key={task.id} className="col-md-6">
              <TaskItem task={task} onDeleteTask={handleDeleteTask} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
