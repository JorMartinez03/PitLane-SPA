const races = [
  // ===== F1 2026 (22 rounds — Bahrain & Saudi Arabia cancelled) =====
  {
    id: 'f1-01', name: 'Gran Premio de Australia', circuit: 'Albert Park Circuit',
    date: '2026-03-08', category: 'F1', status: 'past',
    winner: 'George Russell', team: 'Mercedes',
  },
  {
    id: 'f1-02', name: 'Gran Premio de China', circuit: 'Shanghai International Circuit',
    date: '2026-03-15', category: 'F1', status: 'past',
    winner: 'Andrea Kimi Antonelli', team: 'Mercedes',
  },
  {
    id: 'f1-03', name: 'Gran Premio de Japón', circuit: 'Suzuka International Racing Course',
    date: '2026-03-29', category: 'F1', status: 'past',
    winner: 'Andrea Kimi Antonelli', team: 'Mercedes',
  },
  {
    id: 'f1-04', name: 'Gran Premio de Miami', circuit: 'Miami International Autodrome',
    date: '2026-05-03', category: 'F1', status: 'past',
    winner: 'Andrea Kimi Antonelli', team: 'Mercedes',
  },
  {
    id: 'f1-05', name: 'Gran Premio de Canadá', circuit: 'Circuit Gilles Villeneuve',
    date: '2026-05-24', category: 'F1', status: 'past',
    winner: 'Andrea Kimi Antonelli', team: 'Mercedes',
  },
  {
    id: 'f1-06', name: 'Gran Premio de Mónaco', circuit: 'Circuit de Monaco',
    date: '2026-06-07', category: 'F1', status: 'past',
    winner: 'Andrea Kimi Antonelli', team: 'Mercedes',
  },
  {
    id: 'f1-07', name: 'Gran Premio de España', circuit: 'Circuit de Barcelona-Catalunya',
    date: '2026-06-14', category: 'F1', status: 'past',
    winner: 'Lewis Hamilton', team: 'Ferrari',
  },
  {
    id: 'f1-08', name: 'Gran Premio de Austria', circuit: 'Red Bull Ring',
    date: '2026-06-28', category: 'F1', status: 'past',
    winner: 'George Russell', team: 'Mercedes',
  },
  {
    id: 'f1-09', name: 'Gran Premio de Gran Bretaña', circuit: 'Silverstone Circuit',
    date: '2026-07-05', category: 'F1', status: 'past',
    winner: 'Charles Leclerc', team: 'Ferrari',
  },
  {
    id: 'f1-10', name: 'Gran Premio de Bélgica', circuit: 'Circuit de Spa-Francorchamps',
    date: '2026-07-19', category: 'F1', status: 'upcoming', winner: null,
  },
  {
    id: 'f1-11', name: 'Gran Premio de Hungría', circuit: 'Hungaroring',
    date: '2026-07-26', category: 'F1', status: 'upcoming', winner: null,
  },
  {
    id: 'f1-12', name: 'Gran Premio de los Países Bajos', circuit: 'Circuit Zandvoort',
    date: '2026-08-23', category: 'F1', status: 'upcoming', winner: null,
  },
  {
    id: 'f1-13', name: 'Gran Premio de Italia', circuit: 'Autodromo Nazionale di Monza',
    date: '2026-09-06', category: 'F1', status: 'upcoming', winner: null,
  },
  {
    id: 'f1-14', name: 'Gran Premio de Madrid', circuit: 'Circuito de Madrid-Jarama',
    date: '2026-09-13', category: 'F1', status: 'upcoming', winner: null,
  },
  {
    id: 'f1-15', name: 'Gran Premio de Azerbaiyán', circuit: 'Baku City Circuit',
    date: '2026-09-26', category: 'F1', status: 'upcoming', winner: null,
  },
  {
    id: 'f1-16', name: 'Gran Premio de Singapur', circuit: 'Marina Bay Street Circuit',
    date: '2026-10-11', category: 'F1', status: 'upcoming', winner: null,
  },
  {
    id: 'f1-17', name: 'Gran Premio de Estados Unidos', circuit: 'Circuit of the Americas',
    date: '2026-10-25', category: 'F1', status: 'upcoming', winner: null,
  },
  {
    id: 'f1-18', name: 'Gran Premio de México', circuit: 'Autódromo Hermanos Rodríguez',
    date: '2026-11-01', category: 'F1', status: 'upcoming', winner: null,
  },
  {
    id: 'f1-19', name: 'Gran Premio de Brasil', circuit: 'Autódromo José Carlos Pace',
    date: '2026-11-08', category: 'F1', status: 'upcoming', winner: null,
  },
  {
    id: 'f1-20', name: 'Gran Premio de Las Vegas', circuit: 'Las Vegas Strip Circuit',
    date: '2026-11-21', category: 'F1', status: 'upcoming', winner: null,
  },
  {
    id: 'f1-21', name: 'Gran Premio de Catar', circuit: 'Lusail International Circuit',
    date: '2026-11-29', category: 'F1', status: 'upcoming', winner: null,
  },
  {
    id: 'f1-22', name: 'Gran Premio de Abu Dabi', circuit: 'Yas Marina Circuit',
    date: '2026-12-06', category: 'F1', status: 'upcoming', winner: null,
  },

  // ===== F2 2026 (14 rounds) =====
  {
    id: 'f2-01', name: 'F2 Australia — Feature Race', circuit: 'Albert Park Circuit',
    date: '2026-03-08', category: 'F2', status: 'past', winner: null,
  },
  {
    id: 'f2-02', name: 'F2 Miami — Feature Race', circuit: 'Miami International Autodrome',
    date: '2026-05-03', category: 'F2', status: 'past', winner: null,
  },
  {
    id: 'f2-03', name: 'F2 Canadá — Feature Race', circuit: 'Circuit Gilles Villeneuve',
    date: '2026-05-24', category: 'F2', status: 'past', winner: null,
  },
  {
    id: 'f2-04', name: 'F2 Mónaco — Feature Race', circuit: 'Circuit de Monaco',
    date: '2026-06-07', category: 'F2', status: 'past', winner: null,
  },
  {
    id: 'f2-05', name: 'F2 España — Feature Race', circuit: 'Circuit de Barcelona-Catalunya',
    date: '2026-06-14', category: 'F2', status: 'past', winner: null,
  },
  {
    id: 'f2-06', name: 'F2 Austria — Feature Race', circuit: 'Red Bull Ring',
    date: '2026-06-28', category: 'F2', status: 'past', winner: null,
  },
  {
    id: 'f2-07', name: 'F2 Gran Bretaña — Feature Race', circuit: 'Silverstone Circuit',
    date: '2026-07-05', category: 'F2', status: 'past', winner: null,
  },
  {
    id: 'f2-08', name: 'F2 Bélgica — Feature Race', circuit: 'Circuit de Spa-Francorchamps',
    date: '2026-07-19', category: 'F2', status: 'upcoming', winner: null,
  },
  {
    id: 'f2-09', name: 'F2 Hungría — Feature Race', circuit: 'Hungaroring',
    date: '2026-07-26', category: 'F2', status: 'upcoming', winner: null,
  },
  {
    id: 'f2-10', name: 'F2 Italia — Feature Race', circuit: 'Autodromo Nazionale di Monza',
    date: '2026-09-06', category: 'F2', status: 'upcoming', winner: null,
  },
  {
    id: 'f2-11', name: 'F2 Madrid — Feature Race', circuit: 'Circuito de Madrid-Jarama',
    date: '2026-09-13', category: 'F2', status: 'upcoming', winner: null,
  },
  {
    id: 'f2-12', name: 'F2 Azerbaiyán — Feature Race', circuit: 'Baku City Circuit',
    date: '2026-09-26', category: 'F2', status: 'upcoming', winner: null,
  },
  {
    id: 'f2-13', name: 'F2 Catar — Feature Race', circuit: 'Lusail International Circuit',
    date: '2026-11-29', category: 'F2', status: 'upcoming', winner: null,
  },
  {
    id: 'f2-14', name: 'F2 Abu Dabi — Feature Race', circuit: 'Yas Marina Circuit',
    date: '2026-12-06', category: 'F2', status: 'upcoming', winner: null,
  },

  // ===== F3 2026 (10 rounds) =====
  {
    id: 'f3-01', name: 'F3 Australia — Feature Race', circuit: 'Albert Park Circuit',
    date: '2026-03-08', category: 'F3', status: 'past', winner: null,
  },
  {
    id: 'f3-02', name: 'F3 Baréin — Feature Race', circuit: 'Bahrain International Circuit',
    date: '2026-04-12', category: 'F3', status: 'past', winner: null,
  },
  {
    id: 'f3-03', name: 'F3 Mónaco — Feature Race', circuit: 'Circuit de Monaco',
    date: '2026-06-07', category: 'F3', status: 'past', winner: null,
  },
  {
    id: 'f3-04', name: 'F3 España — Feature Race', circuit: 'Circuit de Barcelona-Catalunya',
    date: '2026-06-14', category: 'F3', status: 'past', winner: null,
  },
  {
    id: 'f3-05', name: 'F3 Austria — Feature Race', circuit: 'Red Bull Ring',
    date: '2026-06-28', category: 'F3', status: 'past', winner: null,
  },
  {
    id: 'f3-06', name: 'F3 Gran Bretaña — Feature Race', circuit: 'Silverstone Circuit',
    date: '2026-07-05', category: 'F3', status: 'past', winner: null,
  },
  {
    id: 'f3-07', name: 'F3 Bélgica — Feature Race', circuit: 'Circuit de Spa-Francorchamps',
    date: '2026-07-19', category: 'F3', status: 'upcoming', winner: null,
  },
  {
    id: 'f3-08', name: 'F3 Hungría — Feature Race', circuit: 'Hungaroring',
    date: '2026-07-26', category: 'F3', status: 'upcoming', winner: null,
  },
  {
    id: 'f3-09', name: 'F3 Italia — Feature Race', circuit: 'Autodromo Nazionale di Monza',
    date: '2026-09-06', category: 'F3', status: 'upcoming', winner: null,
  },
  {
    id: 'f3-10', name: 'F3 Madrid — Feature Race', circuit: 'Circuito de Madrid-Jarama',
    date: '2026-09-13', category: 'F3', status: 'upcoming', winner: null,
  },

  // ===== IndyCar 2026 (17 rounds) =====
  {
    id: 'ind-01', name: 'Firestone Grand Prix of St. Petersburg', circuit: 'Streets of St. Petersburg',
    date: '2026-03-01', category: 'IndyCar', status: 'past',
    winner: 'Alex Palou',
  },
  {
    id: 'ind-02', name: 'Good Ranchers 250', circuit: 'Phoenix Raceway',
    date: '2026-03-07', category: 'IndyCar', status: 'past',
    winner: 'Josef Newgarden',
  },
  {
    id: 'ind-03', name: 'Java House Grand Prix of Arlington', circuit: 'Streets of Arlington',
    date: '2026-03-15', category: 'IndyCar', status: 'past',
    winner: 'Kyle Kirkwood',
  },
  {
    id: 'ind-04', name: "Children's of Alabama Indy Grand Prix", circuit: 'Barber Motorsports Park',
    date: '2026-03-29', category: 'IndyCar', status: 'past',
    winner: 'Alex Palou',
  },
  {
    id: 'ind-05', name: 'Acura Grand Prix of Long Beach', circuit: 'Streets of Long Beach',
    date: '2026-04-19', category: 'IndyCar', status: 'past',
    winner: 'Alex Palou',
  },
  {
    id: 'ind-06', name: 'Sonsio Grand Prix', circuit: 'Indianapolis Motor Speedway Road Course',
    date: '2026-05-09', category: 'IndyCar', status: 'past',
    winner: 'Christian Lundgaard',
  },
  {
    id: 'ind-07', name: '110th Indianapolis 500', circuit: 'Indianapolis Motor Speedway',
    date: '2026-05-24', category: 'IndyCar', status: 'past',
    winner: 'Felix Rosenqvist',
  },
  {
    id: 'ind-08', name: 'Grand Prix of Detroit', circuit: 'Streets of Detroit',
    date: '2026-05-31', category: 'IndyCar', status: 'past',
    winner: 'Alex Palou',
  },
  {
    id: 'ind-09', name: 'Bommarito Automotive Group 500', circuit: 'World Wide Technology Raceway',
    date: '2026-06-07', category: 'IndyCar', status: 'past',
    winner: 'Josef Newgarden',
  },
  {
    id: 'ind-10', name: 'XPEL Grand Prix at Road America', circuit: 'Road America',
    date: '2026-06-21', category: 'IndyCar', status: 'past',
    winner: 'Christian Lundgaard',
  },
  {
    id: 'ind-11', name: 'Honda Indy 200 at Mid-Ohio', circuit: 'Mid-Ohio Sports Car Course',
    date: '2026-07-05', category: 'IndyCar', status: 'past',
    winner: 'Pato O\'Ward',
  },
  {
    id: 'ind-12', name: 'Nashville 500', circuit: 'Nashville Superspeedway',
    date: '2026-07-19', category: 'IndyCar', status: 'upcoming', winner: null,
  },
  {
    id: 'ind-13', name: 'Grand Prix of Portland', circuit: 'Portland International Raceway',
    date: '2026-08-09', category: 'IndyCar', status: 'upcoming', winner: null,
  },
  {
    id: 'ind-14', name: 'Grand Prix of Markham', circuit: 'Streets of Markham',
    date: '2026-08-16', category: 'IndyCar', status: 'upcoming', winner: null,
  },
  {
    id: 'ind-15', name: 'Grand Prix of Washington D.C.', circuit: 'Streets of Washington D.C.',
    date: '2026-08-23', category: 'IndyCar', status: 'upcoming', winner: null,
  },
  {
    id: 'ind-16', name: 'Milwaukee Mile Doubleheader', circuit: 'The Milwaukee Mile',
    date: '2026-08-29', category: 'IndyCar', status: 'upcoming', winner: null,
  },
  {
    id: 'ind-17', name: 'Grand Prix of Monterey', circuit: 'WeatherTech Raceway Laguna Seca',
    date: '2026-09-06', category: 'IndyCar', status: 'upcoming', winner: null,
  },

  // ===== NASCAR Cup Series 2026 (36 rounds — key races) =====
  {
    id: 'ncs-01', name: 'Daytona 500', circuit: 'Daytona International Speedway',
    date: '2026-02-15', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-02', name: 'Autotrader 400', circuit: 'EchoPark Speedway',
    date: '2026-02-22', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-03', name: 'DuraMAX Grand Prix', circuit: 'Circuit of the Americas',
    date: '2026-03-01', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-04', name: 'Straight Talk Wireless 500', circuit: 'Phoenix Raceway',
    date: '2026-03-08', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-05', name: 'Pennzoil 400', circuit: 'Las Vegas Motor Speedway',
    date: '2026-03-15', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-06', name: 'Goodyear 400', circuit: 'Darlington Raceway',
    date: '2026-03-22', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-07', name: 'Cook Out 400', circuit: 'Martinsville Speedway',
    date: '2026-03-29', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-08', name: 'Food City 500', circuit: 'Bristol Motor Speedway',
    date: '2026-04-12', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-09', name: 'AdventHealth 400', circuit: 'Kansas Speedway',
    date: '2026-04-19', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-10', name: "Jack Link's 500", circuit: 'Talladega Superspeedway',
    date: '2026-04-26', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-11', name: 'Würth 400', circuit: 'Texas Motor Speedway',
    date: '2026-05-03', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-12', name: 'Coca-Cola 600', circuit: 'Charlotte Motor Speedway',
    date: '2026-05-24', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-13', name: 'Cracker Barrel 400', circuit: 'Nashville Superspeedway',
    date: '2026-05-31', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-14', name: 'FireKeepers Casino 400', circuit: 'Michigan International Speedway',
    date: '2026-06-07', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-15', name: 'Toyota/Save Mart 350', circuit: 'Sonoma Raceway',
    date: '2026-06-28', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-16', name: 'eero 400', circuit: 'Chicagoland Speedway',
    date: '2026-07-05', category: 'NASCAR', status: 'past', winner: null,
  },
  {
    id: 'ncs-17', name: 'Quaker State 400', circuit: 'Atlanta Motor Speedway',
    date: '2026-07-12', category: 'NASCAR', status: 'upcoming', winner: null,
  },
  {
    id: 'ncs-18', name: 'Window World 450', circuit: 'North Wilkesboro Speedway',
    date: '2026-07-19', category: 'NASCAR', status: 'upcoming', winner: null,
  },
  {
    id: 'ncs-19', name: 'Brickyard 400', circuit: 'Indianapolis Motor Speedway',
    date: '2026-07-26', category: 'NASCAR', status: 'upcoming', winner: null,
  },
  {
    id: 'ncs-20', name: 'Iowa Corn 350', circuit: 'Iowa Speedway',
    date: '2026-08-09', category: 'NASCAR', status: 'upcoming', winner: null,
  },
  {
    id: 'ncs-21', name: 'Cook Out Southern 500', circuit: 'Darlington Raceway',
    date: '2026-09-06', category: 'NASCAR', status: 'upcoming', winner: null,
  },
  {
    id: 'ncs-22', name: 'NASCAR Cup Series Championship', circuit: 'Homestead-Miami Speedway',
    date: '2026-11-08', category: 'NASCAR', status: 'upcoming', winner: null,
  },

  // ===== WEC 2026 (8 rounds) =====
  {
    id: 'wec-01', name: '6 Horas de Imola', circuit: 'Autodromo Enzo e Dino Ferrari',
    date: '2026-04-19', category: 'WEC', status: 'past',
    winner: 'Toyota Racing — Buemi/Hartley/Hirakawa',
  },
  {
    id: 'wec-02', name: '6 Horas de Spa-Francorchamps', circuit: 'Circuit de Spa-Francorchamps',
    date: '2026-05-09', category: 'WEC', status: 'past',
    winner: 'BMW M Team WRT — Frijns/Van der Linde/Rast',
  },
  {
    id: 'wec-03', name: '24 Horas de Le Mans', circuit: 'Circuit de la Sarthe',
    date: '2026-06-14', category: 'WEC', status: 'past',
    winner: 'Toyota Racing — Conway/Kobayashi/de Vries',
  },
  {
    id: 'wec-04', name: '6 Horas de São Paulo', circuit: 'Autódromo de Interlagos',
    date: '2026-07-12', category: 'WEC', status: 'upcoming', winner: null,
  },
  {
    id: 'wec-05', name: 'Lone Star Le Mans', circuit: 'Circuit of the Americas',
    date: '2026-09-06', category: 'WEC', status: 'upcoming', winner: null,
  },
  {
    id: 'wec-06', name: '6 Horas de Fuji', circuit: 'Fuji Speedway',
    date: '2026-09-27', category: 'WEC', status: 'upcoming', winner: null,
  },
  {
    id: 'wec-07', name: 'Catar 1812 km', circuit: 'Lusail International Circuit',
    date: '2026-10-22', category: 'WEC', status: 'upcoming', winner: null,
  },
  {
    id: 'wec-08', name: '8 Horas de Baréin', circuit: 'Bahrain International Circuit',
    date: '2026-11-07', category: 'WEC', status: 'upcoming', winner: null,
  },

  // ===== MotoGP 2026 (22 rounds) =====
  {
    id: 'mot-01', name: 'Gran Premio de Tailandia', circuit: 'Chang International Circuit',
    date: '2026-03-01', category: 'MotoGP', status: 'past', winner: null,
  },
  {
    id: 'mot-02', name: 'Gran Premio de Brasil', circuit: 'Autódromo Ayrton Senna',
    date: '2026-03-22', category: 'MotoGP', status: 'past', winner: null,
  },
  {
    id: 'mot-03', name: 'Gran Premio de las Américas', circuit: 'Circuit of the Americas',
    date: '2026-03-29', category: 'MotoGP', status: 'past', winner: null,
  },
  {
    id: 'mot-04', name: 'Gran Premio de España', circuit: 'Circuito de Jerez',
    date: '2026-04-26', category: 'MotoGP', status: 'past', winner: null,
  },
  {
    id: 'mot-05', name: 'Gran Premio de Francia', circuit: 'Bugatti Circuit — Le Mans',
    date: '2026-05-10', category: 'MotoGP', status: 'past', winner: null,
  },
  {
    id: 'mot-06', name: 'Gran Premio de Cataluña', circuit: 'Circuit de Barcelona-Catalunya',
    date: '2026-05-17', category: 'MotoGP', status: 'past', winner: null,
  },
  {
    id: 'mot-07', name: 'Gran Premio de Italia', circuit: 'Autodromo del Mugello',
    date: '2026-05-31', category: 'MotoGP', status: 'past', winner: null,
  },
  {
    id: 'mot-08', name: 'Gran Premio de Hungría', circuit: 'Balaton Park Circuit',
    date: '2026-06-07', category: 'MotoGP', status: 'past', winner: null,
  },
  {
    id: 'mot-09', name: 'Gran Premio de la República Checa', circuit: 'Brno Circuit',
    date: '2026-06-21', category: 'MotoGP', status: 'past', winner: null,
  },
  {
    id: 'mot-10', name: 'Gran Premio de los Países Bajos', circuit: 'TT Circuit Assen',
    date: '2026-06-28', category: 'MotoGP', status: 'past', winner: null,
  },
  {
    id: 'mot-11', name: 'Gran Premio de Alemania', circuit: 'Sachsenring',
    date: '2026-07-12', category: 'MotoGP', status: 'upcoming', winner: null,
  },
  {
    id: 'mot-12', name: 'Gran Premio de Gran Bretaña', circuit: 'Silverstone Circuit',
    date: '2026-08-09', category: 'MotoGP', status: 'upcoming', winner: null,
  },
  {
    id: 'mot-13', name: 'Gran Premio de Aragón', circuit: 'MotorLand Aragón',
    date: '2026-08-30', category: 'MotoGP', status: 'upcoming', winner: null,
  },
  {
    id: 'mot-14', name: 'Gran Premio de San Marino', circuit: 'Misano World Circuit',
    date: '2026-09-13', category: 'MotoGP', status: 'upcoming', winner: null,
  },
  {
    id: 'mot-15', name: 'Gran Premio de Austria', circuit: 'Red Bull Ring',
    date: '2026-09-20', category: 'MotoGP', status: 'upcoming', winner: null,
  },
  {
    id: 'mot-16', name: 'Gran Premio de Japón', circuit: 'Mobility Resort Motegi',
    date: '2026-10-04', category: 'MotoGP', status: 'upcoming', winner: null,
  },
  {
    id: 'mot-17', name: 'Gran Premio de Indonesia', circuit: 'Mandalika International Circuit',
    date: '2026-10-11', category: 'MotoGP', status: 'upcoming', winner: null,
  },
  {
    id: 'mot-18', name: 'Gran Premio de Australia', circuit: 'Phillip Island Grand Prix Circuit',
    date: '2026-10-25', category: 'MotoGP', status: 'upcoming', winner: null,
  },
  {
    id: 'mot-19', name: 'Gran Premio de Malasia', circuit: 'Sepang International Circuit',
    date: '2026-11-01', category: 'MotoGP', status: 'upcoming', winner: null,
  },
  {
    id: 'mot-20', name: 'Gran Premio de Catar', circuit: 'Lusail International Circuit',
    date: '2026-11-08', category: 'MotoGP', status: 'upcoming', winner: null,
  },
  {
    id: 'mot-21', name: 'Gran Premio de Portugal', circuit: 'Autódromo do Algarve',
    date: '2026-11-22', category: 'MotoGP', status: 'upcoming', winner: null,
  },
  {
    id: 'mot-22', name: 'Gran Premio de la Comunidad Valenciana', circuit: 'Circuit Ricardo Tormo',
    date: '2026-11-29', category: 'MotoGP', status: 'upcoming', winner: null,
  },
]

export default races
