const express = require('express');
const path = require('path');
const app = express();

const BUILD_DIR = path.join(__dirname, 'dist');

app.use(express.static(BUILD_DIR));

app.get('/*', function (req, res) {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

app.listen(process.env.PORT || 8084);
