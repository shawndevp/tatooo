import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";

function ModalComponent() {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const initialValues = {
    name: "",
    time: "",
    mobile: "",
  };

  const editValues = {
    name: "",
    description: "",
    price: 0,
  };

  const [modalIsOpen, setIsOpen] = useState(false);
  const [deleteIsOpen, setDeleteOpen] = useState(false);
  const [editIsOpen, setEditOpen] = useState(false);
  const [editArtistValue, setEditValue] = useState(editValues);
  const [formValues, setFormValues] = useState(initialValues);
  const [bookedArtist, setBookedArtist] = useState();
  const [artistId, setArtistId] = useState();
  const [userId] = useState(localStorage.getItem("userId"));
  const [token] = useState(localStorage.getItem("jwt"));
  const [jwt, setJwt] = useState(localStorage.getItem("jwt"));

  useEffect(() => {
    if (modalIsOpen === true || deleteIsOpen === true || editIsOpen === true) {
      const fetchArtist = async () => {
        const response = await axios.get(
          `http://localhost:1337/artists?name=${bookedArtist}`
        );
        console.log(response)
        setArtistId(response.data[0].id);
      };
      fetchArtist();
    }
  }, [openModal]);

  useEffect(() => {
    const JWT = localStorage.getItem("jwt");

    setJwt(JWT);
  }, []);

  function openModal(e) {
    setBookedArtist(
      e.target.parentNode.previousSibling.previousSibling.previousSibling
        .innerHTML
    );
    setIsOpen(true);
  }

  function openDeleteModal(e) {
    setBookedArtist(
      e.target.parentNode.previousSibling.previousSibling.previousSibling
        .innerHTML
    );
    setDeleteOpen(true);
  }

  function openEditModal(e) {
    setBookedArtist(
      e.target.parentNode.previousSibling.previousSibling.previousSibling
        .innerHTML
    );
    setEditOpen(true);
  }
  
  function closeModal() {
    setIsOpen(false);
  }

  function closeDeleteModal() {
    setDeleteOpen(false);
  }

  function closeEditModal() {
    setEditOpen(false);
  }

  function deleteArtist() {
    const deletePerson = async () => {
      const response = await axios.delete(
        `http://localhost:1337/Artists/${artistId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
    };
    deletePerson();
  }

  function editArtist(e) {
    e.preventDefault();

    const editPerson = async () => {
      const response = await axios
        .put(
          `http://localhost:1337/Artists/${artistId}`,
          {
            name: editArtistValue.name,
            description: editArtistValue.description,
            price: editArtistValue.price,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(
          closeEditModal(),
          window.location.reload()
          );
    };
    editPerson();
  }

  function onHandleChange(e) {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  }

  function onHandleChangeEdit(e) {
    setEditValue({ ...editArtistValue, [e.target.name]: e.target.value });
  }

  async function onHandleSubmit(e) {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:1337/bookings",
      {
        name: formValues.name,
        time: formValues.time,
        mobile: Number(formValues.mobile),
        users_permissions_user: userId,
        artist: artistId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response);
  }

  return (
    <>
      {jwt ? (
        <>
          <button
            onClick={openEditModal}
            className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
          >
            Edit
          </button>
          <button
            onClick={openDeleteModal}
            className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
          >
            Delete
          </button>
        </>
      ) : (
        <div></div>
      )}
      <button
        onClick={openModal}
        className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
      >
        BOOK
      </button>

      <Modal
        isOpen={editIsOpen}
        onRequestClose={closeEditModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
               <div className="text-red-500">
          <button onClick={closeModal}>CLOSE</button>
        </div>
        <br />
        <div>You're currently about to edit following... Please fill in all fields when editing</div>
        <br />
        <div className="flex justify-around text-black font-black">
          <h1>Name</h1>
          <h1>Description</h1>
          <h1>Price</h1>
        </div>
        <form onSubmit={onHandleSubmit}>
          <input
            className="placeholder-gray-500 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="name"
            value={editArtistValue.name}
            onChange={onHandleChangeEdit}
            required
          />
          <input
            className="placeholder-gray-500 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="description"
            value={editArtistValue.description}
            onChange={onHandleChangeEdit}
            required
          />
          <input
            className="placeholder-gray-500 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="number"
            name="price"
            value={editArtistValue.price}
            onChange={onHandleChangeEdit}
            required
          />
          <br />
          <br />
          <div className="flex justify-end text-green-500">
            <button type="submit" onClick={editArtist}>Send</button>
          </div>
        </form> 
      </Modal>

      <Modal
        isOpen={deleteIsOpen}
        onRequestClose={closeDeleteModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>Do you really want to delete this product? </div>
        <button
          className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
          onClick={deleteArtist}
        >
          Yes
        </button>
        <button
          className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded"
          onClick={closeDeleteModal}
        >
          No
        </button>
      </Modal>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="text-red-500">
          <button onClick={closeModal}>CLOSE</button>
        </div>
        <br />
        <div>You're currently about to book {bookedArtist}</div>
        <br />
        <div className="flex justify-around text-black font-black">
          <h1>Name</h1>
          <h1>Time</h1>
          <h1>Mobile</h1>
        </div>
        <form onSubmit={onHandleSubmit}>
          <input
            className="placeholder-gray-500 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="yourname"
            type="text"
            name="name"
            value={formValues.name}
            onChange={onHandleChange}
            required
          />
          <input
            className="placeholder-gray-500 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="14:00 etc"
            type="number"
            name="time"
            value={formValues.time}
            onChange={onHandleChange}
            required
          />
          <input
            className="placeholder-gray-500 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="071-2345678"
            type="number"
            name="mobile"
            value={formValues.mobile}
            onChange={onHandleChange}
            required
          />
          <br />
          <br />
          <div className="flex justify-end text-green-500">
            <button type="submit">Send</button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default ModalComponent;
