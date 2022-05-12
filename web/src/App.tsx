import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

export function App() {
  const [repoList, setRepoList] = useState<any>([]);
  const [returnedError, setReturnedError] = useState<boolean>(false);

  useEffect(() => {
    getRepoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getRepoData = () => {
    setReturnedError(false);

    axios
      .get('http://localhost:4000/repos')
      .then((res) => {
        setRepoList(res.data);
        console.log(repoList);
      })
      .catch((err) => {
        console.log(err);
        setReturnedError(true);
      });
  };

  return (
    <div className="App">
      <div className="repo-list">
        <h2 className="repo-list__title">A list of repositories</h2>
        {returnedError ? (
          <>
            <p className="repo-list__text">Error retrieving repository data</p>
            <button onClick={() => getRepoData()}>Click to retry</button>
          </>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}
