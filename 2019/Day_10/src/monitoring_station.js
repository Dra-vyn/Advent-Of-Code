import { distinct, maxOf, zip } from "@std/collections";

const parse = (input) => input.split("\n");

const isAsteroid = (x) => x === "#";

const findAsteroidCoordinates = (input) => {
  const coordinates = [];

  for (let y = 0; y < input.length; y++) {
    const element = input[y];
    for (let x = 0; x < element.length; x++) {
      if (isAsteroid(element[x])) coordinates.push([x, y]);
    }
  }

  return coordinates;
};

const getDistance = (x1, y1, x2, y2) =>
  Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

const getSlope = (x1, y1, x2, y2) =>
  (Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI + 360 + 90) % 360;

const getAsteroidMetric = (coordinate, array, fn) => {
  const geometry = [];

  for (let j = 0; j < array.length; j++) {
    geometry.push(fn(...coordinate, array[j][0], array[j][1]));
  }
  return geometry;
};

const noOfVisibleAsteroids = (slope) => distinct(slope).length;

const getCurrentCoordinate = (coordinates, i) =>
  [coordinates[i][0], coordinates[i][1]];

const getOtherCoordinates = (coordinates, i) =>
  coordinates.filter((x) => x !== coordinates[i]);

const getCoordinates = (coordinates, i) =>
  [getCurrentCoordinate(coordinates, i), getOtherCoordinates(coordinates, i)];

const computeAsteroidData = (coordinates, i) => {
  const [coordinate, otherCoordinates] = getCoordinates(coordinates, i);
  const slope = getAsteroidMetric(coordinate, otherCoordinates, getSlope);
  const distance = getAsteroidMetric(coordinate, otherCoordinates, getDistance);
  const visibleAsteroids = noOfVisibleAsteroids(slope);
  return { coordinate, otherCoordinates, slope, distance, visibleAsteroids }
};

const findAsteroidGeometry = (coordinates) => {
  const geometry = [];
  for (let i = 0; i < coordinates.length; i++) {
    geometry.push(computeAsteroidData(coordinates, i));
  }

  return geometry;
};

const findAllAsteroidGeometry = (input) => {
  const coordinates = findAsteroidCoordinates(input);
  return findAsteroidGeometry(coordinates);
};

const highestVisibility = (asteroidGeometry) =>
  maxOf(asteroidGeometry, (x) => x.visibleAsteroids);

const getBestLocation = (geometry, highestVisibilityCount) =>
  geometry.filter((x) => x.visibleAsteroids === highestVisibilityCount);

const findBestAsteroidGeometry = (input) => {
  const asteroidGeometry = findAllAsteroidGeometry(input);
  const highestVisibilityCount = highestVisibility(asteroidGeometry);
  return getBestLocation(asteroidGeometry, highestVisibilityCount)[0];
};

const bestAsteroidGeometry = (input) => {
  const parsedInput = parse(input);
  return findBestAsteroidGeometry(parsedInput);
};

export const part1 = (input) => {
  const { coordinate, visibleAsteroids } = bestAsteroidGeometry(input);
  return { coordinate, visibleAsteroids };
};

const zipAsteroidData = (otherCoordinates, slope, distance) => {
  const asteroidData = zip( otherCoordinates, slope, distance );
  return asteroidData.map((x) =>
    ({ coordinate: x[0], slope: x[1], distance: x[2] }));
};

const sortAsteroidData = (asteroidGeometry) =>
  asteroidGeometry
    .sort((x, y) => x.distance - y.distance)
    .sort((x, y) => x.slope - y.slope);

const isPreviousAndCurrentSlopesSame = (asteroidData, i) =>
  asteroidData[i].slope === asteroidData[i - 1].slope

const orderByFirstDetectable = (asteroidData, detectedAsteroids = []) => {
  if (asteroidData.length === 0) return detectedAsteroids;
  const unDetectedAsteroids = [];
  detectedAsteroids.push(asteroidData[0]);

  for (let i = 1; i < asteroidData.length; i++) {
    !isPreviousAndCurrentSlopesSame(asteroidData, i)
      ? detectedAsteroids.push(asteroidData[i])
      : unDetectedAsteroids.push(asteroidData[i])
  }

  return orderByFirstDetectable(unDetectedAsteroids, detectedAsteroids);
}

export const formulate = (input) => {
  const { otherCoordinates, slope, distance } = bestAsteroidGeometry(input);
  const asteroidGeometry = zipAsteroidData(otherCoordinates, slope, distance);
  const sortedAsteroid = sortAsteroidData(asteroidGeometry);
  return orderByFirstDetectable(sortedAsteroid)[199].coordinate
}

export const part2 = (input) => {
  const [x, y] = formulate(input);
  return x * 100 + y;
};