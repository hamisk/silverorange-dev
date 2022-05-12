import React from 'react';
import RepoListItem from '../../components/RepoListItem/RepoListItem';

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
      <RepoListItem
        name={repoList[0].name}
        description={repoList[0].description}
        language={repoList[0].language}
        forksCount={repoList[0].forks_count}
      />
    </div>
  );
}
