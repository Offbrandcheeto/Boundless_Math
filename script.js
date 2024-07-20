document.addEventListener('DOMContentLoaded', function() {
  const mainBtn = document.getElementById('main-btn');
  const questionEl = document.getElementById('question');
  const answerEl = document.getElementById('answer');
  const incorrectEl = document.getElementById('wrong');
  const correctEl = document.getElementById('correct');
  const progressEl = document.getElementById('progress');
  const modal = document.getElementById("myModal");
  const modalText = document.getElementById("modal-text")
  const span = document.getElementsByClassName("close")[0];

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

  const welcomePrompt = `Welcome to Parker Math! You'll begin by solving addition problems involving numbers between 0 and 10. The game will then automatically adjust its difficulty level based on your performance. If you correctly answer questions, it will challenge you with more complex ones. If you start getting problems incorrect, the game will move back to more manageable ones. Once you master a specific operation, the game will transition to the next one. Also, by design, the game doesn't save your progress. This allows you to revisit concepts and reinforce your learning. Be sure to find some free time throughout your week to play this game, and I wish you all the best on your journey. Also, please read the "Why?" section before you begin.`;

  const fiveWrongPrompt = "It looks like you have gotten five problems wrong in a row. First of all, good job. You are currently pushing yourself, and you keep showing up even in the face of difficulty. The game should go back to some more manageable problems for you to practice, but take a look at the learn section and review the operation you are on. Do additional research if necessary, or ask a friend or teacher for help. Don't be afraid to ask questions or seek out help. This is how you learn, and you're doing a great job. Keep it up.";

  const tenWrongPrompt = "It looks like you have gotten ten problems wrong in a row. First of all, outstanding job. You are really pushing yourself, and you keep showing up even in the face of tremendous difficulty. Be sure to take a look at the learn section and review the operation you are on. Do additional research if necessary, or ask a friend or teacher for help. Review the concepts and do a little bit of practice on your own. Once you've done this, return to your open tab and continue playing. Remember you learn far more when you lose than when you win, so if you see others around you getting problems correct, don't get upset. Odds are that you are learning more than they are, and they should be envious of you. Keep going. I believe in you and have confidence in yourself."

  const endPrompt = "Congratulations! You've completed an entire game of Parker Math, and this is an accomplishment you should be most proud of. No matter what your skill level was, you had to work hard and struggle along the way to get to this point. To those who didn't get many questions wrong, I congratulate you, and I'm blessed you've taken the time to play this game. To those who struggled and failed repeatedly to complete the game, I want to give you special congratulations. You learned the most, which should make the people around you jealous, and you should be overjoyed with yourself. You kept getting knocked down and got up with a smile. You showed a growth mindset and welcomed the failure you faced. Great job, and I hope to see you here again soon.";

  displayModal(welcomePrompt);

  // Function to show feedback
  function displayFeedback(text, color, question, answer) {
    mainBtn.textContent = text;
    mainBtn.style.backgroundColor = color;
    if (color !== "#f44335") {
      setTimeout(function() {
        mainBtn.textContent = "Check Answer";
        mainBtn.style.backgroundColor = "#007bff";
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
        mainBtn.style.backgroundColor = "#007bff";
      }, 8000);
    }
  }

  // When the user clicks on (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // Show modal
  function displayModal(text) {
    modal.style.display = "flex";
    span.style.display = "none";
    modalText.textContent = text;
    setTimeout(function() {
      span.style.display = "block";
    }, 15000);
  }

  const SCORE_LEVEL_UP = 50;
  let operations = ["addition", "subtraction", "multiplication", "division"];
  let levelUpPrompts = [false, false, false];
  let operationIndex = 0;
  let difficultyLevel = 1;
  let score = 0;
  let correct = 0;
  let correctStreak = 0;
  let incorrect = 0;
  let incorrectStreak = 0;
  let progress = 0;
  let currentQuestion = null;
  let correctAnswer = null;
  let shownPrompt = false;

  correctEl.textContent = `Correct: ${correct}`;
  incorrectEl.textContent = `Incorrect: ${incorrect}`;
  progressEl.textContent = `Progress: ${progress}%`;

  // Function to generate a question based on operation and difficulty level
  function generateQuestion(operation, difficultyLevel) {
    if (operation === "addition") {
      const n1 = Math.floor(Math.random() * (10 * difficultyLevel) + 1);
      const n2 = Math.floor(Math.random() * (10 * difficultyLevel) + 1);
      const answer = n1 + n2;
      const question = `${n1} + ${n2} = `;
      return [question, answer];
    } else if (operation === "subtraction") {
      let n1 = Math.floor(Math.random() * (20 * difficultyLevel) + 1);
      let n2 = Math.floor(Math.random() * (20 * difficultyLevel) + 1);
      [n1, n2] = [Math.max(n1, n2), Math.min(n1, n2)];
      const answer = n1 - n2;
      const question = `${n1} - ${n2} = `;
      return [question, answer];
    } else if (operation === "multiplication") {
      const n1 = Math.floor(Math.random() * (5 * difficultyLevel) + 1);
      const n2 = Math.floor(Math.random() * (5 * difficultyLevel) + 1);
      const answer = n1 * n2;
      const question = `${n1} x ${n2} = `;
      return [question, answer];
    } else if (operation === "division") {
      const n2 = Math.floor(Math.random() * (5 * difficultyLevel) + 1);
      const answer = Math.floor(Math.random() * (5 * difficultyLevel) + 1);
      const n1 = n2 * answer;
      const question = `${n1} / ${n2} = `;
      return [question, answer];
    }
  }
  
  // Function to start the game
  function startGame() {
    if (operationIndex < operations.length) {
      if (shownPrompt === false) {
        modal.style.display = "flex";
        shownPrompt = true
      } else if (levelUpPrompts[operationIndex - 1] === false) {
        let levelUpPrompt = `Congratulations! You've shown mastery in ${operations[operationIndex - 1]}, and you should be incredibly proud of your accomplishment. Your dedication and determination have paid off. Now, take a moment to reflect on your journey so far. Consider the problems you struggled with, and then think about the moments when you successfully solved a problem. Did you learn anything from those moments of success? Most likely not, because you already knew the answer. Your previous mistakes and failures led you to be able to answer a problem correctly. As you continue forward, keep in mind that it's through failure that you learn, and success simply confirms that you've learned something.`;
        levelUpPrompts[operationIndex - 1] = true;
        displayModal(levelUpPrompt);
      } else {
        modal.style.display = "none";
      }
      nextQuestion();
    } else {
      questionEl.textContent = "You have completed all operations! Excellent work!";
      mainBtn.style.display = 'none';
      answerEl.style.display = 'none';
      displayModal(endPrompt);

      // Stop saving game state when game ends
      // clearInterval(saveInterval); 
    }
  }
  
  // Function to display the next question
  function nextQuestion() {
    const savedQuestion = sessionStorage.getItem('currentQuestion');
    const savedAnswer = sessionStorage.getItem('correctAnswer');
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
  
  // Function to check user's answer
  function wrongAnswer() {
    correctStreak = 0;
    incorrect++;
    incorrectStreak++;
    if (incorrectStreak === 5) {
      displayModal(fiveWrongPrompt);
    } else if (incorrectStreak === 10) {
      displayModal(tenWrongPrompt);
    }
  }

  function checkAnswer() {
    if (mainBtn.textContent === "Check Answer") {
      const userAnswer = parseFloat(answerEl.value);
      if (!isNaN(userAnswer)) {
        if (userAnswer === correctAnswer) {
          score++;
          correct++;
          correctStreak++;
          incorrectStreak = 0;
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
          wrongAnswer()
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
        wrongAnswer()
        displayFeedback("Invalid Input!", "#f44336");
        if (score >= 0 && score % 10 === 9) {
          difficultyLevel--;
        }
      }
      // Clear the session storage
      sessionStorage.removeItem('currentQuestion');
      sessionStorage.removeItem('correctAnswer');
    
      // Check if score reaches the level up threshold
      if (score >= SCORE_LEVEL_UP) {
        operationIndex++;
        difficultyLevel = 1;
        score = 0;
        startGame();
      } else {
        nextQuestion();
      }
    } else {
      return;
    }
  }
  
  // Event listener for main button click
  mainBtn.addEventListener('click', checkAnswer);
  
  // Event listener for Enter key press
  document.addEventListener('keypress', e => {
    if (e.code === 'Enter') {
      e.preventDefault();
      checkAnswer();
    }
  });
  
  // Function to save game state to sessionStorage
  function saveGameState() {
    sessionStorage.setItem('gameState', JSON.stringify({
      operationIndex: operationIndex,
      difficultyLevel: difficultyLevel,
      score: score,
      correct: correct,
      incorrect: incorrect,
      progress: progress,
      shownPrompt: shownPrompt,
      correctStreak: correctStreak,
      incorrectStreak: incorrectStreak,
      levelUpPrompts: levelUpPrompts
    }));
    sessionStorage.setItem('currentQuestion', currentQuestion);
    sessionStorage.setItem('correctAnswer', correctAnswer);
  }
  
  // Function to load game state from sessionStorage
  function loadGameState() {
    const gameState = JSON.parse(sessionStorage.getItem('gameState'));
    if (gameState) {
      operationIndex = gameState.operationIndex;
      difficultyLevel = gameState.difficultyLevel;
      score = gameState.score;
      correct = gameState.correct;
      incorrect = gameState.incorrect;
      progress = gameState.progress;
      shownPrompt = gameState.shownPrompt;
      correctStreak = gameState.correctStreak;
      incorrectStreak = gameState.incorrectStreak;
      levelUpPrompts = gameState.levelUpPrompts;
    }

    const savedQuestion = sessionStorage.getItem('currentQuestion');
    const savedAnswer = sessionStorage.getItem('correctAnswer');
    if (savedQuestion && savedAnswer) {
      currentQuestion = savedQuestion;
      correctAnswer = parseFloat(savedAnswer);
      questionEl.textContent = currentQuestion;
      answerEl.value = '';
    }

    correctEl.textContent = `Correct: ${correct}`;
    incorrectEl.textContent = `Incorrect: ${incorrect}`;
    progressEl.textContent = `Progress: ${progress}%`;
  }
  
  // Load game state from sessionStorage at the beginning
  loadGameState();
  
  // Save game state to sessionStorage every 100 milliseconds
  function updateScoreUI() {
    correctEl.textContent = `Correct: ${correct}`;
    incorrectEl.textContent = `Incorrect: ${incorrect}`;
    progress = Math.floor(((score / 200) + (operationIndex * .25)) * 100);
    progressEl.textContent = `Progress: ${progress}%`;
  }
  const saveInterval = setInterval(saveGameState, 100);
  const updateUI = setInterval(updateScoreUI, 100);
  
  // Call startGame to begin the game
  startGame();
});