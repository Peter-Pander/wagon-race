// Initialize the positions for both players
let player1Position = 1; // Player 1 starts at the second cell (index 1)
let player2Position = 1; // Player 2 starts at the second cell (index 1)

// Track if the game is over
let gameOver = false;

// Get the elements representing the players' positions
const player1Cells = document.querySelectorAll("#player1-race td");
const player2Cells = document.querySelectorAll("#player2-race td");

// Function to move a player forward
function movePlayer(playerCells, playerPosition) {
  // Remove the 'active' class from the current cell
  playerCells[playerPosition].classList.remove("active");

  // Move to the next cell (ensure it’s not the finish line)
  if (playerPosition + 1 < playerCells.length) {
    playerPosition += 1; // Increment the position
    // Add the 'active' class to the new cell
    playerCells[playerPosition].classList.add("active");
  }

  return playerPosition;
}

// Function to show the winner message inside the finish-line cell
function showWinnerMessage(player) {
  const finishCell = document.querySelector(`#${player}-race .finish-line`);
  if (!finishCell) return; // Prevent errors if the finish cell is missing

  let winnerMessage = finishCell.querySelector(".winner-message");

  if (!winnerMessage) {
    // Create a new span for the message if it doesn't exist
    winnerMessage = document.createElement("span");
    winnerMessage.classList.add("winner-message");
    finishCell.appendChild(winnerMessage);
  }

  winnerMessage.textContent = `${player.replace("player", "Player ")} wins! 🏆`;
  winnerMessage.style.display = "block";
}

// Function to announce the winner
function announceWinner(winner) {
  showWinnerMessage(winner);
  gameOver = true; // Set the game as over
}

// Function to restart the game
function restartGame() {
  // Reset player positions
  player1Position = 1;
  player2Position = 1;
  gameOver = false; // Reset the game state

  // Remove 'active' class from all cells
  player1Cells.forEach(cell => cell.classList.remove("active"));
  player2Cells.forEach(cell => cell.classList.remove("active"));

  // Reapply the 'active' class to the starting positions
  player1Cells[player1Position].classList.add("active");
  player2Cells[player2Position].classList.add("active");

  // Hide winner messages
  document.querySelectorAll(".winner-message").forEach(msg => msg.style.display = "none");
}

// Initialize the 'active' class for the starting positions
player1Cells[player1Position].classList.add("active");
player2Cells[player2Position].classList.add("active");

// Event listener for keyup to move players
document.addEventListener("keyup", (event) => {
  // Check if the "r" key is pressed to restart the game
  if (event.key === "r") {
    restartGame();
    return; // Exit early to avoid processing other keys
  }

  // Prevent moves if the game is over
  if (gameOver) return;

  // Move player 1 with the "w" key
  if (event.key === "w") {
    player1Position = movePlayer(player1Cells, player1Position);
    // Check if player 1 reached the finish line
    if (player1Cells[player1Position].classList.contains("finish-line")) {
      announceWinner("player1");
    }
  }

  // Move player 2 with the "p" key
  if (event.key === "p") {
    player2Position = movePlayer(player2Cells, player2Position);
    // Check if player 2 reached the finish line
    if (player2Cells[player2Position].classList.contains("finish-line")) {
      announceWinner("player2");
    }
  }
});
