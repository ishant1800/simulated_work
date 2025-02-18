const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".results");
let currentShooterIndex = 202;
const width = 15;
const aliensRemoved = [];
let isGoingRight = true;
let results = 0;

// Create grid squares
for (let i = 0; i < width * width; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

// Define enemy types with movement patterns and speeds
const alienTypes = [
    {
        name: "zigzag",
        positions: [0, 1, 2, 3, 4, 5],
        speed: 600,
        pattern: (index, direction) => index + direction * width + (index % 2 === 0 ? 1 : -1),
    },
    {
        name: "straight",
        positions: [10, 11, 12, 13, 14],
        speed: 800,
        pattern: (index, direction) => index + direction,
    },
    {
        name: "fast",
        positions: [20, 21, 22, 23, 24],
        speed: 400,
        pattern: (index, direction) => index + direction * width,
    },
];

const alienGroups = alienTypes.map((type) => ({
    ...type,
    positions: [...type.positions],
}));

// Draw aliens on the grid
function drawAliens() {
    alienGroups.forEach((group) => {
        group.positions.forEach((position, i) => {
            if (!aliensRemoved.includes(position)) {
                squares[position].classList.add(group.name);
            }
        });
    });
}

// Remove aliens from the grid
function removeAliens() {
    alienGroups.forEach((group) => {
        group.positions.forEach((position) => {
            squares[position].classList.remove(group.name);
        });
    });
}

// Move aliens according to their patterns and speeds
function moveAliens() {
    removeAliens();

    alienGroups.forEach((group) => {
        const direction = isGoingRight ? 1 : -1;

        group.positions = group.positions.map((pos) =>
            group.pattern(pos, direction)
        );

        if (group.positions.some((pos) => squares[pos]?.classList.contains("shooter"))) {
            resultDisplay.innerHTML = "GAME OVER";
            clearInterval(group.intervalId);
        }

        if (aliensRemoved.length === alienGroups.reduce((sum, group) => sum + group.positions.length, 0)) {
            resultDisplay.innerHTML = "YOU WIN";
            clearInterval(group.intervalId);
        }
    });

    drawAliens();
}

// Draw the shooter
squares[currentShooterIndex].classList.add("shooter");

function moveShooter(e) {
    squares[currentShooterIndex].classList.remove("shooter");
    switch (e.key) {
        case "ArrowLeft":
            if (currentShooterIndex % width !== 0) currentShooterIndex -= 1;
            break;
        case "ArrowRight":
            if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
            break;
    }
    squares[currentShooterIndex].classList.add("shooter");
}

document.addEventListener("keydown", moveShooter);

function shoot(e) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;

    function moveLaser() {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");

        alienGroups.forEach((group) => {
            if (squares[currentLaserIndex].classList.contains(group.name)) {
                squares[currentLaserIndex].classList.remove("laser");
                squares[currentLaserIndex].classList.remove(group.name);
                squares[currentLaserIndex].classList.add("boom");

                setTimeout(() => squares[currentLaserIndex].classList.remove("boom"), 300);
                clearInterval(laserId);

                const alienRemoved = group.positions.indexOf(currentLaserIndex);
                if (alienRemoved >= 0) {
                    group.positions.splice(alienRemoved, 1);
                    aliensRemoved.push(currentLaserIndex);
                    results++;
                    resultDisplay.innerHTML = results;
                }
            }
        });
    }

    if (e.key === "ArrowUp") {
        laserId = setInterval(moveLaser, 100);
    }
}

document.addEventListener("keydown", shoot);

// Set up intervals for each enemy group
alienGroups.forEach((group) => {
    group.intervalId = setInterval(() => {
        moveAliens();
    }, group.speed);
});

drawAliens();
