import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Repo } from '../../models/Repo';
import axios from 'axios';
import { Commit } from '../../models/Commit';
import ReactMarkdown from 'react-markdown';

interface Props {
  repoList: Repo[];
}

export default function RepoInfo({ repoList }: Props) {
  const [commit, setCommit] = useState<Commit | null>(null);
  const [readme, setReadme] = useState('');
  const params = useParams();
  const selectedRepo = repoList.find((repo) => repo.id === Number(params.id));
  const commitsUrl = selectedRepo?.commits_url.slice(0, -6);
  const repoFullName = selectedRepo?.full_name;
  const readmeUrl = `https://raw.githubusercontent.com/${repoFullName}/master/README.md`;

  useEffect(() => {
    axios
      .get(commitsUrl!)
      .then((response1) => {
        response1.data.sort(
          (a: Commit, b: Commit) =>
            Date.parse(b.commit.author.date) - Date.parse(a.commit.author.date)
        );
        const mostRecentCommit = response1.data[0];
        setCommit(mostRecentCommit);

        axios
          .get(readmeUrl)
          .then((response2) => {
            setReadme(response2.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h3>Repo Info</h3>
      <Link to="/">Return to list of repositories</Link>
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
        'No commit information found. Please try another repository'
      )}
      <ReactMarkdown>
        {readme.length > 1 ? readme : 'No readme to display'}
      </ReactMarkdown>
    </div>
  );
}
