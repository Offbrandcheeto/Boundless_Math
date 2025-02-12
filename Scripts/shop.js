// Const variables
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

const starterPackPrice = 250;
const classicPackPrice = 500;
const elitePackPrice = 1000;
const cardDelay = 1000;

// Penguins
const thomas = document.getElementById("thomas");
const aris = document.getElementById("aris");
const rachel = document.getElementById("rachel");
const tris = document.getElementById("tris");
const tobias = document.getElementById("tobias");
const caleb = document.getElementById("caleb");
const evan = document.getElementById("evan");
const cassie = document.getElementById("cassie");
const newt = document.getElementById("newt");
const megan = document.getElementById("megan");
const ben = document.getElementById("ben");
const will = document.getElementById("will");

const prim = document.getElementById("prim");
const katniss = document.getElementById("katniss");
const finnick = document.getElementById("finnick");
const scarlioni = document.getElementById("scarlioni");
const romana = document.getElementById("romana");
const scorby = document.getElementById("scorby");
const gale = document.getElementById("gale");
const tegan = document.getElementById("tegan");

const ralph = document.getElementById("ralph");
const adric = document.getElementById("adric");
const sarah = document.getElementById("sarah");
const nyssa = document.getElementById("nyssa");

const holden = document.getElementById("holden");

// Let variables
let snow;

let thomasUnlocked = false;
let arisUnlocked = false;
let rachelUnlocked = false;
let trisUnlocked = false;
let tobiasUnlocked = false;
let calebUnlocked = false;
let evanUnlocked = false;
let cassieUnlocked = false;
let newtUnlocked = false;
let meganUnlocked = false;
let benUnlocked = false;
let willUnlocked = false;

let primUnlocked = false;
let katnissUnlocked = false;
let finnickUnlocked = false;
let scarlioniUnlocked = false;
let romanaUnlocked = false;
let scorbyUnlocked = false;
let galeUnlocked = false;
let teganUnlocked = false;

let ralphUnlocked = false;
let adricUnlocked = false;
let sarahUnlocked = false;
let nyssaUnlocked = false;

let holdenUnlocked = false;

// Arrays
const commonPenguins = [
  "Thomas",
  "Aris",
  "Rachel",
  "Tris",
  "Tobias",
  "Caleb",
  "Evan",
  "Cassie",
  "Newt",
  "Megan",
  "Ben",
  "Will"
];
const uncommonPenguins = [
  "Prim",
  "Katniss",
  "Finnick",
  "Scarlioni",
  "Romana",
  "Scorby",
  "Gale",
  "Tegan"
];
const rarePenguins = ["Ralph", "Adric", "Sarah", "Nyssa"];
const secretPenguins = ["Holden"];

// Save and update function
function updateGame() {
  shopSnow.textContent = `Your Snow: ${snow}`;
  saveGameState();
  saveGameStateSnow();
  galleryUpdate();
}

function penguinCheck(penguin) {
  switch (penguin) {
    case "Thomas":
      thomasUnlocked = true;
      break;
    case "Aris":
      arisUnlocked = true;
      break;
    case "Rachel":
      rachelUnlocked = true;
      break;
    case "Tris":
      trisUnlocked = true;
      break;
    case "Tobias":
      tobiasUnlocked = true;
      break;
    case "Caleb":
      calebUnlocked = true;
      break;
    case "Evan":
      evanUnlocked = true;
      break;
    case "Cassie":
      cassieUnlocked = true;
      break;
    case "Newt":
      newtUnlocked = true;
      break;
    case "Megan":
      meganUnlocked = true;
      break;
    case "Ben":
      benUnlocked = true;
      break;
    case "Will":
      willUnlocked = true;
      break;
    case "Prim":
      primUnlocked = true;
      break;
    case "Katniss":
      katnissUnlocked = true;
      break;
    case "Finnick":
      finnickUnlocked = true;
      break;
    case "Scarlioni":
      scarlioniUnlocked = true;
      break;
    case "Romana":
      romanaUnlocked = true;
      break;
    case "Scorby":
      scorbyUnlocked = true;
      break;
    case "Gale":
      galeUnlocked = true;
      break;
    case "Tegan":
      teganUnlocked = true;
      break;
    case "Ralph":
      ralphUnlocked = true;
      break;
    case "Adric":
      adricUnlocked = true;
      break;
    case "Sarah":
      sarahUnlocked = true;
      break;
    case "Nyssa":
      sarahUnlocked = true;
      break;
    case "Holden":
      holdenUnlocked = true;
      break;
  }
}

