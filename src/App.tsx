import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskForm from "./components/Form";
import TaskList from "./components/TaskList";
import "./css/index.css";

const App: React.FC = () => {
  const [filter, setFilter] = useState("all"); 
  const [reload, setReload] = useState(false); 

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Gestor de Tareas</h1>
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card task-card p-3">
                <TaskForm 
                  onTaskAdded={() => setReload(!reload)} 
                  onFilterChange={setFilter} 
                />
              </div>
            </div>
            <div className="col-md-8">
              <div className="card task-card p-3">
                <TaskList filter={filter} reload={reload} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
