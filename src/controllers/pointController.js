const Point = require('../models/Point');
const turf = require('@turf/turf');

exports.createPoint = async (req, res) => {
  try {
    const { name, longitude, latitude, properties } = req.body;

    const point = new Point({
      name,
      location: {
        coordinates: [longitude, latitude]
      },
      properties: properties || {}
    });

    const savedPoint = await point.save();
    res.status(201).json(savedPoint);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllPoints = async (req, res) => {
  try {
    const { skip = 0, limit = 100 } = req.query;
    const points = await Point.find()
      .skip(Number(skip))
      .limit(Number(limit));
    res.json(points);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getNearbyPoints = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 10000 } = req.query;

    const nearbyPoints = await Point.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [Number(longitude), Number(latitude)]
          },
          $maxDistance: Number(maxDistance) // distance in meters
        }
      }
    });

    res.json(nearbyPoints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};