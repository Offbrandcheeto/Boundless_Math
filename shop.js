const starterPackEl = document.getElementById("starter-pack");
const classicPackEl = document.getElementById("classic-pack");
const elitePackEl = document.getElementById("elite-pack");
const starterModal = document.getElementById("starter-modal");
const classicModal = document.getElementById("classic-modal");
const eliteModal = document.getElementById("elite-modal");
const starterImageContainer = document.getElementById("starter-image-display");
const classicImageContainer = document.getElementById("classic-image-display");
const eliteImageContainer = document.getElementById("elite-image-display");
const shopSnow = document.getElementById("shop-snow");

const alex = document.getElementById("card-one");
const avery = document.getElementById("card-two");
const casey = document.getElementById("card-three");
const harper = document.getElementById("card-four");
const sammy = document.getElementById("card-five");
const taylor = document.getElementById("card-six");
const blaze = document.getElementById("card-seven");
const gabe = document.getElementById("card-eight");
const leela = document.getElementById("card-nine");
const pebble = document.getElementById("card-ten");
const riley = document.getElementById("card-eleven");
const thomas = document.getElementById("card-twelve");
const adric = document.getElementById("card-thirteen");
const ralph = document.getElementById("card-fourteen");
const sarah = document.getElementById("card-fifteen");
const parker = document.getElementById("card-sixteen");

let alexUnlocked = false;
let averyUnlocked = false;
let caseyUnlocked = false;
let harperUnlocked = false;
let sammyUnlocked = false;
let taylorUnlocked = false;
let blazeUnlocked = false;
let gabeUnlocked = false;
let leelaUnlocked = false;
let pebbleUnlocked = false;
let rileyUnlocked = false;
let thomasUnlocked = false;
let adricUnlocked = false;
let ralphUnlocked = false;
let sarahUnlocked = false;
let parkerUnlocked = false;

let snow = 0;

const commonPenguins = ["Alex", "Avery", "Casey", "Harper", "Sammy", "Taylor"];
const uncommonPenguins = ["Blaze", "Gabe", "Leela", "Pebble", "Riley", "Thomas"];
const rarePenguins = ["Adric", "Ralph", "Sarah"];
const secretPenguins = ["Parker"];

// Penguin check
function penguinCheck(penguin) {
  switch(penguin) {
    case "Alex":
      alexUnlocked = true;
      break;
    case "Avery":
      averyUnlocked = true;
      break;
    case "Casey":
      caseyUnlocked = true;
      break;
    case "Harper":
      harperUnlocked = true;
      break;
    case "Sammy":
      sammyUnlocked = true;
      break;
    case "Taylor":
      taylorUnlocked = true;
      break;
    case "Blaze":
      blazeUnlocked = true;
      break;
    case "Gabe":
      gabeUnlocked = true;
      break;
    case "Leela":
      leelaUnlocked = true;
      break;
    case "Pebble":
      pebbleUnlocked = true;
      break;
    case "Riley":
      rileyUnlocked = true;
      break;
    case "Thomas":
      thomasUnlocked = true;
      break;
    case "Adric":
      adricUnlocked = true;
      break;
    case "Ralph":
      ralphUnlocked = true;
      break;
    case "Sarah":
      sarahUnlocked = true;
      break;
    case "Parker":
      parkerUnlocked = true;
      break;
  }
}

// Opening cards
function commonCard() {
  let randomIndex = Math.floor(Math.random() * commonPenguins.length);
  let penguin = commonPenguins[randomIndex];
  return`Images/Penguin_Cards/Commons/${penguin}.svg`;
}

function uncommonCard() {
  let randomIndex = Math.floor(Math.random() * uncommonPenguins.length);
  let penguin = uncommonPenguins[randomIndex];
  return`Images/Penguin_Cards/Uncommons/${penguin}.svg`;
}

function rareCard() {
  let randomIndex = Math.floor(Math.random() * rarePenguins.length);
  let penguin = rarePenguins[randomIndex];
  return`Images/Penguin_Cards/Rares/${penguin}.svg`;
}

// Session storage and UI updating
function loadGameState() {
  const gameStatePenguins = JSON.parse(sessionStorage.getItem('gameStatePenguins'));
  const gameState= JSON.parse(sessionStorage.getItem('gameState'));

  if (gameStatePenguins) {
    alexUnlocked = gameStatePenguins.alexUnlocked;
    averyUnlocked = gameStatePenguins.averyUnlocked;
    caseyUnlocked = gameStatePenguins.caseyUnlocked;
    harperUnlocked = gameStatePenguins.harperUnlocked;
    sammyUnlocked = gameStatePenguins.sammyUnlocked;
    taylorUnlocked = gameStatePenguins.taylorUnlocked;
    blazeUnlocked = gameStatePenguins.blazeUnlocked;
    gabeUnlocked = gameStatePenguins.gabeUnlocked;
    leelaUnlocked = gameStatePenguins.leelaUnlocked;
    pebbleUnlocked = gameStatePenguins.pebbleUnlocked;
    rileyUnlocked = gameStatePenguins.rileyUnlocked;
    thomasUnlocked = gameStatePenguins.thomasUnlocked;
    adricUnlocked = gameStatePenguins.adricUnlocked;
    ralphUnlocked = gameStatePenguins.ralphUnlocked;
    sarahUnlocked = gameStatePenguins.sarahUnlocked;
    parkerUnlocked = gameStatePenguins.parkerUnlocked;
  }

  if (gameState) {
    snow = gameState.snow;
    shopSnow.textContent = `Your Snow: ${snow}`;
  }
}

