import React, { useState } from "react";
import {useAddUserMutation, useDeleteUserMutation, useGetUsersQuery, useUpdateUserMutation} from "./features/UsersSlice";

const App = () => {
  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useGetUsersQuery();

  const [addUser] = useAddUserMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [username, setUsername] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const handleAdd = async () => {
    if (!username.trim()) return;

    await addUser({
      name: username,
      email: "newuser@gmail.com",
      phone: "+998901234567",
      address: {
        city: "Tashkent",
        street: "Chilonzor",
      },
      company: {
        name: "Frontend Company",
      },
    });

    setUsername("");
  };

  const handleDelete = async (id) => {
    await deleteUser(id);
  };

  const handleView = (user) => {
    setSelectedUser(user);
    setEditMode(false);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setUsername(user.name);
    setEditMode(true);
  };

  const handleSave = async () => {
    await updateUser({
      id: selectedUser.id,
      updatedUser: {
        ...selectedUser,
        name: username,
      },
    });

    setEditMode(false);
    setUsername("");
    setSelectedUser(null);
  };

  if (isLoading)
    return (
      <h1 className="text-white text-center text-[50px]"> Loading... </h1>
    );

  if (isError)
    return (
      <h1 className="text-red-500 text-center text-[50px]"> {error?.error} </h1>
    );

  return (
    <div className="w-full min-h-screen bg-gray-950 p-[30px]">
      <h1 className="text-center text-white text-[45px] font-black mb-[40px]"> Users </h1>
      <div className="flex justify-center gap-5 mb-[40px]">
        <input className="w-[300px] h-[45px] rounded-[20px] bg-gray-800 text-white pl-[20px] outline-none" type="text" placeholder="Enter username..." value={username} onChange={(e) =>
            setUsername(e.target.value)
          } />

        {!editMode ? (
          <button onClick={handleAdd} className="w-[140px] h-[45px] rounded-[20px] bg-green-600 text-white font-bold hover:bg-green-700">
            Add User
          </button>
        ) : (
          <button onClick={handleSave} className="w-[140px] h-[45px] rounded-[20px] bg-yellow-500 text-white font-bold hover:bg-yellow-600">
            Save Edit
          </button>
        )}
      </div>

      {selectedUser && !editMode && (
        <div className="w-[400px] bg-gray-900 mx-auto p-[20px] rounded-[20px] mb-[40px]">
          <h2 className="text-white text-[30px] font-bold mb-[15px]"> User Details </h2>
          <p className="text-gray-300">
            <span className="font-bold">
              Name:
            </span>{" "}
            {selectedUser.name}
          </p>

          <p className="text-gray-300">
            <span className="font-bold">
              Email:
            </span>{" "}
            {selectedUser.email}
          </p>

          <p className="text-gray-300">
            <span className="font-bold">
              Phone:
            </span>{" "}
            {selectedUser.phone}
          </p>

          <p className="text-gray-300">
            <span className="font-bold">
              City:
            </span>{" "}
            {selectedUser.address?.city}
          </p>
        </div>
      )}

      <table className="w-full text-white">
        <thead className="bg-gray-800 h-[60px]">
          <tr>
            <th> ID </th>
            <th> Username </th>
            <th> Phone </th>
            <th> Email </th>
            <th> City </th>
            <th> Company </th>
            <th> Actions </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="text-center border-b border-gray-800 h-[70px] hover:bg-gray-900">
              <td> {user.id} </td>
              <td> {user.name} </td>
              <td> {user.phone} </td>
              <td> {user.email} </td>
              <td> {user.address?.city} </td>
              <td> {user.company?.name} </td>
              <td className="flex justify-center gap-3 py-[15px]">
                <button onClick={() => handleView(user)} className="w-[90px] h-[35px] bg-blue-600 rounded-[20px] hover:bg-blue-700"> View </button>
                <button onClick={() => handleEdit(user)} className="w-[90px] h-[35px] bg-yellow-500 rounded-[20px] hover:bg-yellow-600"> Edit </button>
                <button onClick={() => handleDelete(user.id)} className="w-[90px] h-[35px] bg-red-600 rounded-[20px] hover:bg-red-700"> Delete </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default App;