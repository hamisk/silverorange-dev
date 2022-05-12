import React from 'react';

interface RepoListPageProps {
  returnedError: boolean;
  getRepoData: () => void;
  repoList: any;
}

export function RepoListPage({
  returnedError,
  getRepoData,
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
    </div>
  );
}
