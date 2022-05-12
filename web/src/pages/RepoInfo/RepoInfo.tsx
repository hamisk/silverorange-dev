import React from 'react';
import { useParams } from 'react-router-dom';
import { Repo } from '../../models/Repo';

interface Props {
  repoList: Repo[];
}

export default function RepoInfo({ repoList }: Props) {
  const params = useParams();
  const commitsUrl = repoList
    .find((repo) => repo.id === Number(params.id))
    ?.commits_url.slice(0, -6);
  console.log(commitsUrl);
  return (
    <div>
      <h3>Repo Info</h3>
      <p className="repo-info__copy">
        Repo commit info accessed at repository commit URL
      </p>
      <p className="repo-info__copy">most recent commit date: </p>
      <p className="repo-info__copy">author: </p>
      <p className="repo-info__copy">message: </p>
    </div>
  );
}
