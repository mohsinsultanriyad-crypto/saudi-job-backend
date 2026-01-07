import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Simple in-memory storage
let jobs = [];

// Get all jobs
app.get('/jobs', (req, res) => {
  res.json(jobs);
});

// Post a new job
app.post('/jobs', (req, res) => {
  const job = req.body;
  jobs.push(job);
  res.status(201).json({ message: 'Job posted successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
