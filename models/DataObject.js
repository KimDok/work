var mongoose = require('mongoose');

var DataObjectSchema = new mongoose.Schema({
  id: String,
  ID: Number,
  Date: { type: Date, default: Date.now },
  Result: {
      2: {
          object1: {
              name: String,
              mode: String,
              x: any,
              y: any
          },
          object2: {
              name: String,
              mode: String,
              L: any,
              L1: any
          }
      },
      3: any
  }
});

module.exports = mongoose.model('DataObject', DataObjectSchema);