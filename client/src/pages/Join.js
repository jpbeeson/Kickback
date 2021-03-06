import React, { useState, useEffect } from 'react';


import { useAuth0 } from '@auth0/auth0-react';
import API from '../utils/API';
import { Link } from 'react-router-dom';

import Modal from './Modal';

import './Join.css'


// Sets user name and room name when user signs on
function Join(props) {
 

  // const [name, setName] = useState('');
  const [rooms, setRooms] = useState([]);
  const [room, setRoom] = useState('');
  const [modalState, setModalState] = useState(false);

  const { user, isAuthenticated } = useAuth0();

  let nickname; 

  if (isAuthenticated && !user.given_name) {
    nickname = user.nickname.replace(/[ ,.]/g, "");
  } else if (isAuthenticated && user.given_name) {
    nickname = user.given_name;
  }

  useEffect(() => {
    loadRooms();
  }, []);

  function loadRooms() {
    API.getRooms()
      .then(res => {
        setRooms(res.data);
      }).catch(err => console.log(err));
  };

  const handleChange = (event) => {
    setRoom(event.target.value);
  }

  const handleClick = (event) => {
    for (let i = 0; i < rooms.length; i++) {
      if (!room) {
        event.preventDefault();
      }
      if (room !== rooms[i].name) {
        event.preventDefault();
        setModalState(true);
      } else {
        window.location.replace(`http://localhost:3000/chat?name=${nickname}&room=${room}`);
      }
    }
  };

  
  return (
    <div>
        <div className="searchForm">
        <h1>Search for an existing room</h1>
        <p>Welcome {nickname}! Enter the name of the room you wish to search for!</p>
          <div>
            <input placeholder="Room" className="createInput mt-20" type="text" name="room" onChange={handleChange} />
          </div>
          <Link onClick={handleClick} to={`/chat?name=${nickname}&room=${room}`} style={{textDecoration: 'none', linkStyleType: 'none'}}>
            <button className={'button mt-20'} type="submit">Search Room</button>
          </Link>
          <Modal show={modalState}/>
        </div>
    </div>
  );
}

export default Join  