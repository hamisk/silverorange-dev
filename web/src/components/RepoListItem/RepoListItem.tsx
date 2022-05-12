import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  repoId: number;
  name: string;
  description: string;
  language: string;
  forksCount: number;
}

export default function RepoListItem({
  repoId,
  name,
  description,
  language,
  forksCount,
}: Props) {
  return (
    <div className="repo-list__repo">
      <Link to={`/${repoId}`}>
        <h3 className="repo-list__name">Name: {name}</h3>
      </Link>
      <p className="repo-list__copy">Description: {description}</p>
      <p className="repo-list__copy">Language: {language}</p>
      <p className="repo-list__copy">Forks Count: {forksCount}</p>
    </div>
  );
}
