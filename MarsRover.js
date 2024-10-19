let position = { x: 0, y: 0 };
let headings = ["NORTH", "EAST", "SOUTH", "WEST"];
let currentHeadingIndex = 1;
let stopped = false;

const directionMap = {
  NORTH: { x: 0, y: 1 },
  EAST: { x: 1, y: 0 },
  SOUTH: { x: 0, y: -1 },
  WEST: { x: -1, y: 0 },
};

const obstacles = [
  [1, 4],
  [3, 5],
  [7, 4],
];

const comandMap = {
  F: () => moveDirection(1),
  B: () => moveDirection(-1),
  R: () => rotate(1),
  L: () => rotate(-1),
};

function moveDirection(multiplier) {
  if (stopped) return;
  const currentHeading = headings[currentHeadingIndex];
  const moveVector = directionMap[currentHeading];

  newX = position.x + moveVector.x * multiplier;
  newY = position.y + moveVector.y * multiplier;

  if (checkForObstacles(newX, newY)) {
    return false;
  }
  position.x = newX;
  position.y = newY;
  return true;
}

function checkForObstacles(x, y) {
  return obstacles.some((obstacle) => obstacle[0] === x && obstacle[1] === y);
}

function rotate(direction) {
  currentHeadingIndex = (currentHeadingIndex + direction + 4) % 4;
}

function executeComands(comandString) {
  const upperCaseComandString = comandString.toUpperCase();
  for (const comand of upperCaseComandString) {
    if (stopped) break;
    comandMap[comand]();
  }
  console.log(
    `(${position.x}, ${position.y}), Heading: ${headings[currentHeadingIndex]}`
  );
}

function getRoverStatus() {
  return { position, heading: headings[currentHeadingIndex], stopped };
}

function navigateTo(targetX, targetY) {
  while (position.x !== targetX || position.y !== targetY) {
    const deltaX = targetX - position.x;
    const deltaY = targetY - position.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      currentHeadingIndex = deltaX > 0 ? 1 : 3; // EAST or WEST
    } else {
      currentHeadingIndex = deltaY > 0 ? 0 : 2; // NORTH or SOUTH
    }
    let success = moveDirection(1);

    if (!success) {
      rotate(1);
      if (!moveDirection(1)) {
        rotate(1);
        rotate(1);
        moveDirection(1);
      }
    }
    console.log(
      `Position: (${position.x}, ${position.y}), Heading: ${headings[currentHeadingIndex]}`
    );
  }
  console.log("Rover successfully reached the target.");
}

module.exports = {
  executeComands,
  getRoverStatus,
  navigateTo,
  position,
  headings,
};
console.log(executeComands("ffflfrbblffffrfff"));
