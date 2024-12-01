const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PolygonSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  geometry: {
    type: {
      type: String,
      enum: ['Polygon'],
      required: true,
      default: 'Polygon'
    },
    coordinates: {
      type: [[[Number]]],
      required: true,
      validate: {
        validator: function(v) {
          return v.length > 0 && v[0].length >= 4;
        },
        message: 'Invalid polygon coordinates'
      }
    }
  },
  properties: {
    description: String,
    area: Number
  }
}, {
  timestamps: true,
  collection: 'polygons'
});

PolygonSchema.index({ geometry: '2dsphere' });

module.exports = mongoose.model('Polygon', PolygonSchema);