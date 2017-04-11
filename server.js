const express = require('express');
const path = require('path');
const app = express();
const auth = require('http-auth');

const BUILD_DIR = path.join(__dirname, 'dist');

const basic = auth.basic({
  realm: 'POM Wonderful'
  }, (username, password, callback) => {
    callback(username === 'ib' && password === 'pom');
  }
);

app.use(auth.connect(basic), express.static(BUILD_DIR));

app.get('/*', function (req, res) {
  res.sendFile(path.join(BUILD_DIR, 'index.html'));
});

app.listen(process.env.PORT || 8080);
