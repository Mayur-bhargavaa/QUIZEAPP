const questions = [
    {
        "question": "Which method is used to serialize an object into a JSON string in JavaScript?",
        "answers": [
          { "text": "JSON.stringify()", "correct": true },
          { "text": "JSON.serialize()", "correct": false },
          { "text": "JSON.convert()", "correct": false },
          { "text": "Object.toString()", "correct": false }
        ]
      },
      {
        "question": "How can you add an element at the beginning of an array in JavaScript?",
        "answers": [
          { "text": "array.push(element)", "correct": false },
          { "text": "array.unshift(element)", "correct": true },
          { "text": "array.addFirst(element)", "correct": false },
          { "text": "array.prepend(element)", "correct": false }
        ]
      },
      {
        "question": "Which operator is used to check both the value and the type of a variable?",
        "answers": [
          { "text": "==", "correct": false },
          { "text": "===", "correct": true },
          { "text": "!=", "correct": false },
          { "text": "!==", "correct": false }
        ]
      },
      {
        "question": "What will the following code return: Boolean(10 > 9)?",
        "answers": [
          { "text": "true", "correct": true },
          { "text": "false", "correct": false },
          { "text": "'true'", "correct": false },
          { "text": "null", "correct": false }
        ]
      },
      {
        "question": "What is the purpose of the 'use strict' directive?",
        "answers": [
          { "text": "It enables the browser to optimize the JavaScript code.", "correct": false },
          { "text": "It is a declaration that is ignored by the browser.", "correct": false },
          { "text": "It enforces stricter parsing and error handling in your code.", "correct": true },
          { "text": "It instructs the browser to use the latest JavaScript version.", "correct": false }
        ]
      },
      {
        "question": "How do you create a new promise in JavaScript?",
        "answers": [
          { "text": "new Promise()", "correct": true },
          { "text": "Promise.new()", "correct": false },
          { "text": "Promise.create()", "correct": false },
          { "text": "createPromise()", "correct": false }
        ]
      },
      {
        "question": "Which method is used to round a number to the nearest integer?",
        "answers": [
          { "text": "Math.round()", "correct": true },
          { "text": "Number.round()", "correct": false },
          { "text": "Math.floor()", "correct": false },
          { "text": "Math.ceil()", "correct": false }
        ]
      },
      {
        "question": "What does the 'async' keyword do in JavaScript?",
        "answers": [
          { "text": "Pauses the execution of a function at await statements", "correct": false },
          { "text": "Immediately executes a function in a new thread", "correct": false },
          { "text": "Marks a function as asynchronous, returning a Promise", "correct": true },
          { "text": "Makes sure a function runs synchronously", "correct": false }
        ]
      },
      {
        "question": "What method is used to remove the last element from an array and returns that element?",
        "answers": [
          { "text": "array.pop()", "correct": true },
          { "text": "array.push()", "correct": false },
          { "text": "array.shift()", "correct": false },
          { "text": "array.removeLast()", "correct": false }
        ]
      },
      {
        "question": "Which of the following is not a valid way to declare a variable in JavaScript?",
        "answers": [
          { "text": "var variableName;", "correct": false },
          { "text": "let variableName;", "correct": false },
          { "text": "const variableName;", "correct": false },
          { "text": "variable variableName;", "correct": true }
        ]
      },
  ];
  
  let test = (ele) => {
    ele.style.backgroundColor = "red";
  };
  
  const questionElement = document.getElementById("question");
  const progressElement = document.getElementById("myBar");
  const scoreElement = document.getElementById("score");
  const ansElement = document.getElementById("ans-container");
  const nextButton = document.querySelector(".next-btn");
  const questionNumElement = document.getElementById("question-num");
  const restartBtn = document.getElementById("restart-btn");
  const mainContainer = document.querySelector(".main-container");
  const scoreContainer = document.querySelector(".score-container");
  let score = 0;
  let progressIncrease = 100 / questions.length;
  let progress = progressIncrease;
  let currentQuestionNum = 0;
  
  function startQuiz() {
    mainContainer.style.display = "block";
    scoreContainer.style.display = "none";
    progress = progressIncrease;
    score = 0;
    currentQuestionNum = 0;
    nextButton.innerHTML = 'Next<i class="fa-solid fa-angle-right">';
    scoreElement.innerText = `${score}`;
    questionNumElement.innerText = `${currentQuestionNum + 1}/${
      questions.length
    }`;
    progressElement.style.width = `${progress}%`;
    showQuestion();
  }
  
  function showQuestion() {
    resetAll();
    questionElement.innerText = `${currentQuestionNum + 1}. ${
      questions[currentQuestionNum].question
    }`;
    questions[currentQuestionNum].answers.forEach((ans) => {
      let button = document.createElement("button");
      button.innerHTML = ans.text;
      button.classList.add("btn");
      if (ans.correct) {
        button.dataset.correct = ans.correct;
      }
      button.addEventListener("click", selectAns);
      ansElement.appendChild(button);
    });
    currentQuestionNum++;
  }
  
  function selectAns(e) {
    const selectedAns = e.target;
    const isCorrect = selectedAns.dataset.correct == "true";
    if (isCorrect) {
      selectedAns.classList.add("correct");
      score++;
      scoreElement.innerText = score;
    } else if (!isCorrect) {
      selectedAns.classList.add("incorrect");
    }
    Array.from(ansElement.children).forEach((btn) => {
      if (btn.dataset.correct == "true") {
        btn.classList.add("correct");
      }
      btn.classList.remove(".btn");
      btn.disabled = "true";
      btn.style.cursor = "not-allowed";
    });
    skipButton.style.display = 'none';
    nextButton.style.display = 'block';
  }
  
  function resetAll() {
    nextButton.style.display = "none";
    while (ansElement.firstChild) {
      ansElement.removeChild(ansElement.firstChild);
      skipButton.style.display = 'inline-block'; // Show skip button when resetting
  nextButton.style.display = 'none';
    }
  }
  
  function showResult() {
    mainContainer.style.display = "none";
    scoreContainer.style.display = "flex";
    document.getElementById("score-per").innerText = `${Math.round(
      (score / questions.length) * 100
    )}% `;
    document.getElementById(
      "score-total-question"
    ).innerHTML = `${questions.length}`;
    document.getElementById("score-total-ans").innerHTML = `${score}`;
    restartBtn.addEventListener("click", startQuiz);
  }
  
  // function nextQuestion() {
  //   if (currentQuestionNum + 1 > questions.length) {
  //     nextButton.innerText = "Show Result";
  //     showResult();
  //   } else {
  //     if (currentQuestionNum == questions.length - 1) {
  //       nextButton.innerHTML = "Show Result";
  //     }
  //     progress += progressIncrease;
  //     questionNumElement.innerText = `${currentQuestionNum + 1}/${
  //       questions.length
  //     }`;
  //     progressElement.style.width = `${progress}%`;
  //     showQuestion();
  //   }
  // }
  const skipButton = document.querySelector(".skip-btn");

function skipQuestion() {
  if (currentQuestionNum >= questions.length) {
    showResult();
  } else {
    progress += progressIncrease;
    progressElement.style.width = `${progress}%`;
    questionNumElement.innerText = `${currentQuestionNum + 1}/${questions.length}`;
    
    // If it is the last question, change the skip button to show result
    if (currentQuestionNum === questions.length - 1) {
      skipButton.innerHTML = 'Show Result<i class="fa-solid fa-angle-right"></i>';
    }

    showQuestion();
  }
}
skipButton.addEventListener("click", skipQuestion);
  function nextQuestion() {
    if (currentQuestionNum >= questions.length) {
      nextButton.innerText = "Show Result";
      showResult();
    } else {
      // Move to next question and update progress
      progress += progressIncrease;
      progressElement.style.width = `${progress}%`;
      questionNumElement.innerText = `${currentQuestionNum + 1}/${questions.length}`;
      
      // If it is the last question, change button text to "Show Result"
      if (currentQuestionNum === questions.length - 1) {
        nextButton.innerHTML = 'Show Result<i class="fa-solid fa-angle-right"></i>';
      }
  
      showQuestion();
    }
  }
  
  nextButton.addEventListener("click", nextQuestion);
  startQuiz();