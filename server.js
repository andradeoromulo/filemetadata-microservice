const express = require('express');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
require('dotenv').config();

var app = express();

app.use(cors());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(`${__dirname}/views/index.html`);
});

app.post('/api/fileanalyse', upload.single('upfile'), function(req, res) {
  
  const out = {
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  };

  res.json(out);

});

app.use(function(req, res) {
  res.status(404).sendFile(`${__dirname}/views/404.html`);
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
