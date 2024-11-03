//Select Movable box element
var box = document.querySelector("#movable_box");
const moveAmount = 10; //number of pixels to move the box with each arrow
let x = 100; //Initial left position
let y = 100; //Initial top position

//function to keep the box within the screen boundaries
function keepWithBounds() {
  const boxRect = box.getBoundingClientRect(); //Get the current position and size of the box
  const screenWidth = window.innerWidth; //width of the view port
  const screenHeight = window.innerHeight; //height of the view port

  if (boxRect.left < 0) x = 0; //if the box is beyond the left edge, set X to
  if (boxRect.top < 0) y = 0; //if the box i beyond the top edge, set y to 0
  //if the box is beyond the right edge, set x to maximum allowed position
  if (boxRect.right > screenWidth) x = screenWidth - boxRect.width;
  // if the box is beyond the bottom edge set y to maximum
  if (boxRect.bottom > screenHeight) y = screenHeight - boxRect.height;
  //update position after bounds check
  box.style.left = `${x}px`;
  box.style.top = `${y}px`;
}

//listen for arrow key presses to move the box
document.addEventListener("keydown", (event) => {
  if (event.key.startsWith("Arrow")) {
    // only respond to arrow key
    event.preventDefault(); //prevent default scroll behavior
    switch (event.key) {
      case "ArrowUp":
        if (y - moveAmount >= 0) {
          //move up if within top boundary
          y -= moveAmount;
        }
        break;
      case "ArrowDown":
        if (y + moveAmount <= window.innerHeight - box.offsetHeight) {
          //move down within down boundary
          y += moveAmount;
        }
        break;
      case "ArrowLeft":
        if (x - moveAmount >= 0) {
          //move left if within left boundary
          x -= moveAmount;
        }
        break;
      case "ArrowRight":
        if (x + moveAmount <= window.innerWidth - box.offsetWidth) {
          //move right withing right boundary
          x += moveAmount;
        }
        break;
    }
    keepWithBounds(); //check bounds after moving
  }
});

//change box content and background when key is released
document.addEventListener("keyup", (event) => {});
document.addEventListener("click", (event) => {
  //center the box on the click position
  x = event.clientX - box.offsetWidth / 2;
  y = event.clientY - box.offsetHeight / 2;

  //Ensure the box stays within bounds after clicking
  keepWithBounds();
});
