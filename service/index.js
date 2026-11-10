const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());
app.use(cookieParser());

app.get('/api/health', (req, res) => {
  res.json({ message: 'Kaiwa backend is running!' });
});

app.use(express.static('public'));

app.listen(port, () => {
 
console.log(`Kaiwa service listening on port ${port}`);
});
