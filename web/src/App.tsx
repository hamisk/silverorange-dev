import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { RepoListPage } from './pages/RepoListPage/RepoListPage';

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
      <RepoListPage
        returnedError={returnedError}
        getRepoData={getRepoData}
        repoList={repoList}
      />
    </div>
  );
}
