import React from 'react';
import { Repo } from '../../models/Repo';

interface Props {
  repoList: Repo[];
}

export default function RepoInfo({ repoList }: Props) {
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
