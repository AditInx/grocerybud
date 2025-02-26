import { useState, useEffect } from "react";

function List() {
  const [task, setTask] = useState("");
  const [newTask, setNewTask] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const [checkedTasks, setCheckedTasks] = useState({});

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const storedChecked =
      JSON.parse(localStorage.getItem("checkedTasks")) || {};
    setNewTask(storedTasks);
    setCheckedTasks(storedChecked);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(newTask));
    localStorage.setItem("checkedTasks", JSON.stringify(checkedTasks));
  }, [newTask, checkedTasks]);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (editTask !== null) {
      setNewTask((prev) =>
        prev.map((item) =>
          item.id === editTask ? { ...item, text: task } : item
        )
      );
      setEditTask(null);
    } else {
      const newId = Date.now();
      setNewTask((prev) => [...prev, { id: newId, text: task }]);
      setCheckedTasks((prev) => ({ ...prev, [newId]: false }));
    }
    setTask("");
  };

  const handleDeleteTask = (id) => {
    setNewTask((prev) => prev.filter((removeTask) => removeTask.id !== id));
    setCheckedTasks((prev) => {
      const updatedTasks = { ...prev };
      delete updatedTasks[id];
      return updatedTasks;
    });
  };

  const handleEditTask = (id) => {
    const foundTask = newTask.find((task) => task.id === id);
    if (foundTask) {
      setTask(foundTask.text);
      setEditTask(id);
    }
  };

  const handleCheck = (id) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleClearAll = () => {
    setNewTask([]);
    setCheckedTasks({});
    localStorage.removeItem("tasks");
    localStorage.removeItem("checkedTasks");
  };

  return (
    <section className="section-center">
      <form onSubmit={(e) => e.preventDefault()} className="grocery-form">
        <h3>Grocery Bud</h3>

        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="e.g. eggs"
            value={task}
            onChange={handleChange}
          />
          <button
            type="submit"
            onClick={handleAddTask}
            className="submit-btn"
            disabled={task.trim() === ""}
          >
            {editTask !== null ? "Update" : "Add"}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        {newTask.map((addTask) => (
          <ul key={addTask.id}>
            <li className="grocery-item">
              {editTask !== addTask.id && (
                <input
                  type="checkbox"
                  checked={checkedTasks[addTask.id] || false}
                  onChange={() => handleCheck(addTask.id)}
                />
              )}
              <span className={checkedTasks[addTask.id] ? "checked" : ""}>
                {addTask.text}
              </span>
              <button
                className={checkedTasks[addTask.id] ? "display" : "edit-btn"}
                onClick={() => handleEditTask(addTask.id)}
              >
                Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDeleteTask(addTask.id)}
              >
                Remove
              </button>
            </li>
          </ul>
        ))}
      </div>
      {newTask.length > 0 && (
        <button className="clear-btn" onClick={handleClearAll}>
          Clear all Items
        </button>
      )}
    </section>
  );
}

export default List;
