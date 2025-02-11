// Const variables
const savedSnowEl = document.getElementById("saved-snow");
// const currentSnowEl = document.getElementById("current-snow");
const addSnowBtn = document.getElementById("add-snow");
const takeSnowBtn = document.getElementById("take-snow");
const modal = document.getElementById("modal");
const modalText = document.getElementById("modal-text");
const span = document.getElementById("close-btn");
const submitBtn = document.getElementById("submit-btn");
const modalInput = document.getElementById("modal-input");
const interestEarnedEl = document.getElementById("interest-earned");

const addMsg = "How much Snow would you like to add?";
const takeMsg = "How much Snow would you like to take? (ONLY WHOLE NUMBERS)";

// Let variables
let snow; 
let savedSnow = 0; 
let correctSavingsAccount = 0; 
let interestEarned = 0;

// Update UI values function
function updateValues() {
	savedSnowEl.textContent = `${savedSnow.toFixed(2)}`;
	// currentSnowEl.textContent = `Unsaved Snow: ${snow}`;
	interestEarnedEl.textContent = `+${interestEarned.toFixed(2)}`;
}

// Compound interest function
function compoundInterest(amount, periods) {
	const rate = 0.01;
	const compoundedAmount = amount * Math.pow(1 + rate, periods);
	interestEarned += compoundedAmount - amount;
	return parseFloat(compoundedAmount);
}

// Transaction function
function saveTransaction(transaction) {
	const userInput = parseFloat(modalInput.value);

	// Check if user input is a whole number
	if (!Number.isInteger(userInput)) {
		alert("Please enter a whole number.");
		return; 
	}
	if (userInput < 1) {
		alert("Please enter a number greater than 0.");
		return;
	}
	if (transaction === "add") {
		if (snow >= userInput) {
			snow -= userInput;
			savedSnow += userInput;
		} else {
			alert("You're trying to add too much Snow.");
		}
	} else {
		if (savedSnow >= userInput) {
			savedSnow -= userInput;
			snow += userInput;
		} else {
			alert("You're trying to take too much Snow.");
		}
	}

  updateValues()
	modal.style.display = "none";
	modalInput.value = "";
	saveGameState();
}

// Modal function
function displayModal(text, transaction) {
	modal.style.display = "flex";
	span.style.display = "none";
	modalText.textContent = text;
	span.style.display = "block";

	submitBtn.onclick = function() {
		saveTransaction(transaction);
	};
}

// Close function
span.onclick = function() {
	modal.style.display = "none";
}

// Load game state function
function loadGameState() {
	const gameState = JSON.parse(localStorage.getItem("gameState")) || {};
	const savedSnowState = JSON.parse(localStorage.getItem("savedSnowState")) || {};
  
	snow = gameState.snow || 0;
	correctSavingsAccount = gameState.correctSavingsAccount || 0;
  
	savedSnow = savedSnowState.savedSnow || 0;
	interestEarned = savedSnowState.interestEarned || 0;
  
	if (correctSavingsAccount > 0 && savedSnow > 0) {
	  savedSnow = compoundInterest(savedSnow, correctSavingsAccount);
	  saveGameState();
	}
  
	updateValues();
  }

// Save game state function
function saveGameState() {
	const gameState = JSON.parse(localStorage.getItem("gameState")) || {};
	gameState.snow = snow;
	gameState.correctSavingsAccount = 0;
	localStorage.setItem("gameState", JSON.stringify(gameState));

	const savedSnowState = {
    savedSnow: savedSnow,
	  interestEarned: interestEarned
  };
  localStorage.setItem("savedSnowState", JSON.stringify(savedSnowState));
}

// Event listeners
addSnowBtn.addEventListener("click", function() {
	displayModal(`${addMsg} You have ${snow} Snow available to add.`, "add");
});

takeSnowBtn.addEventListener("click", function() {
	displayModal(`${takeMsg} You have ${savedSnow.toFixed(2)} Snow available to take.`, "take");
});

loadGameState();