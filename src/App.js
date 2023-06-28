import React, { useEffect, useState } from 'react';
import bgImage from './background-image.jpg';  // adjust the path as needed
import axios from 'axios';
import './App.css';

function App() {
  const [myData, setMyData] = useState([]);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [movement, setMovement] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'https://sheetdb.io/api/v1/5uxyugigju92s',
      );
      setMyData(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX - window.innerWidth / 2,
        y: event.clientY - window.innerHeight / 2,
      });
    }

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  useEffect(() => {
    const moveBackground = () => {
      const speedFactor = 0.01;  // adjust as needed
      setMovement(prev => ({
        x: prev.x - speedFactor * position.x,
        y: prev.y - speedFactor * position.y,
      }));
    }

    const interval = setInterval(moveBackground, 10);  // adjust as needed

    return () => {
      clearInterval(interval);
    }
  }, [position]);

  return (
    <div className="App" style={{
      backgroundImage: `url(${bgImage})`,
      backgroundPosition: `${movement.x}px ${movement.y}px`,
    }}>
      {myData.map((data, index) => (
        <div key={index}>
          <h1>{data.Column1}</h1>
          <h2>{data.Column2}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;