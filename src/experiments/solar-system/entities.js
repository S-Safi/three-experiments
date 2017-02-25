function randomAngle() {
  return Math.random() * Math.PI * 2;
}

// or
//
// const randomAngle = () => {
//   return Math.random() * Math.PI * 2;
// }
//
// or
//
// const randomAngle = () => Math.random() * Math.PI * 2;


const planets = [];

planets.push({
  name: 'mercury',
  orbitRadius: 200,
  radius: 10,
  speed: (Math.PI * 2) / (360 * 2),
  angle: randomAngle(),
  color: 0x666666,
});

planets.push({
  name: 'venus',
  orbitRadius: 300,
  radius: 20,
  speed: (Math.PI * 2) / (360 * 3),
  angle: randomAngle(),
  color: 0xffee00,
});

planets.push({
  name: 'earth',
  orbitRadius: 400,
  radius: 40,
  speed: (Math.PI * 2) / (360 * 4),
  angle: randomAngle(),
  // color: 0x0000ff,
  texture: '../../assets/textures/planets/earth.jpg',
});

planets.push({
  name: 'mars',
  orbitRadius: 600,
  radius: 30,
  speed: (Math.PI * 2) / (360 * 5),
  angle: randomAngle(),
  color: 0xff0000,
});

export default planets;
