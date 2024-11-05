// Select Movable box element
var box = document.querySelector("#movable_box");
var box2 = document.querySelector("#new-box");
const moveAmount = 10; // number of pixels to move the box with each arrow
let x = 100; // Initial left position
let y = 100; // Initial top position

// Function to keep the box within the screen boundaries
function keepWithBounds() {
  const boxRect = box.getBoundingClientRect(); // Get the current position and size of the box
  const screenWidth = window.innerWidth; // width of the viewport
  const screenHeight = window.innerHeight; // height of the viewport

  if (boxRect.left < 0) x = 0; // if the box is beyond the left edge, set X to 0
  if (boxRect.top < 0) y = 0; // if the box is beyond the top edge, set y to 0
  if (boxRect.right > screenWidth) x = screenWidth - boxRect.width; // if beyond right edge
  if (boxRect.bottom > screenHeight) y = screenHeight - boxRect.height; // if beyond bottom edge

  // Update position after bounds check
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;

  checkCollision();
}

// Function to detect if box touches box2
function isColliding(box, box2) {
  const boxRect = box.getBoundingClientRect();
  const box2Rect = box2.getBoundingClientRect();
  return !(
    (
      boxRect.top > box2Rect.bottom || // Top of box is below bottom of box2
      boxRect.bottom < box2Rect.top || // Bottom of box is above top of box2
      boxRect.left > box2Rect.right || // Left of box is beyond right of box2
      boxRect.right < box2Rect.left
    ) // Right of box is before left of box2
  );
}

// Check for collision with box2 and scale the puppy image on touch
function checkCollision() {
  if (isColliding(box, box2)) {
    console.log("Touch detected with box2");
    box.style.transform = "scale(1.5)"; // Scale up the image on touch
  } else {
    box.style.transform = "scale(1)"; // Reset scale when not touching
  }
}

// Listen for arrow key presses to move the box
document.addEventListener("keydown", (event) => {
  if (event.key.startsWith("Arrow")) {
    event.preventDefault(); // Prevent default scroll behavior
    switch (event.key) {
      case "ArrowUp":
        if (y - moveAmount >= 0) y -= moveAmount; // Move up if within top boundary
        break;
      case "ArrowDown":
        if (y + moveAmount <= window.innerHeight - box.offsetHeight)
          y += moveAmount; // Move down
        break;
      case "ArrowLeft":
        if (x - moveAmount >= 0) x -= moveAmount; // Move left if within left boundary
        break;
      case "ArrowRight":
        if (x + moveAmount <= window.innerWidth - box.offsetWidth)
          x += moveAmount; // Move right
        break;
    }
    keepWithBounds(); // Check bounds after moving
  }
});

// Center the box on the click position
document.addEventListener("click", (event) => {
  x = event.clientX - box.offsetWidth / 2;
  y = event.clientY - box.offsetHeight / 2;
  keepWithBounds();
});
