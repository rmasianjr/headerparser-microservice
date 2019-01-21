const express = require('express');
const cors = require('cors');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ optionsSuccessStatus: 200 }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/whoami', (req, res) => {
  const ipaddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const software = req.headers['user-agent'];
  const language = req.headers['accept-language'];

  res.json({ ipaddress, language, software });
});

app.use((req, res) => {
  res.status(404);
  res.send({ error: 'Not Found' });
});

app.use((err, req, res, next) => {
  res.status(500);
  res.send({ error: err.message });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
