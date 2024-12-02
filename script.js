function setViewBox(svg) {
  const boundingBox = svg.getBBox();
  svg.setAttribute('viewBox', `${boundingBox.x} ${boundingBox.y} ${boundingBox.width} ${boundingBox.height}`);
}
const svgElements = document.querySelectorAll('.svg-bounds');
svgElements.forEach(svgElement => {
  setViewBox(svgElement);
});

function generateRandomTiles(numTiles = 20) {
  const tileContainer = document.querySelector('.tile-container');
  
  // Function to generate a random number within a given range
  function getRandomPosition(max) {
    return Math.floor(Math.random() * max);
  }

  // Function to create a random tile and append it to the container
  function createRandomTile(existingPositions) {
    const tile = document.createElement('div');
    tile.classList.add('tile');

    // Get random positions for top and left within the container size
    const maxWidth = tileContainer.offsetWidth - 50; // Subtract tile width to ensure it stays within bounds
    const maxHeight = tileContainer.offsetHeight - 50; // Subtract tile height to ensure it stays within bounds

    let randomX, randomY;

    // Check to make sure the tile doesn't overlap with other tiles
    let overlap = true;
    while (overlap) {
      randomX = getRandomPosition(maxWidth);
      randomY = getRandomPosition(maxHeight);
      overlap = existingPositions.some(pos => {
        // Check if the new position is too close to any existing position
        const distance = Math.sqrt(Math.pow(pos.x - randomX, 2) + Math.pow(pos.y - randomY, 2));
        return distance < 60; // Prevent overlap by keeping a minimum distance between tiles
      });
    }

    // Store the new position
    existingPositions.push({ x: randomX, y: randomY });

    // Apply the random positions
    tile.style.left = `${randomX}px`;
    tile.style.top = `${randomY}px`;

    // Append the tile to the container
    tileContainer.appendChild(tile);

    return tile; // Return the tile so we can track its animation end
  }

  // Remove any existing tiles
  tileContainer.innerHTML = '';

  // Array to store the positions of the tiles
  let existingPositions = [];
  
  // Create the specified number of random tiles
  const tiles = [];
  for (let i = 0; i < numTiles; i++) {
    const tile = createRandomTile(existingPositions);
    tiles.push(tile);
  }

  // Set up the animation end event listener for all tiles
  let completedAnimations = 0;
  tiles.forEach(tile => {
    tile.addEventListener('animationend', function() {
      completedAnimations++;
      console.log('Test')
      // If all animations have finished, regenerate the tiles
      if (completedAnimations === tiles.length) {
        // Call generateRandomTiles again when all tiles finish their animation
        generateRandomTiles(20); // Regenerate the tiles once the animation finishes
      }
    });
  });
}

// Call the function to generate 20 random tiles initially
generateRandomTiles(20);