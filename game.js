// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Bird properties
const bird = {
  x: 50,
  y: canvas.height / 2 - 15,
  size: 30,
  speed: 2,
  gravity: 0.1,
  jump: -4,
};

// Pipe properties
const pipe = {
  width: 50,
  height: 300,
  gap: 150,
  x: canvas.width,
};

// Game state
let score = 0;
let isGameOver = false;

function drawBird() {
  ctx.fillStyle = '#4CAF50';
  ctx.fillRect(bird.x, bird.y, bird.size, bird.size);
}

function drawPipe() {
  ctx.fillStyle = '#2196F3';
  ctx.fillRect(pipe.x, 0, pipe.width, pipe.height);
  ctx.fillRect(pipe.x, pipe.height + pipe.gap, pipe.width, canvas.height - (pipe.height + pipe.gap));
}

function drawScore() {
  ctx.fillStyle = '#000';
  ctx.font = '24px Arial';
  ctx.fillText(`Score: ${score}`, 20, 30);
}

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw bird
  drawBird();

  // Draw pipes
  drawPipe();

  // Draw score
  drawScore();

  // Move bird
  bird.y += bird.speed;
  bird.speed += bird.gravity;

  // Move pipe
  pipe.x -= 2;

  // Check for collisions
  if (
    bird.y < 0 ||
    bird.y + bird.size > canvas.height ||
    (bird.x + bird.size > pipe.x &&
      bird.x < pipe.x + pipe.width &&
      (bird.y < pipe.height || bird.y + bird.size > pipe.height + pipe.gap))
  ) {
    isGameOver = true;
  }

  // Check if bird passed through the pipe
  if (bird.x > pipe.x + pipe.width && !isGameOver) {
    score++;
    pipe.x = canvas.width;
    pipe.height = Math.floor(Math.random() * (canvas.height - pipe.gap));
  }

  // Game over
  if (isGameOver) {
    ctx.fillStyle = '#FF0000';
    ctx.font = '40px Arial';
    ctx.fillText('Game Over', canvas.width / 2 - 120, canvas.height / 2);
    ctx.fillText(`Score: ${score}`, canvas.width / 2 - 80, canvas.height / 2 + 50);
  } else {
    // Repeat the draw function
    requestAnimationFrame(draw);
  }
}

// Handle key press
window.addEventListener('keydown', function (e) {
  if (e.code === 'Space' && !isGameOver) {
    bird.speed = bird.jump;
  }
});

// Start the game
draw();
