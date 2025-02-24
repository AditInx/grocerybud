import { useState } from "react";

function List() {
  const [task, setTask] = useState("");
  const [newTask, setNewTask] = useState([]);
  const [editTask, setEditTask] = useState(null);
  const handleChange = (e) => {
    e.preventDefault();
    setTask(e.target.value);
  };
  const handleAddTask = () => {
    if (editTask !== null) {
      setNewTask(
        newTask.map((item) =>
          item.id === editTask ? { ...item, text: task } : item
        )
      );
      setEditTask(null);
    } else {
      setNewTask([...newTask, { id: Date.now(), text: task }]);
    }
    setTask("");
    
  };
  const handleDeleteTask = (id) => {
    setNewTask(newTask.filter((removeTask)=> removeTask.id !== id));
  }
  const handleEditTask = (id) => {
    const foundTask = newTask.find((task) => task.id === id);
    setTask(foundTask.text);
    setEditTask(id);
  }
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
          <button type="submit" onClick={handleAddTask} className="submit-btn" disabled={task.trim() === ""}>
          {editTask !== null ? "Update" : "Add"}
          </button>
        </div>
      </form>
      <div className="grocery-container">
        {newTask.map((addTask) => {
          return (
            <ul key={addTask.id}>
              <li className="grocery-item">{addTask.text} <button className="edit-btn" onClick={()=>handleEditTask(addTask.id)}>Edit</button> <button className="delete-btn" onClick={()=>handleDeleteTask(addTask.id)}>Remove</button></li>
            </ul>
          );
        })}
      </div>
      <div><button className="clear-btn" onClick={()=>setNewTask([])}>Clear all Items</button></div>
    </section>
  );
}

export default List;
