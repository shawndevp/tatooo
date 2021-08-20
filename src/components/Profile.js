import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

function Profile() {
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [token] = useState(localStorage.getItem("jwt"));
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const response = await axios.get(
        `http://localhost:1337/users?id=${userId}`
      );
      console.log(response);

      setUsername(response.data[0].username);
      setEmail(response.data[0].email);
      console.log(response.data[0].username);
      console.log(response.data[0].email);
    };
    fetchUsername();
    console.log(editValues);
  }, []);

  const editValues = {
    username: username,
    email: email,
  };
  const [editUserValue, setEditValue] = useState(editValues);

  function editUser(e) {
    e.preventDefault();

    const editProfile = async () => {
      /* console.log(editUserValue.username)
            console.log(editUserValue.email) */
      const response = await axios.put(
        `http://localhost:1337/Users/${userId}`,
        {
          username: editUserValue.username,
          email: editUserValue.email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
       .then(
              window.location.reload()
              );
    };
    editProfile();
  }

  function deleteUser() {
    const deletePerson = async () => {
      const response = await axios.delete(
        `http://localhost:1337/Users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(
        window.location.reload()
        );
      console.log(response);
    };
    deletePerson();
  }

  function onHandleChangeEdit(e) {
    setEditValue({ ...editUserValue, [e.target.name]: e.target.value });
  }

  return (
      <>
    <div>
      <form onSubmit={editUser}>
        Username: {username}
        <br />
        <input
          className="placeholder-gray-500 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="username"
          placeholder="New username"
          value={editUserValue.username}
          onChange={onHandleChangeEdit}
        />
        <br />
        <br />
        Email: {email}
        <br />
        <input
          className="placeholder-gray-500 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          name="email"
          placeholder="New Email"
          value={editUserValue.email}
          onChange={onHandleChangeEdit}
        />
        <br />
        <br />
        <p>Please submit both Username and Email.</p>
        <div className="flex justify-center text-green-500">
          <button type="submit" onClick={editUser}>
            Submit
          </button>
        </div>
      </form>
    </div>

<br/>
        <button
          className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
          onClick={deleteUser}
        >Delete user</button>
    </>
  );
}

export default Profile;
