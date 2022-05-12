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
  console.log(readmeUrl);

  useEffect(() => {
    axios.all([axios.get(commitsUrl!), axios.get(readmeUrl)]).then(
      axios.spread((response1, response2) => {
        response1.data.sort(
          (a: Commit, b: Commit) =>
            Date.parse(b.commit.author.date) - Date.parse(a.commit.author.date)
        );
        const mostRecentCommit = response1.data[0];
        setCommit(mostRecentCommit);

        console.log(typeof response2.data);
        setReadme(response2.data);
        console.log(readme);
      })
    );
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
        ''
      )}
      <ReactMarkdown>{readme}</ReactMarkdown>
    </div>
  );
}
