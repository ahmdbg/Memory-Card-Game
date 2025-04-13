const icons = ['🍎', '🍎', '🍌', '🍌', '🍒', '🍒', '🍇', '🍇', '🍓', '🍓', '🍍', '🍍', '🥝', '🥝', '🍉', '🍉'];
let openCards = [];
let matchedPairs = 0;
let score = 0;
let timer;
let seconds = 0;
let isGameStarted = false;

// Sound effects
// const flipSound = document.getElementById('flipSound');
const matchSound = document.getElementById('matchSound');
const errorSound = document.getElementById('errorSound');
const winSound = document.getElementById('winSound');


// shuffle array
icons.sort(() => 0.5 - Math.random());

const gameBoard = document.getElementById("gameBoard");

// generate cards
icons.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.icon = icon;
    card.textContent = "";
    card.addEventListener("click", () => flipCard(card));
    gameBoard.appendChild(card);
});

// Initialize game stats
function initGameStats() {
    score = 0;
    seconds = 0;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = '00:00';
}

// Start timer
function startTimer() {
    if (!isGameStarted) {
        isGameStarted = true;
        timer = setInterval(() => {
            seconds++;
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            document.getElementById('timer').textContent =
                `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        }, 1000);
    }
}

// Update score
function updateScore(points) {
    score += points;
    document.getElementById('score').textContent = score;
}

function flipCard(card) {
    if (!isGameStarted) startTimer();
    // flipSound.play();
    if (card.classList.contains("matched") || openCards.includes(card) || openCards.length === 2) return;

    card.textContent = card.dataset.icon;
    openCards.push(card);

    if (openCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}

function checkMatch() {
    const [card1, card2] = openCards;

    if (card1.dataset.icon === card2.dataset.icon) {
        handleMatch();
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === icons.length / 2) {
            setTimeout(showWinModal, 200);
        }
    } else {
        handleNonMatch();
        card1.textContent = "";
        card2.textContent = "";
    }

    openCards = [];
}

function handleMatch() {
    matchSound.play();
    updateScore(10);
}

function handleNonMatch() {
    errorSound.play();
    updateScore(-5);
}

function showWinModal() {
    const modal = document.getElementById('winModal');
    winSound.play();

    modal.style.display = 'flex';
}

function restartGame() {
    clearInterval(timer);
    isGameStarted = false;
    initGameStats();
    matchedPairs = 0;
    openCards = [];

    // Shuffle icons
    icons.sort(() => 0.5 - Math.random());

    // Reset all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.classList.remove('matched');
        card.textContent = "";
        card.dataset.icon = icons[index];
    });

    // Hide modal
    document.getElementById('winModal').style.display = 'none';
}

// Add event listener for Play Again button
document.getElementById('playAgain').addEventListener('click', restartGame);

