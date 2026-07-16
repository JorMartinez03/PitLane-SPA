const LIVE_TEAMS = {
  F1: [
    { driver: 'Lando Norris', team: 'McLaren', number: 1 },
    { driver: 'Oscar Piastri', team: 'McLaren', number: 81 },
    { driver: 'George Russell', team: 'Mercedes', number: 63 },
    { driver: 'Andrea Kimi Antonelli', team: 'Mercedes', number: 12 },
    { driver: 'Max Verstappen', team: 'Red Bull Racing', number: 3 },
    { driver: 'Isack Hadjar', team: 'Red Bull Racing', number: 6 },
    { driver: 'Charles Leclerc', team: 'Ferrari', number: 16 },
    { driver: 'Lewis Hamilton', team: 'Ferrari', number: 44 },
    { driver: 'Alex Albon', team: 'Williams', number: 23 },
    { driver: 'Carlos Sainz', team: 'Williams', number: 55 },
    { driver: 'Liam Lawson', team: 'Racing Bulls', number: 30 },
    { driver: 'Arvid Lindblad', team: 'Racing Bulls', number: 41 },
    { driver: 'Fernando Alonso', team: 'Aston Martin', number: 14 },
    { driver: 'Lance Stroll', team: 'Aston Martin', number: 18 },
    { driver: 'Esteban Ocon', team: 'Haas F1 Team', number: 31 },
    { driver: 'Oliver Bearman', team: 'Haas F1 Team', number: 87 },
    { driver: 'Nico Hülkenberg', team: 'Audi', number: 27 },
    { driver: 'Gabriel Bortoleto', team: 'Audi', number: 5 },
    { driver: 'Pierre Gasly', team: 'Alpine', number: 10 },
    { driver: 'Franco Colapinto', team: 'Alpine', number: 43 },
    { driver: 'Valtteri Bottas', team: 'Cadillac', number: 77 },
    { driver: 'Sergio Perez', team: 'Cadillac', number: 11 },
  ],
  F2: [
    { driver: 'Rafael Câmara', team: 'Invicta Racing', number: 1 },
    { driver: 'Joshua Dürksen', team: 'Invicta Racing', number: 2 },
    { driver: 'Ritomo Miyata', team: 'Hitech', number: 3 },
    { driver: 'Colton Herta', team: 'Hitech', number: 4 },
    { driver: 'Noel León', team: 'Campos Racing', number: 5 },
    { driver: 'Nikola Tsolov', team: 'Campos Racing', number: 6 },
    { driver: 'Dino Beganovic', team: 'DAMS Lucas Oil', number: 7 },
    { driver: 'Roman Bilinski', team: 'DAMS Lucas Oil', number: 8 },
    { driver: 'Gabriele Minì', team: 'MP Motorsport', number: 9 },
    { driver: 'Oliver Goethe', team: 'MP Motorsport', number: 10 },
    { driver: 'Sebastian Montoya', team: 'PREMA Racing', number: 11 },
    { driver: 'Mari Boya', team: 'PREMA Racing', number: 12 },
    { driver: 'Martinius Stenshorne', team: 'Rodin Motorsport', number: 14 },
    { driver: 'Alexander Dunne', team: 'Rodin Motorsport', number: 15 },
    { driver: 'Kush Maini', team: 'ART Grand Prix', number: 16 },
    { driver: 'Tasanapol Inthraphuvasak', team: 'ART Grand Prix', number: 17 },
    { driver: 'Emerson Fittipaldi', team: 'AIX Racing', number: 20 },
    { driver: 'Cian Shields', team: 'AIX Racing', number: 21 },
    { driver: 'Nicolas Varrone', team: 'Van Amersfoort Racing', number: 22 },
    { driver: 'Rafael Villagómez', team: 'Van Amersfoort Racing', number: 23 },
    { driver: 'Laurens van Hoepen', team: 'Trident', number: 24 },
    { driver: 'John Bennett', team: 'Trident', number: 25 },
  ],
  F3: [
    { driver: 'Théophile Naël', team: 'Campos Racing', number: 1 },
    { driver: 'Ugo Ugochukwu', team: 'Campos Racing', number: 2 },
    { driver: 'Patrick Heuzenroeder', team: 'Campos Racing', number: 3 },
    { driver: 'Noah Strømsted', team: 'Trident', number: 4 },
    { driver: 'Freddie Slater', team: 'Trident', number: 5 },
    { driver: 'Matteo De Palo', team: 'Trident', number: 6 },
    { driver: 'Alessandro Giusti', team: 'MP Motorsport', number: 7 },
    { driver: 'Mattia Colnaghi', team: 'MP Motorsport', number: 8 },
    { driver: 'Tuukka Taponen', team: 'MP Motorsport', number: 9 },
    { driver: 'James Wharton', team: 'PREMA Racing', number: 10 },
    { driver: 'Louis Sharp', team: 'PREMA Racing', number: 11 },
    { driver: 'José Garfias', team: 'PREMA Racing', number: 12 },
    { driver: 'Brando Badoer', team: 'Rodin Motorsport', number: 13 },
    { driver: 'Christian Ho', team: 'Rodin Motorsport', number: 14 },
    { driver: 'Pedro Clerot', team: 'Rodin Motorsport', number: 15 },
    { driver: 'Maciej Gladysz', team: 'ART Grand Prix', number: 16 },
    { driver: 'Kanato The', team: 'ART Grand Prix', number: 17 },
    { driver: 'Taito Kato', team: 'ART Grand Prix', number: 18 },
    { driver: 'Nandhavud Bhirombhakdi', team: 'DAMS', number: 29 },
    { driver: 'Nicola Lacorte', team: 'DAMS', number: 30 },
    { driver: 'Gerrard Xie', team: 'DAMS', number: 31 },
  ],
  IndyCar: [
    { driver: 'Alex Palou', team: 'Chip Ganassi Racing', number: 10 },
    { driver: 'Kyle Kirkwood', team: 'Andretti Global', number: 27 },
    { driver: 'Christian Lundgaard', team: 'Arrow McLaren', number: 7 },
    { driver: 'David Malukas', team: 'Meyer Shank Racing', number: 66 },
    { driver: "Pato O'Ward", team: 'Arrow McLaren', number: 5 },
    { driver: 'Josef Newgarden', team: 'Team Penske', number: 2 },
    { driver: 'Felix Rosenqvist', team: 'Meyer Shank Racing', number: 60 },
    { driver: 'Scott McLaughlin', team: 'Team Penske', number: 3 },
    { driver: 'Colton Herta', team: 'Andretti Global', number: 26 },
    { driver: 'Will Power', team: 'Team Penske', number: 12 },
  ],
  NASCAR: [
    { driver: 'Denny Hamlin', team: 'Joe Gibbs Racing', number: 11 },
    { driver: 'Kyle Larson', team: 'Hendrick Motorsports', number: 5 },
    { driver: 'Chase Elliott', team: 'Hendrick Motorsports', number: 9 },
    { driver: 'William Byron', team: 'Hendrick Motorsports', number: 24 },
    { driver: 'Christopher Bell', team: 'Joe Gibbs Racing', number: 20 },
    { driver: 'Ryan Blaney', team: 'Team Penske', number: 12 },
    { driver: 'Tyler Reddick', team: '23XI Racing', number: 45 },
    { driver: 'Joey Logano', team: 'Team Penske', number: 22 },
    { driver: 'Ross Chastain', team: 'Trackhouse Racing', number: 1 },
    { driver: 'Brad Keselowski', team: 'RFK Racing', number: 6 },
  ],
  WEC: [
    { driver: 'Kamui Kobayashi', team: 'Toyota Gazoo Racing', number: 7 },
    { driver: 'Mike Conway', team: 'Toyota Gazoo Racing', number: 7 },
    { driver: 'Nyck de Vries', team: 'Toyota Gazoo Racing', number: 8 },
    { driver: 'Sébastien Buemi', team: 'Toyota Gazoo Racing', number: 8 },
    { driver: 'Brendon Hartley', team: 'Toyota Gazoo Racing', number: 8 },
    { driver: 'Ryo Hirakawa', team: 'Toyota Gazoo Racing', number: 8 },
    { driver: 'Robin Frijns', team: 'BMW M Team WRT', number: 15 },
    { driver: 'Sheldon Van der Linde', team: 'BMW M Team WRT', number: 15 },
    { driver: 'René Rast', team: 'BMW M Team WRT', number: 15 },
    { driver: 'Antonio Fuoco', team: 'Ferrari AF Corse', number: 50 },
  ],
  MotoGP: [
    { driver: 'Marco Bezzecchi', team: 'Aprilia Racing', number: 72 },
    { driver: 'Jorge Martín', team: 'Aprilia Racing', number: 89 },
    { driver: 'Fabio Di Giannantonio', team: 'VR46 Ducati', number: 49 },
    { driver: 'Marc Márquez', team: 'Ducati Lenovo', number: 93 },
    { driver: 'Ai Ogura', team: 'Trackhouse Aprilia', number: 79 },
    { driver: 'Pedro Acosta', team: 'Red Bull KTM', number: 37 },
    { driver: 'Francesco Bagnaia', team: 'Ducati Lenovo', number: 63 },
    { driver: 'Álex Márquez', team: 'Gresini Ducati', number: 73 },
    { driver: 'Brad Binder', team: 'Red Bull KTM', number: 33 },
    { driver: 'Raúl Fernández', team: 'Trackhouse Aprilia', number: 25 },
  ],
}

