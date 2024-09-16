document.addEventListener("DOMContentLoaded", function() {
  // Const variables
  const mainBtn = document.getElementById("main-btn");
  const questionEl = document.getElementById("question");
  const answerEl = document.getElementById("answer");
  const incorrectEl = document.getElementById("incorrect");
  const correctEl = document.getElementById("correct");
  const tierEl = document.getElementById("tier");
  const snowEl = document.getElementById("snow");
  const modal = document.getElementById("my-modal");
  const modalText = document.getElementById("modal-text")
  const span = document.getElementsByClassName("close")[0];

  const SCORE_LEVEL_UP = 50;

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
  const welcomePrompt = `Boundless Math is an infinite math operations game that automatically adjusts to your skill level as you play. The difficulty adjusts to your performance—correct answers bring tougher problems, while incorrect ones make the problems easier. Your journey begins with addition and advances through subtraction, multiplication, and, finally division. Once you complete division, the game returns to addition and starts the cycle over again. However, the problems will be more challenging than they were in the previous cycle. Each cycle pushes you further, building your skills step by step. It'll be a challenge, but as you keep putting in the work and showing up, you'll discover that your potential is truly boundless!`;

  const welcomePromptTwo = `Congratulations on answering your first question and beginning your journey! You took the first step, which is always the hardest one, and I'd like to introduce you to two important parts of the game: the Shop and Save sections. In the Shop section, you can buy packs of cards containing different penguins you can collect. You purchase the packs using the Snow you collect when you answer a question correctly. You can also use your Snow in the Save section, where you can put some or all of it into a savings account. Doing this helps you build Snow quickly, so it's highly recommended that you do it.`

  const fiveIncorrectPrompt = "It looks like you have gotten five problems incorrect in a row. First of all, good job. You are currently pushing yourself, and you keep showing up even in the face of difficulty. The game should go back to some more manageable problems for you to practice, but take a look at the learn section and review the operation you are on. Do additional research if necessary, or ask a friend or teacher for help. Don't be afraid to ask questions or seek out help. This is how you learn, and you're doing a great job. Keep it up.";

  const tenIncorrectPrompt = "It looks like you have gotten ten problems incorrect in a row. First of all, outstanding job. You are really pushing yourself, and you keep showing up even in the face of tremendous difficulty. Be sure to take a look at the learn section and review the operation you are on. Do additional research if necessary, or ask a friend or teacher for help. Review the concepts and do a little bit of practice on your own. Once you've done this, return and continue playing after taking a break. Remember, you learn far more when you lose than when you win, so if you see others around you getting problems correct, don't get upset. Odds are that you are learning more than they are, and they should be jealous of you. Keep going. I believe in you and have confidence in yourself.";

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
  let currentQuestion = null;
  let correctAnswer = null;
  let shownPrompt = false;
  let shownPromptTwo = false;

  // Feedback function
  function displayFeedback(text, color, question, answer) {
    mainBtn.textContent = text;
    mainBtn.style.backgroundColor = color;
    if (color !== "#f44335") {
      setTimeout(function() {
        mainBtn.textContent = "Check Answer";
        mainBtn.style.backgroundColor = "#0061e0";
      }, 2500);
    } else {
      setTimeout(function() {
        const incorrectMessage = incorrectMessages[Math.floor(Math.random() * incorrectMessages.length)];
        mainBtn.textContent = `${incorrectMessage}`;
      }, 2000);
      setTimeout(function() {
        mainBtn.textContent = `${question} ${answer}`;
      }, 5000);
      setTimeout(function() {
        mainBtn.textContent = "Check Answer";
        mainBtn.style.backgroundColor = "#0061e0";
      }, 8000);
    }
  }

  // Pop effect function
  function triggerPopEffect(isCorrect) {
    // Determine the correct element
    const elementId = isCorrect ? 'correct' : 'incorrect';
    const element = document.getElementById(elementId);
  
    // Add the pop-effect class
    element.classList.add('pop-effect');
  
    // Remove the pop-effect class after the animation completes
    element.addEventListener('animationend', () => {
      element.classList.remove('pop-effect');
    });
  }

  // When the user clicks on (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // Show modal function
  function displayModal(text) {
    modal.style.display = "flex";
    span.style.display = "none";
    modalText.textContent = text;
    setTimeout(function() {
      span.style.display = "block";
    }, 2500);
  }

  // Generate question function
  function generateQuestion(operation, difficultyLevel) {
    if (operation === "Addition") {
      const n1 = Math.floor(Math.random() * (5 * difficultyLevel) + 1);
      const n2 = Math.floor(Math.random() * (5 * difficultyLevel) + 1);
      const answer = n1 + n2;
      const question = `${n1} + ${n2} = `;
      return [question, answer];
    } else if (operation === "Subtraction") {
      let n1 = Math.floor(Math.random() * (10 * difficultyLevel) + 1);
      let n2 = Math.floor(Math.random() * (10 * difficultyLevel) + 1);
      [n1, n2] = [Math.max(n1, n2), Math.min(n1, n2)];
      const answer = n1 - n2;
      const question = `${n1} - ${n2} = `;
      return [question, answer];
    } else if (operation === "Multiplication") {
      const n1 = Math.floor(Math.random() * (3 * difficultyLevel) + 1);
      const n2 = Math.floor(Math.random() * (3 * difficultyLevel) + 1);
      const answer = n1 * n2;
      const question = `${n1} x ${n2} = `;
      return [question, answer];
    } else if (operation === "Division") {
      const n2 = Math.floor(Math.random() * (3 * difficultyLevel) + 1);
      const answer = Math.floor(Math.random() * (3 * difficultyLevel) + 1);
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
  
  // Incorrect answer function
  function incorrectAnswer() {
    correctStreak = 0;
    incorrect++;
    incorrectStreak++;
    triggerPopEffect(false);
    if (incorrectStreak === 5) {
      displayModal(fiveIncorrectPrompt);
    } else if (incorrectStreak === 10) {
      displayModal(tenIncorrectPrompt);
    }
  }

  // Confetti function
  function showConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.style.display = 'block';
  
    setTimeout(() => {
      confettiContainer.style.display = 'none';
    }, 700); // Duration should match the animation duration
  }

  // Check answer function
  function checkAnswer() {
    if (mainBtn.textContent === "Check Answer") {
      const userAnswer = parseFloat(answerEl.value);
      if (!isNaN(userAnswer)) {
        if (userAnswer === correctAnswer) {
          showConfetti();
          score++;
          correct++;
          correctSavingsAccount++;
          readyToCompound = true;
          correctStreak++;
          snow += 10;
          incorrectStreak = 0;
          triggerPopEffect(true);
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
          incorrectAnswer()
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
        incorrectAnswer();
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
          let levelUpPrompt = `Congratulations! You've shown mastery in ${operations[operationIndex]} Phase ${phase}, and you should be incredibly proud of your accomplishment. Your dedication and determination have paid off. Now, take a moment to reflect on your journey so far. Consider the problems you struggled with, and then think about the moments when you successfully solved a problem. Did you learn anything from those moments of success? Most likely not, because you already knew the answer. Your previous mistakes and failures led you to be able to answer a problem correctly. As you continue forward, keep in mind that it's through failure that you learn, and success simply confirms that you've learned something.`;
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
    updateScoreUI();
    saveGameState();
  }
  
  
  // Function to save game state to localStorage
  function saveGameState() {
    const state = {
      operationIndex,
      difficultyLevel,
      score,
      snow,
      correct,
      correctStreak,
      correctSavingsAccount,
      incorrect,
      incorrectStreak,
      currentQuestion,
      correctAnswer,
      shownPrompt,
      shownPromptTwo
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
      score = state.score || 0;
      snow = state.snow || 0;
      correct = state.correct || 0;
      correctStreak = state.correctStreak || 0;
      incorrect = state.incorrect || 0;
      incorrectStreak = state.incorrectStreak || 0;
      correctAnswer = state.correctAnswer || null;
      shownPrompt = state.shownPrompt || false;
      shownPromptTwo = state.shownPromptTwo || false;
    }

    const savedQuestion = localStorage.getItem("currentQuestion");
    const savedAnswer = localStorage.getItem("correctAnswer");

    if (savedQuestion && savedAnswer) {
      currentQuestion = savedQuestion;
      correctAnswer = parseFloat(savedAnswer);
      questionEl.textContent = currentQuestion;
      answerEl.value = '';
    }
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