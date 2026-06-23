/* TECHAUTO PLUS — Araç marka & model verisi + aranabilir açılır liste
   Marka seçilince model listesi otomatik dolar. Yeni marka/model eklemek için
   CAR_DATA objesine ekleme yapmanız yeterlidir. */
const CAR_DATA = {
  "Alfa Romeo": ["147","156","159","166","Giulia","Giulietta","GT","MiTo","Stelvio","Tonale","Brera","Spider"],
  "Audi": ["A1","A3","A4","A5","A6","A7","A8","Q2","Q3","Q4 e-tron","Q5","Q7","Q8","TT","R8","e-tron","S3","S4","RS3","RS6"],
  "BMW": ["1 Serisi","2 Serisi","3 Serisi","4 Serisi","5 Serisi","6 Serisi","7 Serisi","8 Serisi","X1","X2","X3","X4","X5","X6","X7","Z4","i3","i4","iX","M2","M3","M4","M5"],
  "BYD": ["Atto 3","Dolphin","Seal","Han","Tang","Song"],
  "Chery": ["Tiggo 7 Pro","Tiggo 8 Pro","Tiggo 9","Arrizo","Omoda 5"],
  "Chevrolet": ["Aveo","Cruze","Captiva","Spark","Lacetti","Trax","Malibu","Kalos","Epica","Camaro"],
  "Chrysler": ["300C","Voyager","PT Cruiser","Sebring"],
  "Citroën": ["C1","C2","C3","C3 Aircross","C4","C4 Cactus","C5","C5 Aircross","C5 X","C-Elysée","Berlingo","Nemo","Jumpy","Xsara","Picasso"],
  "Cupra": ["Leon","Formentor","Born","Ateca","Tavascan"],
  "Dacia": ["Sandero","Sandero Stepway","Logan","Duster","Lodgy","Dokker","Jogger","Spring"],
  "Daihatsu": ["Terios","Sirion","Materia","Cuore"],
  "Dodge": ["Charger","Challenger","Journey","Nitro"],
  "DS": ["DS3","DS4","DS5","DS7","DS9"],
  "Fiat": ["Egea","Egea Cross","500","500X","500L","500e","Panda","Punto","Linea","Doblo","Fiorino","Tipo","Bravo","Albea","Palio","Marea","Stilo","Ducato","Scudo","Qubo"],
  "Ford": ["Fiesta","Focus","Mondeo","Kuga","Puma","EcoSport","Edge","Explorer","Mustang","Mustang Mach-E","Ranger","Transit","Transit Custom","Transit Connect","Courier","Tourneo Connect","Tourneo Courier","Galaxy","S-Max","C-Max","B-Max","Fusion"],
  "Geely": ["Coolray","Emgrand","Tugella"],
  "Honda": ["Civic","Accord","City","Jazz","CR-V","HR-V","ZR-V","Insight","Legend","Pilot"],
  "Hyundai": ["i10","i20","i30","Accent","Elantra","Bayon","Kona","Tucson","Santa Fe","ix35","ix20","Getz","Sonata","Ioniq","Ioniq 5","Ioniq 6","Matrix","Coupe","H-1","Staria"],
  "Infiniti": ["Q30","Q50","QX30","QX50","QX70"],
  "Isuzu": ["D-Max","NPR","NLR","Midi"],
  "JAC": ["J7","JS3","JS4","e-JS4"],
  "Jaguar": ["XE","XF","XJ","F-Pace","E-Pace","I-Pace","F-Type"],
  "Jeep": ["Renegade","Compass","Cherokee","Grand Cherokee","Wrangler","Avenger","Gladiator"],
  "Kia": ["Picanto","Rio","Ceed","Cerato","Sportage","Sorento","Stonic","Niro","Soul","Venga","Carens","Optima","Stinger","EV6","XCeed"],
  "Lada": ["Vesta","Granta","Niva","Kalina","Priora","Samara"],
  "Lancia": ["Ypsilon","Delta","Musa"],
  "Land Rover": ["Defender","Discovery","Discovery Sport","Range Rover","Range Rover Sport","Range Rover Evoque","Range Rover Velar","Freelander"],
  "Lexus": ["CT","IS","ES","GS","LS","UX","NX","RX","LX","RC","RZ"],
  "Maserati": ["Ghibli","Quattroporte","Levante","Grecale","GranTurismo"],
  "Mazda": ["2","3","6","CX-3","CX-30","CX-5","CX-60","MX-5","MX-30","CX-7"],
  "Mercedes-Benz": ["A-Serisi","B-Serisi","C-Serisi","E-Serisi","S-Serisi","CLA","CLS","GLA","GLB","GLC","GLE","GLS","G-Serisi","SL","SLK","AMG GT","EQA","EQB","EQC","EQE","EQS","Vito","V-Serisi","Sprinter","Citan"],
  "MG": ["MG3","MG4","MG5","ZS","HS","Marvel R","ZS EV"],
  "Mini": ["Cooper","Cooper S","One","Clubman","Countryman","Cabrio","Paceman"],
  "Mitsubishi": ["Lancer","ASX","Outlander","Eclipse Cross","L200","Pajero","Space Star","Colt","Attrage","Carisma"],
  "Nissan": ["Micra","Note","Juke","Qashqai","X-Trail","Leaf","Navara","Primera","Almera","Pathfinder","Murano","370Z","GT-R","Pulsar","Townstar"],
  "Opel": ["Corsa","Astra","Insignia","Mokka","Crossland","Grandland","Combo","Vivaro","Zafira","Meriva","Vectra","Vita","Adam","Karl","Antara","Agila"],
  "Peugeot": ["108","208","308","408","508","2008","3008","5008","Partner","Rifter","Expert","Boxer","206","207","301","307","407","Bipper","Traveller"],
  "Porsche": ["911","Cayenne","Macan","Panamera","Taycan","Boxster","Cayman","718"],
  "Renault": ["Clio","Megane","Symbol","Taliant","Captur","Kadjar","Koleos","Austral","Scenic","Talisman","Fluence","Laguna","Latitude","Twingo","Zoe","Megane E-Tech","Kangoo","Trafic","Master","Express","Duster"],
  "Seat": ["Ibiza","Leon","Arona","Ateca","Tarraco","Toledo","Alhambra","Cordoba","Altea","Mii"],
  "Škoda": ["Fabia","Octavia","Superb","Scala","Rapid","Kamiq","Karoq","Kodiaq","Enyaq","Citigo","Roomster","Yeti"],
  "Smart": ["ForTwo","ForFour","#1","#3"],
  "SsangYong": ["Tivoli","Korando","Rexton","Musso","Actyon","Rodius"],
  "Subaru": ["Impreza","Legacy","Outback","Forester","XV","BRZ","Levorg"],
  "Suzuki": ["Swift","Baleno","SX4","Vitara","S-Cross","Jimny","Ignis","Celerio","Grand Vitara","Splash","Alto"],
  "Tesla": ["Model 3","Model S","Model X","Model Y"],
  "Togg": ["T10X","T10F"],
  "Tofaş": ["Şahin","Doğan","Kartal","Serçe","Murat 124","Murat 131"],
  "Toyota": ["Yaris","Yaris Cross","Corolla","Corolla Cross","Auris","Camry","C-HR","RAV4","Land Cruiser","Hilux","Avensis","Aygo","Aygo X","Proace","Proace City","Verso","Prius","bZ4X","Supra","Highlander"],
  "Volkswagen": ["Polo","Golf","Passat","Jetta","Arteon","T-Cross","T-Roc","Tiguan","Touareg","Touran","Sharan","Caddy","Transporter","Amarok","Up","Scirocco","Beetle","Bora","CC","ID.3","ID.4","ID.5","Taigo","Caravelle"],
  "Volvo": ["S60","S90","V40","V60","V90","XC40","XC60","XC90","C40","EX30","EX90"],
  "Haval": ["Jolion","H6","Dargo"],
  "Diğer / Listede yok": ["Diğer"]
};

