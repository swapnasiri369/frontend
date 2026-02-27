import React, { useEffect, useState } from "react";
import "./home.css";
import Axios from "../../axios/Axios";


const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editId, setEditId] = useState(null);

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  // GET ALL TASKS
  const getTasks = async () => {
    try {
      const res = await Axios.get("/task/alltask");
      setTasks(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  // HANDLE CHANGE
  const handleChange = (e) => {
    setTaskData({ ...taskData, [e.target.name]: e.target.value });
  };

  // CREATE OR UPDATE TASK
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await Axios.put(`/task/update/${editId}`, taskData);
      } else {
        await Axios.post("/task/create", taskData);
      }

      setShowPopup(false);
      setEditId(null);
      setTaskData({ title: "", description: "", completed: false });
      getTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE TASK
  const deleteTask = async (id) => {
    await Axios.delete(`/task/delete/${id}`);
    getTasks();
  };

  // EDIT TASK
  const editTask = (task) => {
    setTaskData(task);
    setEditId(task._id);
    setShowPopup(true);
  };

  // TOGGLE COMPLETE
  const toggleComplete = async (task) => {
    await Axios.put(`/tasks/${task._id}`, {
      ...task,
      completed: !task.completed,
    });
    getTasks();
  };

  return (
    <div className="home">
      <h2>Task Manager</h2>

      <button className="add-btn" onClick={() => setShowPopup(true)}>
        Add Task
      </button>

      <div className="task-container">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3 className={task.completed ? "completed" : ""}>
              {task.title}
            </h3>
            <p>{task.description}</p>

            <div className="btn-group">
              <button onClick={() => toggleComplete(task)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => editTask(task)}>Edit</button>
              <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* POPUP MODAL */}
      {showPopup && (
        <div className="modal">
          <div className="modal-content">
            <h3>{editId ? "Update Task" : "Add Task"}</h3>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={taskData.title}
                onChange={handleChange}
                required
              />

              <textarea
                name="description"
                placeholder="Description"
                value={taskData.description}
                onChange={handleChange}
                required
              />

              <div className="modal-buttons">
                <button type="submit">
                  {editId ? "Update" : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPopup(false)}
                  className="cancel"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;