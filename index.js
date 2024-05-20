const express = require('express');
const path = require('path'); // for resolving file paths
const fs = require('fs');

const app = express();
const port = 3000; // change port if needed

// Serve static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// List available static files
app.get('/:dir/files', (req, res) => {
  const dir = req.params.dir;
  fs.readdir(`public/${dir}`, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading files');
    }
    res.json(files); // Send the list of filenames as JSON
  });
});

// List available static files
app.get('/files', (req, res) => {
  fs.readdir('public', (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error reading files');
    }
    res.json(files); // Send the list of filenames as JSON
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  console.log(`Start with => http://localhost:${port}/files`);
});
