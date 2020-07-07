/*
GAME FUNCTION:
 - Player must guess a number between a min and max
 - Player gets a certain amout of guesses
 - Notify player of guesses remaining
 - Notify the player of the correct answer if they lose
 - Let player choose to play again
*/

// Game Values
let min = 1,
	max = 10,
	winningNum = getRandomNum(min, max),
	guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
	minNum = document.querySelector('.min-num'),
	maxNum = document.querySelector('.max-num'),
	guessBtn = document.querySelector('#guess-btn'),
	guessInput = document.querySelector('#guess-input'),
	message = document.querySelector('.message');

// Assign UI Min and Max
minNum.textContent = min;
maxNum.textContent = max;

// Play Again Event Listener
game.addEventListener('mousedown', function(e) {
	if (e.target.className === 'play-again') {
		window.location.reload();
	}
});

// Listen for Guess
guessBtn.addEventListener('click', function() {
	let guess = parseInt(guessInput.value);

	// Validate Input
	if (isNaN(guess) || guess < min || guess > max) {
		setMessage(`Please enter a number between ${min} and ${max}`, 'red');
	}

	// Check if Player Won
	if (guess === winningNum) {
		// Game Over, Player Won
		gameOver(true, `${winningNum} is correct, YOU WIN!`);
	} else {
		// Wrong number
		guessesLeft -= 1;

		if (guessesLeft === 0) {
			// Game Over, Player Lost
			gameOver(false, `Game Over. The correct number was ${winningNum}`);
		} else {
			// Game Continues - Answer was Wrong
			// Tell User That Their Guess was Incorrect
			setMessage(`${guess} is not correct, you have ${guessesLeft} guesses left`);
			// Red  Border Color
			guessInput.style.borderColor = 'red';
			// Red Text Color
			message.style.color = 'red';
			// Clear Input
			guessInput.value = '';
		}
	}
});

// Game Over
function gameOver(won, msg) {
	let color;
	won === true ? (color = 'green') : (color = 'red');

	// Disable Input
	guessInput.disabled = true;
	// Change  Border Color
	guessInput.style.borderColor = color;
	// Set Text Color
	message.style.color = color;
	// Set  Message
	setMessage(msg);

	// Play Again?
	guessBtn.value = 'Play Again?';
	guessBtn.className += 'play-again';
}

// Get Random Number
function getRandomNum(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set Message
function setMessage(msg, color) {
	message.style.color = color;
	message.textContent = msg;
}
