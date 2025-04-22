import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// POST /run with JSON body: { url: "https://example.com" }
app.post('/run', (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'URL is required' });

  const pythonProcess = spawn('python3', ['automation.py', url], {
    cwd: __dirname
  });

  let output = '';
  let errorOutput = '';

  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
    console.log('[PYTHON OUTPUT]', data.toString());
  });

  pythonProcess.stderr.on('data', (data) => {
    errorOutput += data.toString();
    console.error('[PYTHON ERROR]', data.toString());
  });

  pythonProcess.on('close', (code) => {
    if (code === 0) {
      res.json({ message: '✅ Automation completed successfully.', output });
    } else {
      res.status(500).json({ error: '❌ Automation failed', details: errorOutput });
    }
  });
});

app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});