import React from 'react';

interface Props {
  name: string;
  description: string;
  language: string;
  forksCount: number;
}

export default function RepoListItem({
  name,
  description,
  language,
  forksCount,
}: Props) {
  return (
    <div className="repo-list__repo">
      <h3 className="repo-list__name">Name: {name}</h3>
      <p className="repo-list__copy">Description: {description}</p>
      <p className="repo-list__copy">Language: {language}</p>
      <p className="repo-list__copy">Forks Count: {forksCount}</p>
    </div>
  );
}
