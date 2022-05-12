import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { RepoListPage } from './pages/RepoListPage/RepoListPage';
import { Repo } from './models/Repo';

export function App() {
  const [repoList, setRepoList] = useState<Repo[]>([]);
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
        const sortByCreationDate = res.data.sort(
          (a: Repo, b: Repo) =>
            Date.parse(b.created_at) - Date.parse(a.created_at)
        );
        setRepoList(sortByCreationDate);
      })
      .catch((err) => {
        setReturnedError(true);
      });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <RepoListPage
                returnedError={returnedError}
                getRepoData={getRepoData}
                repoList={repoList}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
