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
    "Boundless Math is a math game designed to adjust to your current skills. When you start to answer questions correctly, they will become more difficult. If you start getting questions incorrect, they will begin to get less difficult.",
    "You'll start with addition, then move to subtraction, multiplication, and division. After you complete division, the game will return to addition, but the problems will be more challenging than they were the previous time through.",
    "Adjusting the difficulty to how you're performing allows you to make the most growth. It will sometimes be challenging, but you learn the most by facing challenges. You got this. Remember to ask questions, and most importantly, have fun!"
  ];

  const welcomePromptTwo = [
    "Great job answering your first question and starting your journey! The first step is always the hardest, and as you keep taking more, you will see your math skills grow and grow! But, now I'd like to tell you about two important parts of the game: the Shop and Save sections.",
    "In the Shop, you can buy packs of cards that contain different penguins to collect. You use the Snow you earn by answering questions correctly to purchase these packs.",
    "In the Save section of the game, you can put some or all of your Snow into a savings account. Saving helps you grow your Snow faster, so it's a good idea to start saving it as soon as possible."
  ];

  const fiveIncorrectPrompt = [
    "It looks like you've missed five questions in a row, and that's completely okay! The whole point of this game is to push your current math fact abilities to the limit so you can learn and sharpen your skills. ",
    "Always remember that there will be difficult times for anyone when learning something new, and these challenges are actually the most essential part of the learning process. Your talents improve the most when you push yourself and face challenging problems. ",
    "Maybe take a moment to review the learn section of the math operation you're struggling with, ask a teacher or fellow student for help, or do some research online if you feel stuck. Keep it up!"
  ];

  const tenIncorrectPrompt = [
    "It looks like you missed ten questions in a row, and that's totally fine! You are challenging yourself and taking on some tough questions. You're currently exploring the limits of your math fact skills, and it's completely normal to get some questions wrong at this point.",
    "You can ask a friend or teacher for help or practice a little bit on your own. After you take a short break, come back and keep playing. Returning and continuing to play after a tough stretch will help build your math skills and resilience.",
    "Always remember that you learn more when you make mistakes. If you see others getting correct answers, don't worry about it. You are learning a lot and challenging yourself. That's something to be proud of, and you will make progress if you keep doing the work!"
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
            `Great job! You've completed ${operations[operationIndex]} Phase ${phase} and should be very proud of your work. You're improving your math skills step by step and setting yourself up for success in the future.`,
            "But I want you to think about your journey so far and reflect on your experiences. Think about when you answered some questions correctly and when you answered some incorrectly. When did you learn more?",
            "Almost always, you learn more when you get a question wrong because your brain hasn't quite learned how to reach the correct answer. It feels good to get a question correct, and it's crucial for your brain to receive this feedback to know that you're learning, but you don't learn anything new when you answer a question correctly. Keep this in mind as you carry on, and keep up the good work!"
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