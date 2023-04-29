require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

app.use("/public", express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/api/whoami', function (req, res) {
  
  let { ['x-forwarded-for']: ipaddress, ['accept-language']: language, ['user-agent']: software } = req.headers;
  ipaddress = ipaddress || req.ip;
  
  res.json({ ipaddress, language, software });

});

const listener = app.listen(port, function () {
  console.log('Listening on port ' + listener.address().port);
});
