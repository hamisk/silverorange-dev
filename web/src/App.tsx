import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export function App() {
  const [repoList, setRepoList] = useState<any>([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        setRepoList(res.data);
      })
      .catch((err) => console.log(err));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div className="App"> React App</div>;
}
