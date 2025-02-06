import React, { useState, useEffect } from "react";
import { updateTask } from "../services/taskService";

interface Props {
  task: {
    id: number;
    titulo: string;
    descripcion: string;
    estado: boolean; 
  };
  onUpdateTask: () => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, onUpdateTask, onDeleteTask }) => {
  const [completed, setCompleted] = useState<boolean>(task.estado); 

 
  useEffect(() => {
    setCompleted(task.estado);
  }, [task.estado]);

  // Cambiar el estado de la tarea en la base de datos
  const toggleCompletion = async () => {
    const newState = !completed; // 
    try {
      await updateTask(task.id, task.titulo, task.descripcion, newState);
      setCompleted(newState); 
      onUpdateTask(); 
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    }
  };

  return (
    <div className={`card task-card ${completed ? "bg-success text-white" : ""}`}>
      <div className="card-body">
        <h5 className="card-title">{task.titulo}</h5>
        <p className="card-text">{task.descripcion}</p>
        <div className="d-flex justify-content-between">
          <button
            className={`btn ${completed ? "btn-secondary" : "btn-success"} w-50`}
            onClick={toggleCompletion}
          >
            {completed ? "Desmarcar" : "Completar"}
          </button>
          <button
            className="btn btn-danger w-50 ms-2"
            onClick={() => onDeleteTask(task.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