function galleryUpdate() {
  // Snow update
  shopSnow.textContent = `Your Snow: ${snow}`;
  
  alex.src = alexUnlocked ? "Images/Penguin_Cards/Commons/Alex.svg" : "Images/Penguin_Cards/Common_Locked_Card.svg";
  avery.src = averyUnlocked ? "Images/Penguin_Cards/Commons/Avery.svg" : "Images/Penguin_Cards/Common_Locked_Card.svg";
  casey.src = caseyUnlocked ? "Images/Penguin_Cards/Commons/Casey.svg" : "Images/Penguin_Cards/Common_Locked_Card.svg";
  harper.src = harperUnlocked ? "Images/Penguin_Cards/Commons/Harper.svg" : "Images/Penguin_Cards/Common_Locked_Card.svg";
  sammy.src = sammyUnlocked ? "Images/Penguin_Cards/Commons/Sammy.svg" : "Images/Penguin_Cards/Common_Locked_Card.svg";
  taylor.src = taylorUnlocked ? "Images/Penguin_Cards/Commons/Taylor.svg" : "Images/Penguin_Cards/Common_Locked_Card.svg";
  blaze.src = blazeUnlocked ? "Images/Penguin_Cards/Uncommons/Blaze.svg" : "Images/Penguin_Cards/Uncommon_Locked_Card.svg";
  gabe.src = gabeUnlocked ? "Images/Penguin_Cards/Uncommons/Gabe.svg" : "Images/Penguin_Cards/Uncommon_Locked_Card.svg";
  leela.src = leelaUnlocked ? "Images/Penguin_Cards/Uncommons/Leela.svg" : "Images/Penguin_Cards/Uncommon_Locked_Card.svg";
  pebble.src = pebbleUnlocked ? "Images/Penguin_Cards/Uncommons/Pebble.svg" : "Images/Penguin_Cards/Uncommon_Locked_Card.svg";
  riley.src = rileyUnlocked ? "Images/Penguin_Cards/Uncommons/Riley.svg" : "Images/Penguin_Cards/Uncommon_Locked_Card.svg";
  thomas.src = thomasUnlocked ? "Images/Penguin_Cards/Uncommons/Thomas.svg" : "Images/Penguin_Cards/Uncommon_Locked_Card.svg";
  adric.src = adricUnlocked ? "Images/Penguin_Cards/Rares/Adric.svg" : "Images/Penguin_Cards/Rare_Locked_Card.svg";
  ralph.src = ralphUnlocked ? "Images/Penguin_Cards/Rares/Ralph.svg" : "Images/Penguin_Cards/Rare_Locked_Card.svg";
  sarah.src = sarahUnlocked ? "Images/Penguin_Cards/Rares/Sarah.svg" : "Images/Penguin_Cards/Rare_Locked_Card.svg";
  parker.src = parkerUnlocked ? "Images/Penguin_Cards/Secrets/Parker.svg" : "Images/Penguin_Cards/Secret_Locked_Card.svg";
}

function saveGameState() {
  const gameStatePenguins = {
    snow: snow,
    alexUnlocked: alexUnlocked,
    averyUnlocked: averyUnlocked,
    caseyUnlocked: caseyUnlocked,
    harperUnlocked: harperUnlocked,
    sammyUnlocked: sammyUnlocked,
    taylorUnlocked: taylorUnlocked,
    blazeUnlocked: blazeUnlocked,
    gabeUnlocked: gabeUnlocked,
    leelaUnlocked: leelaUnlocked,
    pebbleUnlocked: pebbleUnlocked,
    rileyUnlocked: rileyUnlocked,
    thomasUnlocked: thomasUnlocked,
    adricUnlocked: adricUnlocked,
    ralphUnlocked: ralphUnlocked,
    sarahUnlocked: sarahUnlocked,
    parkerUnlocked: parkerUnlocked
  };
  sessionStorage.setItem('gameStatePenguins', JSON.stringify(gameStatePenguins));
}

function saveGameStateSnow() {
    const gameState = JSON.parse(sessionStorage.getItem('gameState')) || {};
    gameState.snow = snow;
    sessionStorage.setItem('gameState', JSON.stringify(gameState));
}

