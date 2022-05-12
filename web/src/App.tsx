import React, { useEffect } from 'react';
import axios from 'axios';
import './App.css';

export function App() {
  useEffect(() => {
    axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return <div className="App"> React App</div>;
}
