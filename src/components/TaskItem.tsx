import React, { useState } from "react";

interface Props {
  task: {
    id: number;
    titulo: string;
    descripcion: string;
  };
  onDeleteTask: (taskId: number) => void;
}

const TaskItem: React.FC<Props> = ({ task, onDeleteTask }) => {
  const [completed, setCompleted] = useState(false); // Se maneja localmente

  return (
    <div className={`card task-card ${completed ? "task-completed" : ""}`}>
      <div className="card-body">
        <h5 className="card-title">{task.titulo}</h5>
        <p className="card-text">{task.descripcion}</p>
        <div className="d-flex justify-content-between">
          <button
            className={`btn ${completed ? "btn-secondary" : "btn-success"} w-50`}
            onClick={() => setCompleted(!completed)}
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
