import { Router, Request, Response } from 'express';
import fs from 'fs';
import axios from 'axios';
import { Repo } from '../models/Repo';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  res.header('Content-Type', 'application/json');

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  // Read local repos.json data when endpoint called to account for any changes to file while server running
  const localReposData: Repo[] = JSON.parse(
    fs.readFileSync('./data/repos.json', 'utf8')
  );

  axios
    .get('https://api.github.com/users/silverorange/repos')
    .then((resp) => {
      const githubReposData: Repo[] = resp.data;
      const aggregatedRepos = [...githubReposData, ...localReposData];

      const filteredRepos = aggregatedRepos.filter(
        (repo) => repo.fork === false
      );

      res.status(200);
      res.json(filteredRepos);
    })
    .catch((err) => {
      // Catch error if unable to access external github endpoint
      res.status(500).send(`Error retrieving repos from github: ${err}`);
    });
});
