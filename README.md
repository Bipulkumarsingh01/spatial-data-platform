# Spatial Data Platform - Node.js Backend

## Prerequisites
- Node.js (v14+ recommended)
- MongoDB

## Setup and Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd spatial-data-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your MongoDB URI:
```
MONGODB_URI=mongodb://localhost:27017/spatial_data_platform
PORT=3000
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

## API Endpoints

### Points
- `POST /api/points/`: Create a new point
- `GET /api/points/`: List all points
- `GET /api/points/nearby`: Find nearby points

### Polygons
- `POST /api/polygons/`: Create a new polygon
- `GET /api/polygons/`: List all polygons
- `GET /api/polygons/within`: Find polygons containing a point

## Example Requests

### Create a Point
```json
{
  "name": "Office Location",
  "longitude": -73.935242,
  "latitude": 40.730610
}
```

### Create a Polygon
```json
{
  "name": "Park Boundary",
  "coordinates": [
    [
      [-73.935242, 40.730610],
      [-73.934242, 40.731610],
      [-73.933242, 40.730610],
      [-73.935242, 40.730610]
    ]
  ]
}
```