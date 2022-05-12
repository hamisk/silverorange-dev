import React from 'react';

interface RepoListPageProps {
  returnedError: boolean;
  getRepoData: () => void;
  repoList: any;
}

export function RepoListPage({
  returnedError,
  getRepoData,
  repoList,
}: RepoListPageProps) {
  return (
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
      <div className="repo-list__repo">
        <h3 className="repo-list__name">Name: {repoList[0].name}</h3>
        <p className="repo-list__copy">
          Description: {repoList[0].description}
        </p>
        <p className="repo-list__copy">Language: {repoList[0].language}</p>
        <p className="repo-list__copy">
          Forks Count: {repoList[0].forks_count}
        </p>
      </div>
    </div>
  );
}
