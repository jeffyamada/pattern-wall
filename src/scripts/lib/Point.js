export default class Point {
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  static distance = (p1, p2 = { x: 0, y: 0 }) => {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt((dx * dx) + (dy * dy));
  };

  static distanceNum = (n1, n2) => {
    const distance = Point.distance({ x: n1, y: 0 }, { x: n2, y: 0 });
    return distance;
  };

  static polarRads = (distance, radians) => {
    const x = distance * Math.cos(radians);
    const y = distance * Math.sin(radians);
    return new Point(x, y);
  };

  static polarDegrees = (distance, degrees) => {
    const rads = (Math.PI / 180) * degrees;
    return Point.polarRads(distance, rads);
  };

  static lerp = (ratio, p1, p2) => {
    const x = p1.x + ((p2.x - p1.x) * ratio);
    const y = p1.y + ((p2.y - p1.y) * ratio);
    return new Point(x, y);
  };

  static lerpNum = (ratio, a, b) => {
    const num = a + ((b - a) * ratio);
    return num;
  };
}

//   // constructor: (@x=0, @y=0, @z=0) ->

//   set: (@x=0, @y=0, @z=0) ->

//   @pyth = (p1, p2) ->
//     dx = p2.x - p1.x
//     dy = p2.y - p1.y
//     Math.sqrt(dx*dx + dy*dy)

//   @polar = (distance, radians) ->
//     x: distance * Math.cos(radians)
//     y: distance * Math.sin(radians)

//   @lerp = (ratio, point1, point2) ->
//     x: point1.x + (point2.x - point1.x) * ratio
//     y: point1.y + (point2.y - point1.y) * ratio

//   @lerpNum = (ratio, a, b) ->
//     a + (b - a) * ratio

// module.exports = Point
