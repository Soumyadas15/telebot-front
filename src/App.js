import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainLayout from './components/MainLayout';
import Sidebar from './components/Sidebar';
import GoogleLogin from 'react-google-login';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const [apiKey, setApiKey] = useState('');
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const responseGoogle = (response) => {
    console.log("success")
    setLoggedIn(true);
  }


  useEffect(() => {
    // Fetch API key and user list on component mount
    fetchApiKey();
    fetchUsers();
  }, []);

  const fetchApiKey = () => {
    axios.get('/admin/api-key')
      .then((response) => {
        setApiKey(response.data);
      })
      .catch((error) => {
        console.error('Error fetching API key:', error);
      });
  };


  const updateApiKey = () => {
    // Replace with your Nest.js API endpoint to update the API key
    const newApiKey = prompt('Enter the new API key:');
    if (newApiKey) {
      axios.post('/admin/api-key', { key: newApiKey })
        .then((response) => {
          alert(response.data);
          fetchApiKey(); // Refresh the API key after update
        })
        .catch((error) => {
          console.error('Error updating API key:', error);
        });
    }
  };

  const deleteUser = (chatId) => {
    // Send a DELETE request to delete the user
    axios.delete(`/users/${chatId}`)
      .then((response) => {
        alert(response.data.message);
        fetchUsers(); // Refresh the user list after deletion
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const fetchUsers = () => {
    // Replace with your Nest.js API endpoint to fetch the list of users
    axios.get('/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <div>
      <div className="bg-neutral-800 h-screen w-full flex items-start gap-3">
          <Sidebar/>
          <MainLayout/>
        </div>

    </div>
  );
}

export default App;