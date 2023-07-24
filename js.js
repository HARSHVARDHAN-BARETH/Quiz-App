const questions = [
    {
        question: "What is a correct syntax to output 'Hello World' in C ?",
        answers: [
            {text: "system.out.printlne", correct: false}, 
            {text: "printf", correct: true}, 
            {text: "console.write.line", correct: false}, 
            {text: "cout", correct: false}, 
        ]
    },
    {
        question: "How do you insert COMMENTS in C code ?",
        answers: [
            {text: "-- This is a comment", correct: false}, 
            {text: "# This is a comment", correct: false}, 
            {text: "// This is a comment", correct: true}, 
            {text: "* This is a comment", correct: false}, 
        ]
    },
    {
        question: "How can you create a variable with the numeric value 5 ? ",
        answers: [
            {text: "int num = 5;", correct: true}, 
            {text: "num = 5 int;", correct: false}, 
            {text: "val num = 5;", correct: false}, 
            {text: "num = 5;", correct: false}, 
        ]
    },
    {
        question: "How can you create a variable with the floating number 2.8 ?",
        answers: [
            {text: "num = 2.8 double;", correct: false}, 
            {text: "val num = 2.8;", correct: false}, 
            {text: "float num = 2.8;", correct: true}, 
            {text: "num = 2.8 val;", correct: false}, 
        ]
    },
    {
        question: "Which operator is used to add together two values ?",
        answers: [
            {text: "The & sign", correct: true}, 
            {text: "The + sign", correct: false}, 
            {text: "The ADD Keyword", correct: false}, 
            {text: "The * sign", correct: false}, 
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState()
{
    nextButton.style.display = "none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e)
{
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectBtn.classList.add("correct");
        score++;
    }
    else
    {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }
        button.disabled = "true"; 
    });
    nextButton.style.display = "block";
}

function showScore()
{
    resetState();
    questionElement.innerHTML = ` You scored  ${score} out of ${questions.length} !   ` ;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++; 
    if(currentQuestionIndex < questions.length)
    {
        showQuestion(); 
    }
    else
    {
        showScore();
    }
}

nextButton.addEventListener("click", ()=> {
      if(currentQuestionIndex < questions.length)
      {
        handleNextButton();
      }
      else
      {
        startQuiz();
      }
});

startQuiz();