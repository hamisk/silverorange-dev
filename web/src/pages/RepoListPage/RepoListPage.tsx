import React, { useLayoutEffect, useState } from 'react';
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
  const listOfLanguages = Array.from(
    new Set(repoList.map((repo) => repo.language))
  );

  useLayoutEffect(() => {
    setReposToDisplay(repoList);
  }, [repoList]);

  const [reposToDisplay, setReposToDisplay] = useState(repoList);

  const filterByLanguage = (language: string) => {
    const filteredRepos = repoList.filter((repo) => repo.language === language);
    setReposToDisplay(filteredRepos);
  };

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
      {listOfLanguages.map((language, index) => (
        <button
          className="repo-list__language"
          key={language + index}
          onClick={() => filterByLanguage(language)}
        >
          {language}
        </button>
      ))}
      {reposToDisplay.map((repo: Repo) => (
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
