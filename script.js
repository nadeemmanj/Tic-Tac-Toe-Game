const boxes = document.querySelectorAll(".box");

const resetBtn = document.querySelector(".reset-btn");
const newGameBtn = document.querySelector("#new-btn");

const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");
const resultSubtitle = document.querySelector("#result-subtitle");

const xScoreElement = document.querySelector("#x-score");
const oScoreElement = document.querySelector("#o-score");

const turnSymbol = document.querySelector("#turn-symbol");
const turnText = document.querySelector("#turn-text");


let currentPlayer = "X";

let xScore = 0;
let oScore = 0;

let gameActive = true;


const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
];


// -----------------------------
// Box Click
// -----------------------------

boxes.forEach((box) => {

    box.addEventListener("click", () => {

        if (!gameActive || box.disabled) {
            return;
        }


        // Set player symbol
        box.innerText = currentPlayer;


        // Add player class
        box.classList.add(
            currentPlayer === "X" ? "x" : "o"
        );


        // Disable clicked box
        box.disabled = true;


        // Check winner
        const winnerPattern = checkWinner();


        if (winnerPattern) {

            showWinner(winnerPattern);

            return;
        }


        // Check draw
        if (checkDraw()) {

            showDraw();

            return;
        }


        // Change turn
        changeTurn();

    });

});


// -----------------------------
// Change Turn
// -----------------------------

function changeTurn() {

    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }


    updateTurn();

}


// -----------------------------
// Update Turn UI
// -----------------------------

function updateTurn() {

    turnSymbol.innerText = currentPlayer;

    turnText.innerText =
        `Player ${currentPlayer}'s Turn`;


    if (currentPlayer === "X") {

        turnSymbol.style.color = "#5ee7ff";

    } else {

        turnSymbol.style.color = "#b87cff";

    }

}


// -----------------------------
// Check Winner
// -----------------------------

function checkWinner() {

    for (const pattern of winPatterns) {

        const first = boxes[pattern[0]].innerText;
        const second = boxes[pattern[1]].innerText;
        const third = boxes[pattern[2]].innerText;


        if (
            first !== "" &&
            first === second &&
            second === third
        ) {

            return pattern;

        }

    }


    return null;

}


// -----------------------------
// Show Winner
// -----------------------------

function showWinner(winnerPattern) {

    gameActive = false;


    // Highlight winning boxes
    winnerPattern.forEach((index) => {

        boxes[index].classList.add("winner");

    });


    const winner = currentPlayer;


    // Update score
    if (winner === "X") {

        xScore++;

        xScoreElement.innerText = xScore;

    } else {

        oScore++;

        oScoreElement.innerText = oScore;

    }


    // Winner message
    msg.innerText = `Player ${winner} Wins!`;

    resultSubtitle.innerText =
        `Congratulations! Player ${winner} got three in a row.`;


    msgContainer.classList.remove("hide");


    disableBoxes();

}


// -----------------------------
// Draw
// -----------------------------

function checkDraw() {

    return [...boxes].every(
        (box) => box.innerText !== ""
    );

}


function showDraw() {

    gameActive = false;


    msg.innerText = "It's a Draw!";

    resultSubtitle.innerText =
        "Great game! Nobody takes the point this time.";


    msgContainer.classList.remove("hide");

}


// -----------------------------
// Disable Boxes
// -----------------------------

function disableBoxes() {

    boxes.forEach((box) => {

        box.disabled = true;

    });

}


// -----------------------------
// Reset Board
// -----------------------------

function resetGame() {

    currentPlayer = "X";

    gameActive = true;


    boxes.forEach((box) => {

        box.innerText = "";

        box.disabled = false;

        box.classList.remove(
            "x",
            "o",
            "winner"
        );

    });


    msgContainer.classList.add("hide");


    updateTurn();

}


// -----------------------------
// Buttons
// -----------------------------

resetBtn.addEventListener(
    "click",
    resetGame
);


newGameBtn.addEventListener(
    "click",
    resetGame
);


// Initial UI
updateTurn();