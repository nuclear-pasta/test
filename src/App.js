import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://sheetdb.io/api/v1/5uxyugigju92s')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className="App">
      <h1>Hello, World!</h1>
      {data.map((row, index) => (
        <div key={index}>
          <p>{row.Column1}</p>
          <p>{row.Column2}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
