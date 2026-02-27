import { useEffect, useState } from "react";
import Axios from "../../axios/Axios";
import "./admin.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const res = await Axios.get("/user/getuser", {
      withCredentials: true,
    });
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id, role) => {
    await Axios.put(
      `/user/update/${id}`,
      { role },
      { withCredentials: true }
    );
    fetchUsers();
  };

  const deleteUser = async (id) => {
    await Axios.delete(`/users/delete/${id}`, {
      withCredentials: true,
    });
    fetchUsers();
  };

  return (
    <div className="admin-page">
      <h2 className="admin-title">User Management</h2>

      <table className="admin-table">
        <thead>
          <tr className="admin-header-row">
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="admin-row">
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>

              <td>
                <select
                  value={user.role}
                  onChange={(e) =>
                    updateRole(user._id, e.target.value)
                  }
                  className="role-select"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </td>

              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;