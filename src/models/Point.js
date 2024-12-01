const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],
      required: true,
      validate: {
        validator: function(v) {
          return v.length === 2 && 
                 v[0] >= -180 && v[0] <= 180 && 
                 v[1] >= -90 && v[1] <= 90;
        },
        message: 'Invalid coordinates'
      }
    }
  },
  properties: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true,
  collection: 'points'
});

PointSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Point', PointSchema);