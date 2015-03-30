var config = require('./settings.cfg');
var winston = require('winston');
var app = require('express')();
var server = require('http').createServer(app);

// enable string format
var format = require('string-format')
format.extend(String.prototype)

//logging
winston.level = config.loglevel;

var bodyParser = require('body-parser');
app.use(bodyParser.json());

/* Returns JSON array of connected sockets and metadata*/
app.get('/api/sockets', function(req, res) {
    winston.info('/api/sockets');

    list = {sockets: []};
    for(i = 0;i < sockets.length;i++) {
        list.sockets.push(
            {
                sessionId: sockets[i]
            }
        );
    }

    res.json(list);
});

/* Accept a POST of a broadcast event that will be forwarded
   to all connected clients */
app.post('/pushevent/:event/', function(req, res, next) {
    io.sockets.emit(req.params.event, req.body);
    res.status(200).send("OK");

    next();
});

/* Accept a POST of a directed event that will be forwarded
   to a connected client with a specified session ID*/
app.post('/pushevent/:sessionid/:event/', function(req, res, next) {
    var session_id = req.params.sessionid;
    winston.info('Session Event Session <{}>, Event <{}>, Request Body: {}'.format(sessionid, req.params.event, JSON.stringify(req.body)));

    if(sockets[sessionid]) {
        sockets[sessionid].emit(req.params.event, req.body);
        res.status(200).send('OK');
    } else {
        res.status(500).send('Session <{}> not found'.format(sessionid));
    }

    next();
});

server.listen(config.port, function() {
    winston.debug('Listening on port {}'.format(config.port));
});

// initialize a collection to contain active socket.io sessions
var sockets = {};
// init server
io = require('socket.io').listen(server);
io.on('connection', function(socket) {


    winston.debug('New socket connected. Socket Id: <{}>'.format(socket.id));

    /* Allows client to register its web app sessionid with the service */
    socket.on('register', function(sessionid) {
        sockets[sessionid] = socket;
        winston.debug('New socket registered. Sessionid: <{}>'.format(sessionid));
    });
});
