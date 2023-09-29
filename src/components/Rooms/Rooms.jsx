import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './Rooms.css';

const Rooms = () => {
  const [roomData, setRoomData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://wetransfer.github.io/rooms.json').then((response) => {
      response.json()
        .then((data) => {
          setRoomData(data.rooms);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setIsLoading(false);
        });
    })
  }, [])

  return isLoading ? (
    <div>Loading...</div>
  )
    : (
      <div className='room-container'>
        <h1 className='room-header'>Rooms</h1>
        <p className='room-subheader'>Odio nisi, lectus dis nulla. Ultrices maecenas vitae rutrum dolor ultricies donec risus sodales. Tempus quis et.</p>
        <ul className='room-grid'>
          {roomData.map((room) => (
            <li className='room-item' key={room.name} role='room-item'>
              <img src={room.thumbnail} alt={room.thumbnail} className='room-image' />
              <div className='room-description'>
                <div>
                  <div className='room-name'>{room.name}</div>
                  <div className='room-spot'>{room.spots} spots remaining</div>
                </div>
                <button className='room-button' onClick={() => navigate('/booking')}>Book!</button>
              </div>
            </li>
          ))}
        </ul>
      </div >
    )
};

export default Rooms;