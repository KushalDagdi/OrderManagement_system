import { useState } from "react";

function UserManager({ currentUser, setCurrentUser }) {
  const [users, setUsers] = useState(["User1"]);
  const [newUser, setNewUser] = useState("");

  const addUser = () => {
    if (!newUser) return;
    setUsers([...users, newUser]);
    setNewUser("");
  };

  return (
    <div className="mb-4">
      <input
        value={newUser}
        onChange={(e) => setNewUser(e.target.value)}
        placeholder="Create user"
        className="bg-slate-800 p-2"
      />

      <button onClick={addUser} className="ml-2 bg-green-500 px-2">
        Add
      </button>

      <select
        value={currentUser}
        onChange={(e) => setCurrentUser(e.target.value)}
        className="ml-4 bg-slate-800 p-2"
      >
        {users.map((u) => (
          <option key={u}>{u}</option>
        ))}
      </select>
    </div>
  );
}

export default UserManager;