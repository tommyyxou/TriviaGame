let triviaQuestions = [
{
    question:"question 1",
    answer1:"q1ans1",
    answer2:"q1ans2",
    answer3:"q1ans3",
    answer4:"q1ans4",
    correct:"q1ans2",
    img:"",
},
{
    question:"question 2",
    answer1:"q2ans1",
    answer2:"q2ans2",
    answer3:"q2ans3",
    answer4:"q2ans4",
    correct:"q2ans1",
    img:"",
},
{
    question:"question 3",
    answer1:"q3ans1",
    answer2:"q3ans2",
    answer3:"q3ans3",
    answer4:"q3ans4",
    correct:"q3ans3",
    img:"",
},
{
    question:"question 4",
    answer1:"q4ans1",
    answer2:"q4ans2",
    answer3:"q4ans3",
    answer4:"q4ans4",
    correct:"q4ans3",
    img:"",
},
{
    question:"question 5",
    answer1:"q5ans1",
    answer2:"q5ans2",
    answer3:"q5ans3",
    answer4:"q5ans4",
    correct:"q5ans3",
    img:"",
},
];

let questionNumber = 0;
let question = "";
let ans1 = "";
let ans2 = "";
let ans3 = "";
let ans4 = "";
let countDown = 30;
let timerId = null;
let numOfCorrect = 0;
let numOfWrong = 0;
let numOfTimeout = 0;

function loadQuestion (array) {
    question = $("<div>");
    question.attr ('class', "question");
    question.html (array.question);

    ans1 = $("<div>");
    ans1.attr ('class', "answer");
    ans1.html (array.answer1);

    ans2 = $("<div>");
    ans2.attr ('class', "answer");
    ans2.html (array.answer2);

    ans3 = $("<div>");
    ans3.attr ('class', "answer");
    ans3.html (array.answer3);

    ans4 = $("<div>");
    ans4.attr ('class', "answer");
    ans4.html (array.answer4);

    let display = $("#question");
    appendQuestion (display);
    $("#timer").text("Time Remaining: " + countDown + " Seconds.");
    timerId = setInterval("countDownTimer()", 1000);
    $(".answer").click(checkAnswer);
};

function countDownTimer () {
    countDown--;
    $("#timer").remove();
    $("#timerDiv").append("<div id='timer'>Time Remaining: " + countDown + " Seconds.</div>");
    if (countDown === 0) {
        clearInterval(timerId);
        timeout ();
    };
};

function timeout () {
    timerQuestionReset();
    $("#message").append("Time Out! The Correct Answer is:", triviaQuestions[questionNumber].correct);
    setTimeout("nextQuestion()", 5000);
    countDown = 30;
    numOfTimeout++;
};

function checkAnswer(e) {
    let clickedDiv = e.currentTarget;

    if (clickedDiv.innerText === triviaQuestions[questionNumber].correct) {
        timerQuestionReset();
        $("#message").append("Correct!");
        clearInterval(timerId);
        setTimeout("nextQuestion()", 5000);
        countDown = 30;
        numOfCorrect++;

    } else {
        timerQuestionReset();
        $("#message").append("Wrong! The Correct Answer is:", triviaQuestions[questionNumber].correct);
        clearInterval(timerId);
        setTimeout("nextQuestion()", 5000);
        countDown = 30;
        numOfWrong++;
    };
};

function nextQuestion () {
    $("#message").remove();
    $("#messageDiv").append("<div id='message'></div>");

    if (questionNumber === (triviaQuestions.length-1)) {
        gameEnd ();
    } else {
    questionNumber++;
    let array = triviaQuestions[questionNumber];
    loadQuestion (array);
    };
};

function appendQuestion (display) {
    display.append(question);
    display.append(ans1);
    display.append(ans2);
    display.append(ans3);
    display.append(ans4);
};

function start () {
    let array = triviaQuestions[questionNumber]
    loadQuestion (array);
    $("#start").remove();
};

function gameEnd () {
    $("#message").append("<div class='final'>Number of Correct: " + numOfCorrect + "</div>");
    $("#message").append("<div class='final'>Number of Wrong: " + numOfWrong + "</div>");
    $("#message").append("<div class='final'>Number of Timeout: " + numOfTimeout + "</div>");
    $("#restartDiv").append("<button id='restart' onClick='reset();'>Restart</button>");
};

function timerQuestionReset () {
    $("#timer").remove();
    $("#timerDiv").append("<div id='timer'></div>");
    $("#question").remove();
    $("#questionDiv").append("<div id='question'></div>");
};

function reset () {
    $("#message").remove();
    $("#messageDiv").append("<div id='message'></div>");
    $("#restart").remove();
    questionNumber = 0;
    numOfCorrect = 0;
    numOfWrong = 0;
    numOfTimeout = 0;
    let array = triviaQuestions[questionNumber];
    loadQuestion (array);
};