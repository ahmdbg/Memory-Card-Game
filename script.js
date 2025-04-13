const icons = ['🍎', '🍎', '🍌', '🍌', '🍒', '🍒', '🍇', '🍇', '🍓', '🍓', '🍍', '🍍', '🥝', '🥝', '🍉', '🍉'];
let openCards = [];
let matchedPairs = 0;

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

function flipCard(card) {
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
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;

        if (matchedPairs === icons.length / 2) {
            setTimeout(showWinModal, 200);
        }
    } else {
        card1.textContent = "";
        card2.textContent = "";
    }

    openCards = [];
}

function showWinModal() {
    const modal = document.getElementById('winModal');
    modal.style.display = 'flex';
}

function restartGame() {
    // Reset variables
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
