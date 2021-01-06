var express = require('express');
var cors = require("cors");
var app = express();
app.use(cors());

var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var port = process.env.PORT || 3001;

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://alj-poc.au.auth0.com/.well-known/jwks.json'
    }),
    audience: 'IdentifierMyAXABELogInAPI',
    issuer: 'https://alj-poc.au.auth0.com/',
    algorithms: ['RS256']
});

//app.use(jwtCheck);

app.get('/user/validate', jwtCheck, function (req, res) {
  var request = require("request");

  var options = { method: 'POST',
    url: 'https://alj-poc.au.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"lPiAxXjiPYIRGxGYz2a7q83dxNTC5Bnc","client_secret":"46K75WOnZqpCMoPxXXnGYUi8U-OC0RljhW8-Adi9Dc5GP5HTkSkueRHCLVM7hEvJ","audience":"https://alj-poc.au.auth0.com/api/v2/","grant_type":"client_credentials"}' };
  
  request(options, function (error, response, body) {
    if (error) throw new Error(error);
  
    console.log(body);
  });
});

app.get('/', function(ree, res) {
  res.json({ message: "OK"})
});

app.listen(port);