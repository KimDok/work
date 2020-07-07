var express = require('express');
var router = express.Router();
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var DataObject = require('../models/DataObject');

server.listen(4000)

// socket io
io.on('connection', function (socket) {
    socket.on('updatedata', function (data) {
        io.emit('update-data', { data: data });
    });
});

// list data
router.get('/', function(req, res) {
    DataObject.find(function (err, dataObject) {
        if (err) return next(err);
        res.json(dataObject);
        console.log("kimmmmm")
        console.log("dataObject")
    });
});

// item sales report
/*router.get('/itemsales',  function(req, res, next) {
    Sales.aggregate([
        {
            $group: { 
                _id: { itemId: '$itemId', itemName: '$itemName' }, 
                totalPrice: {
                    $sum: '$totalPrice'
                }
            }
        },
        { $sort: {totalPrice: 1} }
    ], function (err, sales) {
        if (err) return next(err);
        res.json(sales);
    });
});*/

// get data by id
router.get('/:id', function(req, res, next) {
    DataObject.findById(req.params.id, function (err, dataObject) {
        if (err) return next(err);
        res.json(dataObject);
    });
});
  
// post data
router.post('/', function(req, res, next) {
    DataObject.create(req.body, function (err, dataObject) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(dataObject);
    });
});
  
// put data
router.put('/:id', function(req, res, next) {
    DataObject.findByIdAndUpdate(req.params.id, req.body, function (err, dataObject) {
        if (err) {
            console.log(err);
            return next(err);
        }
        res.json(dataObject);
    });
});
  
// delete data by id
router.delete('/:id', function(req, res, next) {
    DataObject.findByIdAndRemove(req.params.id, req.body, function (err, dataObject) {
        if (err) return next(err);
        res.json(dataObject);
    });
});

module.exports = router;