import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MainLayout = () => {

    const [apiKey, setApiKey] = useState('');
    const [newApiKey, setNewApiKey] = useState('');
    const [users, setUsers] = useState([]);

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    fetchApiKey();
    fetchUsers();
  }, []);

  const fetchApiKey = () => {
    axios.get(`https://telebotclient.onrender.com/admin/api-key`)
      .then((response) => {
        setApiKey(response.data);
      })
      .catch((error) => {
        console.error('Error fetching API key:', error);
      });
  };

  const updateApiKey = () => {
    const newApiKey = prompt('Enter the new API key:');
    if (newApiKey) {
      axios.post(`https://telebotclient.onrender.com/admin/api-key`, { key: newApiKey })
        .then((response) => {
          alert(response.data);
          fetchApiKey();
        })
        .catch((error) => {
          console.error('Error updating API key:', error);
        });
    }
  };

  const deleteUser = (chatId) => {
    axios.delete(`https://telebotclient.onrender.com/users/${chatId}`)
      .then((response) => {
        alert(response.data.message);
        fetchUsers(); // Refresh the user list after deletion
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const fetchUsers = () => {
    axios.get(`https://telebotclient.onrender.com/users`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          console.error('Invalid response format for users:', response.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };


    return ( 
        <div className="bg-neutral-900 h-screen w-full p-5">
      <div className="flex flex-col items-start gap-6">
        <h1 className="text-white text-4xl font-bold pt-4">
          Welcome to <span className="text-blue-500">TeleBot</span>
        </h1>
        <div className="h-[3rem] w-full md:w-[50%] flex items-center gap-2">
          <div className="bg-neutral-600 h-full w-full rounded-xl flex items-center justify-center p-3 pl-6">
            <input
              className="h-full w-full bg-inherit !outline-none text-white"
              placeholder="Enter your key"
              value={apiKey}
              onChange={(e) => setNewApiKey(e.target.value)}
            ></input>
          </div>
          <div
            className="bg-blue-500 flex items-center justify-center h-full w-[20%] rounded-xl cursor-pointer transition hover:opacity-75 text-white font-bold"
            onClick={updateApiKey}
          >
            Add
          </div>
        </div>

        {/* User Table */}
        <div className='text-white w-full md:w-[70%] border-none'>
          <h2 className="text-xl font-bold mb-2 text-white">Current Users</h2>
          <table className="border-0 w-full mt-5">
            <thead className=' bg-neutral-700'>
              <tr>
                <th className=" px-4 py-2 text-start">Username</th>
                <th className=" px-4 py-2 text-start">Chat ID</th>
                <th className=" px-4 py-2 text-start">Action</th>
              </tr>
            </thead>
            <tbody className='text-white'>
            {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">No data available</td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.chatId}>
                    <td className="bg-neutral-800 px-4 py-2">{user.username}</td>
                    <td className="bg-neutral-800 px-4 py-2">{user.chatId}</td>
                    <td className="bg-neutral-800 px-4 py-2">
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => deleteUser(user.chatId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
        </div>
     );
}
 
export default MainLayout;