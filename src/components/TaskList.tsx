import React, { useEffect, useState } from "react";
import { fetchTasks, deleteTask } from "../services/taskService";
import TaskItem from "./TaskItem";

interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  estado: boolean; 
}

interface TaskListProps {
  filter: string;
  reload: boolean;
}

const TaskList: React.FC<TaskListProps> = ({ filter, reload }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks(); // Carga todas las tareas desde el backend
      setTasks(data); // Actualiza el estado local con las tareas cargadas
    } catch (error) {
      console.error("Error al cargar las tareas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [reload]);

  const handleDeleteTask = async (taskId: number) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId)); 
    } catch (error) {
      console.error("Error al eliminar la tarea:", error);
    }
  };

  // Filtrar tareas basado en el estado booleano
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.estado === true;
    } else if (filter === "pending") {
      return task.estado === false; 
    }
    return true;
  });

  return (
    <div>
      <h3 className="text-center mb-3">Lista de Tareas</h3>
      {loading && <p className="text-center">Cargando...</p>}
      <div className="row g-3">
        {filteredTasks.length === 0 && !loading ? (
          <p className="text-center">No hay tareas disponibles.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="col-md-6">
              <TaskItem task={task} onDeleteTask={handleDeleteTask} onUpdateTask={loadTasks} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskList;
