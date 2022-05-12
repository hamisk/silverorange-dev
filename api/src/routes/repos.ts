import { Router, Request, Response } from 'express';
import fs from 'fs';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');

  res.status(200);

  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  // Read local repos.json data when endpoint called to account for any changes to file while server running
  const localReposData = JSON.parse(
    fs.readFileSync('./data/repos.json', 'utf8')
  );

  res.json([localReposData]);
});
