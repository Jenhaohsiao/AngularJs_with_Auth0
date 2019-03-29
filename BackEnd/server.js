var express = require('express');
var app = express();
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');
var cors = require('cors');

var port = process.env.PORT || 3001;

app.use(cors());

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: "https://jenhao.auth0.com/.well-known/jwks.json"
    }),
    audience: 'https://angularjs-auth0/api',
    issuer: "https://jenhao.auth0.com/",
    algorithms: ['RS256']
});


app.get('/api/public', function(req, res) {
    res.json({
        message: "Hello, From public endpoint. You don't need to be authenticated to see this.",
    })
})

app.get('/api/private', jwtCheck, function(req, res) {
    res.json({
        message: "Hello, From private endpoint. You DO need to be authenticated to see this.",
    })
})
app.use(jwtCheck);


app.get('/authorized', function(req, res) {
    res.json({
        message: 'This is a scecure endpoint',
    })
});


app.listen(port, function() {
    console.log('Server is running on localhost:', port);
})