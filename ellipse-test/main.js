import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { Feature } from 'ol';
import { Polygon } from 'ol/geom';
import { Fill, Stroke, Style } from 'ol/style';
import { GeoJSON } from 'ol/format';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';

// Create a source for the features
const source = new VectorSource();

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    new VectorLayer({
      source: source,
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});

// Function to draw an ellipse on the map
function addEllipseFeature(center, semiMajor, semiMinor) {
  let coordinates = [];
  const radians = Math.PI / 180;
  for (let angle = 1; angle <= 360; angle++) {
    const px = center[0] + semiMajor * Math.cos(radians * angle);
    const py = center[1] + semiMinor * Math.sin(radians * angle);
    coordinates.push([px, py]);
  }

  const geoJson = {
    type: 'Feature',
    geometry: {
      type: 'Polygon',
      coordinates: [],
    },
  };
  
  coordinates = [coordinates]; // Wrap the coordinates in an additional array
  geoJson.geometry.coordinates = coordinates;
  
  const polygonFeature = new Feature({
    geometry: new Polygon(coordinates),
  });
  
  const layerStyle = new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
    }),
  });

  polygonFeature.setStyle(layerStyle);
  source.addFeature(polygonFeature);
}

// Usage example to draw a large and noticeable ellipse on the map
const center = [0, 0]; // Center coordinates of the ellipse
const semiMajor = 2000000; // Semi-major axis in meters
const semiMinor = 1000000; // Semi-minor axis in meters

addEllipseFeature(center, semiMajor, semiMinor);