const TRACK_FLAGS = ['Verde', 'Amarilla', 'Safety Car', 'Roja', 'VSC']

const CATEGORY_LAPS = {
  F1: 58,
  F2: 37,
  F3: 26,
  IndyCar: 80,
  NASCAR: 200,
  WEC: 250,
  MotoGP: 27,
}

export function generateInitialPositions(category = 'F1') {
  const drivers = LIVE_TEAMS[category] || LIVE_TEAMS.F1
  return drivers.map((d, i) => ({
    position: i + 1,
    driver: d.driver,
    team: d.team,
    number: d.number,
    gap: i === 0 ? 'Lider' : `+${(Math.random() * 3 + 0.2 * i).toFixed(3)}s`,
    laps: Math.floor(Math.random() * 20) + 30,
    lastLap: `${Math.floor(Math.random() * 10) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}.${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`,
    pitStops: Math.floor(Math.random() * 3),
    interval: i === 0 ? '--' : `+${(Math.random() * 1.5).toFixed(3)}`,
  }))
}

export function generateRaceUpdate(positions) {
  const newPositions = positions.map((p) => ({ ...p }))
  const swapIdx = Math.floor(Math.random() * (newPositions.length - 1)) + 1
  const targetIdx = Math.min(swapIdx + (Math.random() > 0.5 ? 1 : -1), newPositions.length - 1)

  if (targetIdx > 0 && targetIdx < newPositions.length) {
    const temp = { ...newPositions[swapIdx] }
    newPositions[swapIdx] = { ...newPositions[targetIdx] }
    newPositions[targetIdx] = temp
    newPositions.forEach((p, i) => { p.position = i + 1 })
  }

  newPositions.forEach((p) => {
    p.laps = p.laps + (Math.random() > 0.7 ? 1 : 0)
    p.lastLap = `${Math.floor(Math.random() * 10) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}.${String(Math.floor(Math.random() * 999)).padStart(3, '0')}`
  })

  return newPositions
}

export function generateFlagChange() {
  if (Math.random() > 0.85) {
    return TRACK_FLAGS[Math.floor(Math.random() * TRACK_FLAGS.length)]
  }
  return null
}

export function getLapsForCategory(category) {
  return CATEGORY_LAPS[category] || 58
}

export { TRACK_FLAGS }