// Card functions
function commonCard() {
  let randomIndex = Math.floor(Math.random() * commonPenguins.length);
  let penguin = commonPenguins[randomIndex];
  return `Images/Penguin_Cards/Commons/${penguin}.svg`;
}

function uncommonCard() {
  let randomIndex = Math.floor(Math.random() * uncommonPenguins.length);
  let penguin = uncommonPenguins[randomIndex];
  return `Images/Penguin_Cards/Uncommons/${penguin}.svg`;
}

function rareCard() {
  let randomIndex = Math.floor(Math.random() * rarePenguins.length);
  let penguin = rarePenguins[randomIndex];
  return `Images/Penguin_Cards/Rares/${penguin}.svg`;
}

// Gallery update function
function galleryUpdate() {
  thomas.src = thomasUnlocked
    ? "Images/Penguin_Cards/Commons/Thomas.svg"
    : "Images/Penguin_Cards/Locked_Cards/Common_Locked_Card.svg";
  aris.src = arisUnlocked
    ? "Images/Penguin_Cards/Commons/Aris.svg"
    : "Images/Penguin_Cards/Locked_Cards/Common_Locked_Card.svg";
  rachel.src = rachelUnlocked
    ? "Images/Penguin_Cards/Commons/Rachel.svg"
    : "Images/Penguin_Cards/Locked_Cards/Common_Locked_Card.svg";
  tris.src = trisUnlocked
    ? "Images/Penguin_Cards/Commons/Tris.svg"
    : "Images/Penguin_Cards/Locked_Cards/Common_Locked_Card.svg";
  tobias.src = tobiasUnlocked
    ? "Images/Penguin_Cards/Commons/Tobias.svg"
    : "Images/Penguin_Cards/Locked_Cards/Common_Locked_Card.svg";
  caleb.src = calebUnlocked
    ? "Images/Penguin_Cards/Commons/Caleb.svg"
    : "Images/Penguin_Cards/Locked_Cards/Common_Locked_Card.svg";
  evan.src = evanUnlocked
    ? "Images/Penguin_Cards/Commons/Evan.svg"
    : "Images/Penguin_Cards/Locked_Cards/Common_Locked_Card.svg";
  cassie.src = cassieUnlocked
    ? "Images/Penguin_Cards/Commons/Cassie.svg"
    : "Images/Penguin_Cards/Locked_Cards/Common_Locked_Card.svg";
  newt.src = newtUnlocked
    ? "Images/Penguin_Cards/Commons/Newt.svg"
    : "Images/Penguin_Cards/Locked_Cards/Common_Locked_Card.svg";
  megan.src = meganUnlocked
    ? "Images/Penguin_Cards/Commons/Megan.svg"
    : "Images/Penguin_Cards/Locked_Cards/Common_Locked_Card.svg";
  ben.src = benUnlocked
    ? "Images/Penguin_Cards/Commons/Ben.svg"
    : "Images/Penguin_Cards/Locked_Cards/Common_Locked_Card.svg";
  will.src = willUnlocked
    ? "Images/Penguin_Cards/Commons/Will.svg"
    : "Images/Penguin_Cards/Locked_Cards/Common_Locked_Card.svg";
  
  prim.src = primUnlocked
    ? "Images/Penguin_Cards/Uncommons/Prim.svg"
    : "Images/Penguin_Cards/Locked_Cards/Uncommon_Locked_Card.svg";
  katniss.src = katnissUnlocked
    ? "Images/Penguin_Cards/Uncommons/Katniss.svg"
    : "Images/Penguin_Cards/Locked_Cards/Uncommon_Locked_Card.svg";
  finnick.src = finnickUnlocked
    ? "Images/Penguin_Cards/Uncommons/Finnick.svg"
    : "Images/Penguin_Cards/Locked_Cards/Uncommon_Locked_Card.svg";
  scarlioni.src = scarlioniUnlocked
    ? "Images/Penguin_Cards/Uncommons/Scarlioni.svg"
    : "Images/Penguin_Cards/Locked_Cards/Uncommon_Locked_Card.svg";
  romana.src = romanaUnlocked
    ? "Images/Penguin_Cards/Uncommons/Romana.svg"
    : "Images/Penguin_Cards/Locked_Cards/Uncommon_Locked_Card.svg";
  scorby.src = scorbyUnlocked
    ? "Images/Penguin_Cards/Uncommons/Scorby.svg"
    : "Images/Penguin_Cards/Locked_Cards/Uncommon_Locked_Card.svg";
  gale.src = galeUnlocked
    ? "Images/Penguin_Cards/Uncommons/Gale.svg"
    : "Images/Penguin_Cards/Locked_Cards/Uncommon_Locked_Card.svg";
  tegan.src = teganUnlocked
    ? "Images/Penguin_Cards/Uncommons/Tegan.svg"
    : "Images/Penguin_Cards/Locked_Cards/Uncommon_Locked_Card.svg";

  ralph.src = ralphUnlocked
    ? "Images/Penguin_Cards/Rares/Ralph.svg"
    : "Images/Penguin_Cards/Locked_Cards/Rare_Locked_Card.svg";
  adric.src = adricUnlocked
    ? "Images/Penguin_Cards/Rares/Adric.svg"
    : "Images/Penguin_Cards/Locked_Cards/Rare_Locked_Card.svg";
  sarah.src = sarahUnlocked
    ? "Images/Penguin_Cards/Rares/Sarah.svg"
    : "Images/Penguin_Cards/Locked_Cards/Rare_Locked_Card.svg";
  nyssa.src = nyssaUnlocked
    ? "Images/Penguin_Cards/Rares/Nyssa.svg"
    : "Images/Penguin_Cards/Locked_Cards/Rare_Locked_Card.svg";

  holden.src = holdenUnlocked
    ? "Images/Penguin_Cards/Secrets/Holden.svg"
    : "Images/Penguin_Cards/Locked_Cards/Secret_Locked_Card.svg";
}

