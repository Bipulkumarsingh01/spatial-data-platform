const Polygon = require('../models/Polygon');
const turf = require('@turf/turf');

exports.createPolygon = async (req, res) => {
  try {
    const { name, coordinates, description } = req.body;

    // Calculate polygon area using Turf.js
    const turfPolygon = turf.polygon(coordinates);
    const area = turf.area(turfPolygon);

    const polygon = new Polygon({
      name,
      geometry: {
        coordinates: coordinates
      },
      properties: {
        description,
        area
      }
    });

    const savedPolygon = await polygon.save();
    res.status(201).json(savedPolygon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getAllPolygons = async (req, res) => {
  try {
    const { skip = 0, limit = 100 } = req.query;
    const polygons = await Polygon.find()
      .skip(Number(skip))
      .limit(Number(limit));
    res.json(polygons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPolygonsWithin = async (req, res) => {
  try {
    const { longitude, latitude } = req.query;

    const point = {
      type: 'Point',
      coordinates: [Number(longitude), Number(latitude)]
    };

    const polygonsWithin = await Polygon.find({
      geometry: {
        $geoIntersects: {
          $geometry: point
        }
      }
    });

    res.json(polygonsWithin);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};