import React from 'react';
import RepoListItem from '../../components/RepoListItem/RepoListItem';
import { Repo } from '../../models/Repo';

interface RepoListPageProps {
  returnedError: boolean;
  getRepoData: () => void;
  repoList: Repo[];
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
      {repoList.map((repo: any) => (
        <RepoListItem
          key={repo.id}
          name={repo.name}
          description={repo.description}
          language={repo.language}
          forksCount={repo.forks_count}
        />
      ))}
    </div>
  );
}
