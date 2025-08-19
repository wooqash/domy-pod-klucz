// server.js
import express from 'express';
import { createServer } from 'vite';

const app = express();

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom'
});

app.use(vite.middlewares);

// Przekierowanie czystych URLi
app.get('/:page', (req, res) => {
  const { page } = req.params;
  res.sendFile(`${page}.html`, { root: './src/pages' });
});

app.listen(5173, () => {
  console.log('Serwer działa na http://localhost:5173');
});
