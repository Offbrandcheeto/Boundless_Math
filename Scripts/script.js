document.addEventListener("DOMContentLoaded", function() {
  // Const variables
  const mainBtn = document.getElementById("main-btn");
  const questionEl = document.getElementById("question");
  const answerEl = document.getElementById("answer");
  const incorrectEl = document.getElementById("incorrect");
  const correctEl = document.getElementById("correct");
  const tierEl = document.getElementById("tier");
  const snowEl = document.getElementById("snow");
  const span = document.getElementsByClassName("close")[0];
  const modal = document.getElementById("my-modal");

  const SCORE_LEVEL_UP = 50;
  const TOTAL_QUESTIONS = 10;
  const ADDITION_CHANGE = 5;
  const SUBTRACTION_CHANGE = 10;
  const MULTIPLY_DIVIDE_CHANGE = 1;

  // Arrays
  const positiveMessages = [
    "Great Job!",
    "Well Done!",
    "Keep it up!",
    "Nice Work!",
    "Fantastic!",
    "You Rock!",
    "Awesome!",
    "Excellent!",
    "Superb!",
    "Impressive!",
    "Way to go!",
    "Brilliant!",
    "Outstanding!",
    "Terrific!",
    "Good Job!",
    "Marvelous!",
    "Spectacular!",
    "Wonderful!",
    "Top Notch!",
    "Super!"
  ];

  const incorrectMessages = [
    "Keep pushing forward!",
    "You're making progress!",
    "Stay positive!",
    "Keep striving!",
    "Stay resilient!",
    "Don't stop now!",
    "You've got this!",
    "Embrace challenges!",
    "You're awesome!",
    "Believe in yourself!"
  ];

  const operations = ["Addition", "Subtraction", "Multiplication", "Division"];

  // Prompts
  const welcomePrompt = [
    "Boundless Math is a fun game where the math gets easier or harder depending on how you're doing. If you get questions right, the questions will get harder. If you get questions wrong, the questions will get easier.",
    "You start by adding numbers. Then, you’ll do subtraction, multiplication, and division. After division, the game starts over with adding, but it'll be harder this time.",
    "The math will help you get better and better. It might seem hard, but if you keep practicing, you’ll get super good at it!"
  ];

  const welcomePromptTwo = [
    "Great job answering your first question and starting your journey! The first step is always the hardest, and now I'd like to tell you about two important parts of the game: the Shop and Save sections.",
    "In the Shop, you can buy packs of cards with different penguins to collect. You use the Snow you earn by answering questions correctly to buy these packs.",
    "In the Save section, you can put some or all of your Snow into a savings account. Saving helps you grow your Snow faster, so it's a good idea to try it."
  ];

  const fiveIncorrectPrompt = [
    "It looks like you missed five questions in a row. That's okay. Good job for trying! You are working hard, and it's great that you’re still playing, even when it's tough.",
    "The game will soon give you easier problems to help you practice. You can also look at the learn section to review what you’re working on.",
    "If you need more help, don’t be afraid to ask a friend or teacher. Asking questions is how you learn, and you’re doing amazing! Keep up the good work!"
  ];

  const tenIncorrectPrompt = [
    "It looks like you missed ten questions in a row. That’s awesome! You are really challenging yourself, and it’s great that you’re still playing, even though it’s hard. Take a look at the learn section to review what you’re working on.",
    "You can ask a friend or teacher for help or practice a little bit on your own. After you take a short break, come back and keep playing.",
    "Remember, you learn more when you make mistakes! If you see others getting the answers right, don’t worry. You are learning a lot, and that’s something to be proud of! I believe in you. Keep going!"
  ];

  // Let variables
  let levelUpPrompts = [false, false, false, false];
  let operationIndex = 0;
  let difficultyLevel = 1;
  let phase = 1;
  let score = 0;
  let snow = 0;
  let correct = 0;
  let correctStreak = 0;
  let correctSavingsAccount = 0;
  let incorrect = 0;
  let incorrectStreak = 0;
  let progressPercent = 0;
  let canAnswer = true;
  let currentQuestion = null;
  let correctAnswer = null;
  let shownPrompt = false;
  let shownPromptTwo = false;
  let shownPromptThree = false;

  // Feedback functions
  let feedbackTimers = [];

  function displayFeedback(text, color, question = "", answer = "") {
    // Clear any existing timers before starting new ones
    clearFeedbackTimers();
  
    // Set initial feedback text and color
    updateFeedback(text, color);
  
    // Handle correct/incorrect paths
    if (color !== "#f44335") {
      // Correct answer path
      queueFeedback("Check Answer", "#0061e0", 2000);
    } else {
      // Incorrect answer path
      queueFeedback(
        incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)],
        null, 2000
      );
      queueFeedback(`${question} ${answer}`, null, 5000);
      queueFeedback("Check Answer", "#0061e0", 8000);
    }
  }
  
  // Update the feedback display
  function updateFeedback(text, color) {
    mainBtn.textContent = text;
    if (color) mainBtn.style.backgroundColor = color;
  }
  
  // Queue feedback updates with delays
  function queueFeedback(text, color, delay) {
    const timer = setTimeout(() => {
      updateFeedback(text, color);
      if (text === "Check Answer") {
        canAnswer = true;
      }
    }, delay);
    feedbackTimers.push(timer);
  }
  
  // Clear all feedback timers
  function clearFeedbackTimers() {
    feedbackTimers.forEach(timer => clearTimeout(timer));
    feedbackTimers = [];
  }
  
  // Progress function
  function updateProgress(correctAnswers) {
    progressPercent = (correctAnswers / TOTAL_QUESTIONS) * 100;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = progressPercent + "%";
  }

  // When the user clicks on (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // Show modal function
  function displayModal(text) {
    const modalTextOne = document.getElementById("modal-text-one");
    const modalTextTwo = document.getElementById("modal-text-two");
    const modalTextThree = document.getElementById("modal-text-three");
    modal.style.display = "flex";
    span.style.display = "block";
    modalTextOne.textContent = text[0];
    modalTextTwo.textContent = text[1];
    modalTextThree.textContent = text[2];
  }

  // Generate question function
  function generateRandomNumber1to5() {
    return Math.floor(Math.random() * 5) + 1;
  }
  
  function generateQuestion(operation, difficultyLevel) {
    if (operation === "Addition") {
      const n1 = Math.floor(Math.random() * (ADDITION_CHANGE * difficultyLevel) + 1);
      const n2 = Math.floor(Math.random() * (ADDITION_CHANGE * difficultyLevel) + 1);
      const answer = n1 + n2;
      const question = `${n1} + ${n2} = `;
      return [question, answer];
    } else if (operation === "Subtraction") {
      let n1 = Math.floor(Math.random() * (SUBTRACTION_CHANGE * difficultyLevel) + 1);
      let n2 = Math.floor(Math.random() * (SUBTRACTION_CHANGE * difficultyLevel) + 1);
      [n1, n2] = [Math.max(n1, n2), Math.min(n1, n2)];
      const answer = n1 - n2;
      const question = `${n1} - ${n2} = `;
      return [question, answer];
    } else if (operation === "Multiplication") {
      const n1 = Math.floor(Math.random() * (MULTIPLY_DIVIDE_CHANGE * difficultyLevel) + generateRandomNumber1to5());
      const n2 = Math.floor(Math.random() * (MULTIPLY_DIVIDE_CHANGE * difficultyLevel) + generateRandomNumber1to5());
      const answer = n1 * n2;
      const question = `${n1} x ${n2} = `;
      return [question, answer];
    } else if (operation === "Division") {
      const n2 = Math.floor(Math.random() * (MULTIPLY_DIVIDE_CHANGE * difficultyLevel) + generateRandomNumber1to5());
      const answer = Math.floor(Math.random() * (MULTIPLY_DIVIDE_CHANGE * difficultyLevel) + generateRandomNumber1to5());
      const n1 = n2 * answer;
      const question = `${n1} / ${n2} = `;
      return [question, answer];
    }
  }
  
  // Start game function
  function startGame() {
    if (shownPrompt === false) {
      displayModal(welcomePrompt);
      shownPrompt = true;
    }

    if (operationIndex === operations.length) {
      operationIndex = 0;
      phase += 1;
      levelUpPrompts = [false, false, false, false];
      difficultyLevel = (phase - 1) * 5 + 1;
    }
    nextQuestion();
  }
  
  // Next question function
  function nextQuestion() {
    const savedQuestion = localStorage.getItem("currentQuestion");
    const savedAnswer = localStorage.getItem("correctAnswer");
    if (savedQuestion && savedAnswer) {
      currentQuestion = savedQuestion;
      correctAnswer = parseFloat(savedAnswer);
      questionEl.textContent = currentQuestion;
      answerEl.value = '';
      return;
    }

    const [question, answer] = generateQuestion(operations[operationIndex], difficultyLevel);
    currentQuestion = question;
    correctAnswer = answer;
    questionEl.textContent = question;
    answerEl.value = '';
  }

  // Confetti function
  function showConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.style.display = 'block';
  
    setTimeout(() => {
      confettiContainer.style.display = 'none';
    }, 750); // Duration should match the animation duration
  }

  // Sub check answer functions
  // Incorrect answer function
  function incorrectAnswerFunction() {
    canAnswer = false;
    correctStreak = 0;
    incorrect++;
    incorrectStreak++;
    if (incorrectStreak === 5) {
      displayModal(fiveIncorrectPrompt);
    } else if (incorrectStreak === 10) {
      displayModal(tenIncorrectPrompt);
    }
  }

  // Correct answer function
  function correctAnswerFunction() {
    showConfetti();
    score++;
    correct++;
    correctSavingsAccount++;
    readyToCompound = true;
    correctStreak++;
    snow += 10;
    incorrectStreak = 0;
  }

  // Main check answer function
  function checkAnswer() {
    if (canAnswer) {
      const userAnswer = parseFloat(answerEl.value);
      if (!isNaN(userAnswer)) {
        if (userAnswer === correctAnswer) {
          correctAnswerFunction();
          if (correctStreak % 5 === 0) {
            displayFeedback(`${correctStreak} In A Row!`, "#ffb121");
          } else {
            const randomMessage = positiveMessages[Math.floor(Math.random() * positiveMessages.length)];
            displayFeedback(`Correct. ${randomMessage}`, "#4caf50");
          }
          if (score % 10 === 0) {
            difficultyLevel++;
          }
          
        } else {
          if (score > 0) {
            score--;
          }
          incorrectAnswerFunction()
          prevQuestion = currentQuestion;
          prevAnswer = correctAnswer;
          displayFeedback("Incorrect.", "#f44335", prevQuestion, prevAnswer); 
          if (score >= 0 && score % 10 === 9) {
            difficultyLevel--;
          }
        }
      } else {
        if (score > 0) {
          score--;
        }
        incorrectAnswerFunction();
        displayFeedback("Invalid Input!", "#f44336");
        if (score >= 0 && score % 10 === 9) {
          difficultyLevel--;
        }
      }

      // Clear the local storage question and answer
      localStorage.removeItem("currentQuestion");
      localStorage.removeItem("correctAnswer");

      // Check if score reaches the level up threshold
      if (score >= SCORE_LEVEL_UP) {
        if (levelUpPrompts[operationIndex] === false) {
          let levelUpPrompt = [
            `Great job! You did awesome in ${operations[operationIndex]} Phase ${phase}! You should feel really proud of what you did!`,
            "Now, think about how far you've come. Remember some tricky problems you worked on, and think about the times you got the answers right. Did you learn something when you solved them?",
            "You probably didn't learn anything new because you already knew the answer! Remember, it's okay to make mistakes. They help you learn. Getting the right answer just means you’ve already learned something!"
          ];        
          levelUpPrompts[operationIndex] = true;
          displayModal(levelUpPrompt);
        }
        operationIndex++;
        difficultyLevel = (phase - 1) * 5 + 1;
        score = 0;
        startGame();
      } else {
        nextQuestion();
      }
    } else {
      return;
    }
    if (shownPromptTwo === false) {
      displayModal(welcomePromptTwo);
      shownPromptTwo = true;
    }
    updateProgress(score % 10);
    updateScoreUI();
    saveGameState();
  }
  
  // Function to save game state to localStorage
  function saveGameState() {
    const state = {
      operationIndex,
      difficultyLevel,
      phase,
      score,
      snow,
      correct,
      correctStreak,
      correctSavingsAccount,
      incorrect,
      incorrectStreak,
      currentQuestion,
      correctAnswer,
      progressPercent,
      shownPrompt,
      shownPromptTwo,
      shownPromptThree
    };

    localStorage.setItem("gameState", JSON.stringify(state));
    localStorage.setItem("currentQuestion", currentQuestion);
    localStorage.setItem("correctAnswer", correctAnswer);
  }
  
  // Function to load game state from localStorage
  function loadGameState() {
    const savedState = localStorage.getItem("gameState");

    if (savedState) {
      const state = JSON.parse(savedState);
      operationIndex = state.operationIndex || 0;
      difficultyLevel = state.difficultyLevel || 1;
      phase = state.phase || 1;
      score = state.score || 0;
      snow = state.snow || 0;
      correct = state.correct || 0;
      correctStreak = state.correctStreak || 0;
      incorrect = state.incorrect || 0;
      incorrectStreak = state.incorrectStreak || 0;
      correctAnswer = state.correctAnswer || null;
      progressPercent = state.progressPercent || 0;
      shownPrompt = state.shownPrompt || false;
      shownPromptTwo = state.shownPromptTwo || false;
      shownPromptThree = state.shownPromptThree || false;
    }

    const savedQuestion = localStorage.getItem("currentQuestion");
    const savedAnswer = localStorage.getItem("correctAnswer");

    if (savedQuestion && savedAnswer) {
      currentQuestion = savedQuestion;
      correctAnswer = parseFloat(savedAnswer);
      questionEl.textContent = currentQuestion;
      answerEl.value = '';
    }
    updateProgress(progressPercent / 10);
  }
  
  // Load game state from localStorage at the beginning
  loadGameState();
  
  // Save game state to localStorage every 500 milliseconds
  function updateScoreUI() {
    correctEl.textContent = correct;
    incorrectEl.textContent = incorrect;
    tierEl.textContent = `Tier: ${operations[operationIndex]} ${difficultyLevel}`;
    snowEl.textContent = snow;
  }
  
  // Event listeners
  mainBtn.addEventListener("click", checkAnswer);
  
  document.addEventListener("keypress", e => {
    if (e.code === "Enter") {
      e.preventDefault();
      checkAnswer();
    }
  });

  startGame();
  updateScoreUI();
  saveGameState();
});

// If you're reading this, I hope you have a great day, and yes, I know my code writing sucks:)