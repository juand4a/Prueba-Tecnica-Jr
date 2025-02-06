import React, { useState } from "react";
import { addTask } from "../services/taskService";

interface Props {
  onTaskAdded: () => void;
  onFilterChange: (filter: string) => void; // Nueva función de filtrado
}

const Form: React.FC<Props> = ({ onTaskAdded, onFilterChange }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    try {
      await addTask(title, description);
      setTitle("");
      setDescription("");
      onTaskAdded(); // Actualizar lista de tareas
    } catch (error) {
      console.error("Error al agregar la tarea", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-3">
        <h5 className="text-center">Agregar Tarea</h5>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-100">Agregar</button>
      </form>

      <h5 className="text-center mb-4">Filtros</h5>

      <select className="form-control" onChange={(e) => onFilterChange(e.target.value)}>
        <option value="all">Todas</option>
        <option value="completed">Completadas</option>
        <option value="pending">Pendientes</option>
      </select>
    </div>
  );
};

export default Form;