// Save game state function
function saveGameState() {
  const gameStatePenguins = {
    snow: snow,
    thomasUnlocked: thomasUnlocked,
    arisUnlocked: arisUnlocked,
    rachelUnlocked: rachelUnlocked,
    trisUnlocked: trisUnlocked,
    tobiasUnlocked: tobiasUnlocked,
    calebUnlocked: calebUnlocked,
    evanUnlocked: evanUnlocked,
    cassieUnlocked: cassieUnlocked,
    newtUnlocked: newtUnlocked,
    meganUnlocked: meganUnlocked,
    benUnlocked: benUnlocked,
    willUnlocked: willUnlocked,
    primUnlocked: primUnlocked,
    katnissUnlocked: katnissUnlocked,
    finnickUnlocked: finnickUnlocked,
    scarlioniUnlocked: scarlioniUnlocked,
    romanaUnlocked: romanaUnlocked,
    scorbyUnlocked: scorbyUnlocked,
    galeUnlocked: galeUnlocked,
    teganUnlocked: teganUnlocked,
    ralphUnlocked: ralphUnlocked,
    adricUnlocked: adricUnlocked,
    sarahUnlocked: sarahUnlocked,
    nyssaUnlocked: nyssaUnlocked,
    holdenUnlocked: holdenUnlocked,
  };
  localStorage.setItem("gameStatePenguins", JSON.stringify(gameStatePenguins));
}

