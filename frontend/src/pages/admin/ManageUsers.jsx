import { useEffect, useState } from "react";
import { getAllUsers, deleteUser, updateUserRole } from "../../services/api";
import { Trash2 } from "lucide-react";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    getAllUsers()
      .then((data) => setUsers(data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchUsers(); }, []);

  const handleRoleChange = async (id, role) => {
    try {
      await updateUserRole(id, role);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Supprimer cet utilisateur ?")) return;
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Gestion des utilisateurs</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-x-auto">
        <table className="w-full min-w-[600px]">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="text-left px-5 py-3 text-sm font-medium text-gray-500">Nom</th>
              <th className="text-left px-5 py-3 text-sm font-medium text-gray-500">Email</th>
              <th className="text-left px-5 py-3 text-sm font-medium text-gray-500">Rôle</th>
              <th className="text-left px-5 py-3 text-sm font-medium text-gray-500">Inscrit le</th>
              <th className="text-right px-5 py-3 text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="px-5 py-4 font-medium text-gray-800">{u.name}</td>
                <td className="px-5 py-4 text-sm text-gray-600">{u.email}</td>
                <td className="px-5 py-4">
                  <select
                    value={u.role}
                    onChange={(e) => handleRoleChange(u._id, e.target.value)}
                    className={`text-sm font-medium px-3 py-1 rounded-lg cursor-pointer ${
                      u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="px-5 py-4 text-sm text-gray-400">
                  {new Date(u.createdAt).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-5 py-4 text-right">
                  <button onClick={() => handleDelete(u._id)} className="text-gray-400 hover:text-red-500 cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
