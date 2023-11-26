document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleButton');
    const gameBoard = document.getElementById('game-board');
    const gridSize = 20;
    const snakeSize = 20;
    let snake = [{ x: 0, y: 0 }];
    let food = { x: 0, y: 0 };
    let direction = 'right';
    let isButtonEnabled = true; // New variable to track the button state
    const upButton = document.getElementById('upButton');
    const downButton = document.getElementById('downButton');
    const leftButton = document.getElementById('leftButton');
    const rightButton = document.getElementById('rightButton');
    toggleButton.addEventListener('click', () => {
        isButtonEnabled = !isButtonEnabled; // Toggle the button state
    });
    function updateDirection(newDirection) {
        if (isButtonEnabled) {
            direction = newDirection;
        }
    }

    // Event listeners for virtual buttons
    upButton.addEventListener('click', () => updateDirection('up'));
    downButton.addEventListener('click', () => updateDirection('down'));
    leftButton.addEventListener('click', () => updateDirection('left'));
    rightButton.addEventListener('click', () => updateDirection('right'));

    function drawSnake() {
        gameBoard.innerHTML = '';
        snake.forEach(segment => {
            const snakeElement = document.createElement('div');
            snakeElement.classList.add('snake');
            snakeElement.style.left = segment.x * gridSize + 'px';
            snakeElement.style.top = segment.y * gridSize + 'px';
            gameBoard.appendChild(snakeElement);
        });
    }

    function drawFood() {
        const foodElement = document.createElement('div');
        foodElement.classList.add('food');
        foodElement.style.left = food.x * gridSize + 'px';
        foodElement.style.top = food.y * gridSize + 'px';
        gameBoard.appendChild(foodElement);
    }

    function moveSnake() {
        if (isButtonEnabled) {
            const head = { ...snake[0] };
            switch (direction) {
                case 'up':
                    head.y -= 1;
                    break;
                case 'down':
                    head.y += 1;
                    break;
                case 'left':
                    head.x -= 1;
                    break;
                case 'right':
                    head.x += 1;
                    break;
            }

            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                generateFood();
            } else {
                snake.pop();
            }
        }
    }

    function generateFood() {
        food = {
            x: Math.floor(Math.random() * (gameBoard.clientWidth / gridSize)),
            y: Math.floor(Math.random() * (gameBoard.clientHeight / gridSize))
        };

        // Make sure food doesn't appear on the snake
        if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
            generateFood();
        }
    }

    function checkCollision() {
        const head = snake[0];

        // Check if snake hits the walls
        if (head.x < 0 || head.x >= gameBoard.clientWidth / gridSize || head.y < 0 || head.y >= gameBoard.clientHeight / gridSize) {
            resetGame();
        }

        // Check if snake collides with itself
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                resetGame();
            }
        }
    }

    function resetGame() {
        snake = [{ x: 0, y: 0 }];
        direction = 'right';
        generateFood();
    }

    function gameLoop() {
        moveSnake();
        drawSnake();
        drawFood();
        checkCollision();
    }

    document.addEventListener('keydown', (e) => {
        switch (e.key) {
            case 'ArrowUp':
                direction = 'up';
                break;
            case 'ArrowDown':
                direction = 'down';
                break;
            case 'ArrowLeft':
                direction = 'left';
                break;
            case 'ArrowRight':
                direction = 'right';
                break;
        }
    });

    generateFood();
    setInterval(gameLoop, 200);
});