// Pack openings
function starterPackOpen() {
  if (snow >= 75) {
    snow -= 75;
    starterImageContainer.innerHTML = ''; // Clear previous images
    
    for (let i = 0; i < 2; i++) {
      let penguin;
      let imageUrl;
      
      if (i === 0) {
        penguin = commonCard().split('/').pop().split('.')[0]; // Get the penguin name from the image URL
        imageUrl = `Images/Penguin_Cards/Commons/${penguin}.svg`;
      } else {
        if (Math.random() < 0.5) {
          penguin = commonPenguins[Math.floor(Math.random() * commonPenguins.length)];
          imageUrl = `Images/Penguin_Cards/Commons/${penguin}.svg`;
        } else {
          penguin = uncommonPenguins[Math.floor(Math.random() * uncommonPenguins.length)];
          imageUrl = `Images/Penguin_Cards/Uncommons/${penguin}.svg`;
        }
      }
      
      starterImageContainer.innerHTML += `<img src="${imageUrl}" alt="Penguin card" class="pack-penguin">`;
      
      // Update unlock status based on the penguin
      penguinCheck(penguin);
    }
    
    galleryUpdate();
    starterModal.style.display = "flex";
    setTimeout(function() {
      starterModal.style.display = "none";
    }, 5000);
  }
}

function classicPackOpen() {
  if (snow >= 150) {
    snow -= 150;
    classicImageContainer.innerHTML = ''; // Clear previous images
    
    for (let i = 0; i < 3; i++) {
      let penguin;
      let imageUrl;
      
      if (i === 0) {
        penguin = commonCard().split('/').pop().split('.')[0]; // Get the penguin name from the image URL
        imageUrl = `Images/Penguin_Cards/Commons/${penguin}.svg`;
      } else if (i === 1) {
        penguin = uncommonCard().split('/').pop().split('.')[0]; // Get the penguin name from the image URL
        imageUrl = `Images/Penguin_Cards/Uncommons/${penguin}.svg`;
      } else {
        let randomNum = Math.random();
        if (randomNum < 0.35) {
          penguin = commonPenguins[Math.floor(Math.random() * commonPenguins.length)];
          imageUrl = `Images/Penguin_Cards/Commons/${penguin}.svg`;
        } else if (randomNum < 0.85) {
          penguin = uncommonPenguins[Math.floor(Math.random() * uncommonPenguins.length)];
          imageUrl = `Images/Penguin_Cards/Uncommons/${penguin}.svg`;
        } else {
          penguin = rarePenguins[Math.floor(Math.random() * rarePenguins.length)];
          imageUrl = `Images/Penguin_Cards/Rares/${penguin}.svg`;
        }
      }
      
      classicImageContainer.innerHTML += `<img src="${imageUrl}" alt="Penguin card" class="pack-penguin">`;
      
      // Update unlock status based on the penguin
      penguinCheck(penguin);
    }
    
    galleryUpdate();
    classicModal.style.display = "flex";
    setTimeout(function() {
      classicModal.style.display = "none";
    }, 7500);
  }
}

function elitePackOpen() {
  if (snow >= 250) {
    snow -= 250;
    eliteImageContainer.innerHTML = ''; // Clear previous images
    
    for (let i = 0; i < 5; i++) {
      let penguin;
      let imageUrl;
      
      if (i === 0 || i === 1) {
        penguin = commonCard().split('/').pop().split('.')[0]; // Get the penguin name from the image URL
        imageUrl = `Images/Penguin_Cards/Commons/${penguin}.svg`;
      } else if (i === 2) {
        penguin = uncommonCard().split('/').pop().split('.')[0]; // Get the penguin name from the image URL
        imageUrl = `Images/Penguin_Cards/Uncommons/${penguin}.svg`;
      } else if (i === 3) {
        penguin = rareCard().split('/').pop().split('.')[0]; // Get the penguin name from the image URL
        imageUrl = `Images/Penguin_Cards/Rares/${penguin}.svg`;
      } else {
        let randomNum = Math.random();
        if (randomNum < 0.1) {
          penguin = commonPenguins[Math.floor(Math.random() * commonPenguins.length)];
          imageUrl = `Images/Penguin_Cards/Commons/${penguin}.svg`;
        } else if (randomNum < 0.30) {
          penguin = uncommonPenguins[Math.floor(Math.random() * uncommonPenguins.length)];
          imageUrl = `Images/Penguin_Cards/Uncommons/${penguin}.svg`;
        } else if (randomNum < 0.80) {
          penguin = rarePenguins[Math.floor(Math.random() * rarePenguins.length)];
          imageUrl = `Images/Penguin_Cards/Rares/${penguin}.svg`;
        } else {
          penguin = secretPenguins[Math.floor(Math.random() * secretPenguins.length)];
          imageUrl = `Images/Penguin_Cards/Secrets/${penguin}.svg`;
        }
      }
      
      eliteImageContainer.innerHTML += `<img src="${imageUrl}" alt="Penguin card" class="pack-penguin">`;
      
      // Update unlock status based on the penguin
      penguinCheck(penguin);
    }
    
    galleryUpdate();
    eliteModal.style.display = "flex";
    setTimeout(function() {
      eliteModal.style.display = "none";
    }, 10000);
  }
}

starterPackEl.addEventListener('click', starterPackOpen);
classicPackEl.addEventListener('click', classicPackOpen);
elitePackEl.addEventListener('click', elitePackOpen);

loadGameState();
galleryUpdate();
const saveInterval = setInterval(saveGameState, 500);
const updateSnow = setInterval(saveGameStateSnow, 500);