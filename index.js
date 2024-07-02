const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/ls', (req, res) => {
  fs.readdir('public', (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading files');
    }
    files = files.filter(file => file !== 'favicon.ico' && file !== 'index.html');
    res.json(files);
  });
});

app.get('/:dir', (req, res) => {
  const dir = req.params.dir;
  fs.readdir(`public/${dir}`, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading files');
    }
    res.json(files);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Start with => http://localhost:${port}`);
});
