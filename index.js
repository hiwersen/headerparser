require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

/**
 * Enable CORS (Cross-origin resource sharing) middleware
 * so that your API is remotely testable by FreeCodeCamp
 * @see {@link https://www.npmjs.com/package/cors}
 */
const cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

/**
 * Serve static files (CSS, JavaScript, images) from the 'public' directory
 */
app.use("/public", express.static(__dirname + '/public'));

/**
 * Handle the root route and serve the index.html file
 */
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/**
 * @api {get} /api/whoami Get Client Information
 * @apiName GetClientInfo
 * @apiGroup ClientInfo
 *
 * @apiSuccess {String} ipaddress Client's IP address.
 * @apiSuccess {String} language Client's preferred language from the Accept-Language header.
 * @apiSuccess {String} software Client's software (user-agent) information.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "ipaddress": "127.0.0.1",
 *       "language": "en-US,en;q=0.9",
 *       "software": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36"
 *     }
 */
app.get('/api/whoami', function (req, res) {
  
  let { ['x-forwarded-for']: ipaddress, ['accept-language']: language, ['user-agent']: software } = req.headers;
  ipaddress = ipaddress || req.ip;

  res.json({ ipaddress, language, software });

});

/**
 * Start the server and log the listening port
 */
const listener = app.listen(port, function () {
  console.log('Listening on port ' + listener.address().port);
});
