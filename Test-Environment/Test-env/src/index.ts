import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json()); // makes req.body work

app.get('/entries', (req: Request, res: Response) => {
  res.send('Entries endpoint is alive ✅');
});

app.post('/entries', (req: Request, res: Response) => {
  const { entry } = req.body;
  console.log('Received entry:', entry);
  res.json({ message: 'Entry received', entry });
});

app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
