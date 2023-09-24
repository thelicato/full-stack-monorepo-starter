import express, { Request, Response } from "express";
import cors from 'cors';
import { GuessAgeReq } from "@full-stack-monorepo-starter/bff";

const app = express()

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.get('/status', (_req: Request, res: Response) => {
  res.status(200).send('Everything is fine');
})

app.post('/guess', async (req: Request, res: Response) => {
  const data = req.body as GuessAgeReq;
  const age = data.age

  const maxValue = 100;
  const range = maxValue - age;

  const guessedValue = Math.floor(Math.random() * range) + age
  res.status(200).json({guessedValue})
})

app.listen(5000, () => console.log("Starting Express.js server on port 5000"))