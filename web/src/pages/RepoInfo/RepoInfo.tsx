import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Repo } from '../../models/Repo';
import axios from 'axios';
import { Commit } from '../../models/Commit';

interface Props {
  repoList: Repo[];
}

export default function RepoInfo({ repoList }: Props) {
  const [commit, setCommit] = useState<Commit | null>(null);
  const params = useParams();
  const commitsUrl = repoList
    .find((repo) => repo.id === Number(params.id))
    ?.commits_url.slice(0, -6);

  useEffect(() => {
    axios.get(commitsUrl!).then((res) => {
      res.data.sort(
        (a: Commit, b: Commit) =>
          Date.parse(b.commit.author.date) - Date.parse(a.commit.author.date)
      );
      const mostRecentCommit = res.data[0];
      setCommit(mostRecentCommit);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>Repo Info</h3>
      <p className="repo-info__copy">
        Repo commit info accessed at repository commit URL
      </p>
      {commit ? (
        <div className="repo-info__wrapper">
          <p className="repo-info__copy">
            most recent commit date: {commit.commit.author.date.slice(0, 10)}
          </p>
          <p className="repo-info__copy">author: {commit.commit.author.name}</p>
          <p className="repo-info__copy">message: {commit.commit.message}</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
