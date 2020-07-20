var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var dataObject = require('../models/DataObject');

server.listen(4000)

// socket io
io.on('connection', function (socket) {
    socket.on('updatedata', function (data) {
        io.emit('update-data', { data: data });
    });
});

router.route("/try").get(function(req, res) {
    dataObject.find({}, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });

module.exports = router;