// Load game state function
function loadGameState() {
  const gameStatePenguins = JSON.parse(
    localStorage.getItem("gameStatePenguins")
  );
  const gameState = JSON.parse(localStorage.getItem("gameState"));

  if (gameStatePenguins) {
    thomasUnlocked = gameStatePenguins.thomasUnlocked;
    arisUnlocked = gameStatePenguins.arisUnlocked;
    rachelUnlocked = gameStatePenguins.rachelUnlocked;
    trisUnlocked = gameStatePenguins.trisUnlocked;
    tobiasUnlocked = gameStatePenguins.tobiasUnlocked;
    calebUnlocked = gameStatePenguins.calebUnlocked;
    evanUnlocked = gameStatePenguins.evanUnlocked;
    cassieUnlocked = gameStatePenguins.cassieUnlocked;
    newtUnlocked = gameStatePenguins.newtUnlocked;
    meganUnlocked = gameStatePenguins.meganUnlocked;
    benUnlocked = gameStatePenguins.benUnlocked;
    willUnlocked = gameStatePenguins.cassieUnlocked;
    primUnlocked = gameStatePenguins.primUnlocked;
    katnissUnlocked = gameStatePenguins.katnissUnlocked;
    finnickUnlocked = gameStatePenguins.finnickUnlocked;
    scarlioniUnlocked = gameStatePenguins.scarlioniUnlocked;
    romanaUnlocked = gameStatePenguins.romanaUnlocked;
    scorbyUnlocked = gameStatePenguins.scorbyUnlocked;
    galeUnlocked = gameStatePenguins.galeUnlocked;
    teganUnlocked = gameStatePenguins.teganUnlocked;
    ralphUnlocked = gameStatePenguins.ralphUnlocked;
    adricUnlocked = gameStatePenguins.adricUnlocked;
    sarahUnlocked = gameStatePenguins.sarahUnlocked;
    nyssaUnlocked = gameStatePenguins.nyssaUnlocked;
    holdenUnlocked = gameStatePenguins.holdenUnlocked;
  }

  if (gameState) {
    snow = gameState.snow;
  } else {
    snow = 0;
  }
  shopSnow.textContent = `Your Snow: ${snow}`;
}

// Save snow function
function saveGameStateSnow() {
  const gameState = JSON.parse(localStorage.getItem("gameState")) || {};
  gameState.snow = snow;
  localStorage.setItem("gameState", JSON.stringify(gameState));
}

// Opening pack functions
function starterPackOpen() {
  if (snow >= starterPackPrice) {
    snow -= starterPackPrice;
    starterImageContainer.innerHTML = ""; // Clear previous images

    for (let i = 0; i < 2; i++) {
      let penguin;
      let imageUrl;

      if (i === 0) {
        penguin = commonCard().split("/").pop().split(".")[0]; // Get the penguin name from the image URL
        imageUrl = `Images/Penguin_Cards/Commons/${penguin}.svg`;
      } else {
        if (Math.random() < 0.50) {
          penguin =
            commonPenguins[Math.floor(Math.random() * commonPenguins.length)];
          imageUrl = `Images/Penguin_Cards/Commons/${penguin}.svg`;
        } else {
          penguin =
            uncommonPenguins[
              Math.floor(Math.random() * uncommonPenguins.length)
            ];
          imageUrl = `Images/Penguin_Cards/Uncommons/${penguin}.svg`;
        }
      }
      starterImageContainer.innerHTML += `<img src="${imageUrl}" alt="Penguin card" class="pack-penguin penguin-img">`;

      // Update unlock status based on the penguin
      penguinCheck(penguin);
    }

    // Fade in the cards after they've been added
    const penguinCards = document.querySelectorAll(".pack-penguin");
    penguinCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show-card");
      }, index * cardDelay);
    });

    updateGame();
    starterModal.style.display = "flex";
    setTimeout(function () {
      starterModal.style.display = "none";
    }, 5000);
  }
}