(function () {
  function byId(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/"/g, '&quot;'); }
  function fill(dl, items) { if (dl) dl.innerHTML = items.map(function (x) { return '<option value="' + esc(x) + '">'; }).join(''); }
  function findBrand(name) {
    name = (name || '').trim().toLowerCase();
    for (var b in CAR_DATA) { if (b.toLowerCase() === name) return b; }
    return null;
  }
  document.addEventListener('DOMContentLoaded', function () {
    var marka = byId('car-marka'), model = byId('car-model'), hidden = byId('marka-combined');
    var dlM = byId('dl-marka'), dlMod = byId('dl-model');
    if (!marka || !hidden) return;
    fill(dlM, Object.keys(CAR_DATA).sort(function (a, b) { return a.localeCompare(b, 'tr'); }));
    function sync() {
      var b = marka.value.trim(), m = model ? model.value.trim() : '';
      hidden.value = (b + (m ? ' ' + m : '')).trim();
    }
    function onMarka() {
      var b = findBrand(marka.value);
      if (b && model) { fill(dlMod, CAR_DATA[b].slice().sort(function (a, c) { return a.localeCompare(c, 'tr'); })); model.placeholder = 'Model seçin veya yazın'; }
      else if (model) { dlMod.innerHTML = ''; }
      sync();
    }
    marka.addEventListener('input', onMarka);
    marka.addEventListener('change', onMarka);
    if (model) { model.addEventListener('input', sync); model.addEventListener('change', sync); }
  });
})();