function classicPackOpen() {
  if (snow >= classicPackPrice) {
    snow -= classicPackPrice;
    classicImageContainer.innerHTML = ""; // Clear previous images

    for (let i = 0; i < 3; i++) {
      let penguin;
      let imageUrl;

      if (i === 0) {
        penguin = commonCard().split("/").pop().split(".")[0]; // Get the penguin name from the image URL
        imageUrl = `Images/Penguin_Cards/Commons/${penguin}.svg`;
      } else if (i === 1) {
        penguin = uncommonCard().split("/").pop().split(".")[0]; // Get the penguin name from the image URL
        imageUrl = `Images/Penguin_Cards/Uncommons/${penguin}.svg`;
      } else {
        let randomNum = Math.random();
        if (randomNum < 0.65) {
          penguin =
            commonPenguins[Math.floor(Math.random() * commonPenguins.length)];
          imageUrl = `Images/Penguin_Cards/Commons/${penguin}.svg`;
        } else if (randomNum < 0.90) {
          penguin =
            uncommonPenguins[
              Math.floor(Math.random() * uncommonPenguins.length)
            ];
          imageUrl = `Images/Penguin_Cards/Uncommons/${penguin}.svg`;
        } else {
          penguin =
            rarePenguins[Math.floor(Math.random() * rarePenguins.length)];
          imageUrl = `Images/Penguin_Cards/Rares/${penguin}.svg`;
        }
      }
      classicImageContainer.innerHTML += `<img src="${imageUrl}" alt="Penguin card" class="pack-penguin penguin-img">`;

      // Update unlock status based on the penguin
      penguinCheck(penguin);
    }

    // Fade in the cards after they've been added
    const penguinCards = document.querySelectorAll(".pack-penguin");
    penguinCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show-card");
      }, index * cardDelay);
    });

    updateGame();
    classicModal.style.display = "flex";
    setTimeout(function () {
      classicModal.style.display = "none";
    }, 7000);
  }
}

function elitePackOpen() {
  if (snow >= elitePackPrice) {
    snow -= elitePackPrice;
    eliteImageContainer.innerHTML = ""; // Clear previous images

    for (let i = 0; i < 5; i++) {
      let penguin;
      let imageUrl;

      if (i === 0 || i === 1) {
        penguin = commonCard().split("/").pop().split(".")[0]; // Get the penguin name from the image URL
        imageUrl = `Images/Penguin_Cards/Commons/${penguin}.svg`;
      } else if (i === 2) {
        penguin = uncommonCard().split("/").pop().split(".")[0]; // Get the penguin name from the image URL
        imageUrl = `Images/Penguin_Cards/Uncommons/${penguin}.svg`;
      } else if (i === 3) {
        penguin = rareCard().split("/").pop().split(".")[0]; // Get the penguin name from the image URL
        imageUrl = `Images/Penguin_Cards/Rares/${penguin}.svg`;
      } else {
        let randomNum = Math.random();
        if (randomNum < 0.30) {
          penguin =
            commonPenguins[Math.floor(Math.random() * commonPenguins.length)];
          imageUrl = `Images/Penguin_Cards/Commons/${penguin}.svg`;
        } else if (randomNum < 0.80) {
          penguin =
            uncommonPenguins[
              Math.floor(Math.random() * uncommonPenguins.length)
            ];
          imageUrl = `Images/Penguin_Cards/Uncommons/${penguin}.svg`;
        } else if (randomNum < 0.95) {
          penguin =
            rarePenguins[Math.floor(Math.random() * rarePenguins.length)];
          imageUrl = `Images/Penguin_Cards/Rares/${penguin}.svg`;
        } else {
          penguin =
            secretPenguins[Math.floor(Math.random() * secretPenguins.length)];
          imageUrl = `Images/Penguin_Cards/Secrets/${penguin}.svg`;
        }
      }
      eliteImageContainer.innerHTML += `<img src="${imageUrl}" alt="Penguin card" class="pack-penguin penguin-img">`;

      // Update unlock status based on the penguin
      penguinCheck(penguin);
    }

    // Fade in the cards after they've been added
    const penguinCards = document.querySelectorAll(".pack-penguin");
    penguinCards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add("show-card");
      }, index * cardDelay);
    });

    updateGame();
    eliteModal.style.display = "flex";
    setTimeout(function () {
      eliteModal.style.display = "none";
    }, 9000);
  }
}

// Event listeners
starterPackEl.addEventListener("click", starterPackOpen);
classicPackEl.addEventListener("click", classicPackOpen);
elitePackEl.addEventListener("click", elitePackOpen);

loadGameState();
galleryUpdate();