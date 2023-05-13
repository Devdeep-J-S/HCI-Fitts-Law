// Reference : Daniel Martinez

var middle; //Middle of the browser windows to draw the line
var canvas; //Main canvas
var ctx; //canvas context
var rectId = 0; //number to identify the squares in the results
var results = new Array(); //array with the results
var timeRectAppear; //time when the rectangle appears
var currentRect = null; //current rectangle displayed
var previousRect = null; //previous rectangle displayed
var firstTime = true; //flag to check if it's the first time running the script
var rectangles = new Array(); //array that contains all rectangles to display
var rectangleSizes = [
  { type: 1, width: 20, height: 10 },
  { type: 2, width: 40, height: 20 },
  { type: 3, width: 60, height: 30 },
  { type: 4, width: 80, height: 40 },
  { type: 5, width: 100, height: 50 },
  { type: 6, width: 300, height: 70 },
  { type: 7, width: 200, height: 150 },
]; //all the 7 different sizes of rectangles

window.onload = function setup() {
  /*At the beginning we hide some elements not relevant for the experiment*/
  document.getElementById("btnResults").style.visibility = "hidden";
  document.getElementById("txtResults").style.visibility = "hidden";
  document.getElementById("btnCopy").style.visibility = "hidden";
  document.getElementById("download").style.visibility = "hidden";
  document.getElementById("back").style.visibility = "hidden";
  console.log("hello darkness my old friend");
};

/*this function gives a random position for the rectangles keeping in mind their width
                         to prevent displaying them outside the browser window boundary*/
function generatePosition(rectWidth) {
  var maxWidth = canvas.width;
  return Math.random() * (maxWidth - rectWidth);
}

/*function to get the Dimensions of the Browser*/
var getWindowDimensions = () => {
  var width = Math.min(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );

  var height = Math.min(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.documentElement.clientHeight
  );

  return { width, height };
};

function getRadioValue(name) {
  var radioButtons = document.getElementsByName(name);
  for (var i = 0; i < radioButtons.length; i++) {
    if (radioButtons[i].checked) {
      return radioButtons[i].value;
    }
  }
  return null;
}

function funk_me() {
  let maxVal = 0xffffff; // 16777215
  let randomNumber = Math.random() * maxVal;
  randomNumber = Math.floor(randomNumber);
  randomNumber = randomNumber.toString(16);
  let randColor = randomNumber.padStart(6, 0);
  return `#${randColor.toUpperCase()}`;
}

/*Starts the experiment*/
function start() {
  var numberOfRectangles = parseInt(prompt("Enter the number of rectangles:"));
  // Validate the input
  if (isNaN(numberOfRectangles) || numberOfRectangles <= 0) {
    alert("Invalid input. Please enter a positive number.");
    start(); // Ask again
  } else {
    setCanvas(); //we set the canvas up

    numberOfRectangles = isNaN(numberOfRectangles) ? 5 : numberOfRectangles;
    /*We fill the rectangles array with all the rectangles*/
    for (var k = 0; k < numberOfRectangles; ++k) {
      var j = Math.floor(Math.random() * 7);
      var posX = generatePosition(rectangleSizes[j].width); //obtain a random position along the line for this rectangle.
      /*create a rectangle object*/

      var rectangle = {
        x: posX,
        y: middle - rectangleSizes[j].height / 2,
        color: funk_me(),
        width: rectangleSizes[j].width,
        height: rectangleSizes[j].height,
      };
      rectangles.push(rectangle); //insert rectangle in array
    }

    document.getElementById("text").innerHTML = "";
    document.getElementById("start").style.visibility = "hidden"; //hides start button
    document.getElementById("radio-b").style.visibility = "hidden";
    document.getElementById("radio-a").style.visibility = "hidden";
    document.getElementById("radio-c").style.visibility = "hidden";
    document.getElementById("back").style.visibility = "hidden";

    document.body.style.background = "white";
    document.body.style.margin = "0px";
    drawLine(); //draws the line in the middle of the browser
    drawSquares(); //main function to display the rectangles
  }
}

/*general purpuse to set up the canvas properties*/
function setCanvas() {
  canvas = document.getElementById("canvasLayer");
  var dimensions = getWindowDimensions();
  canvas.width = dimensions.width;
  canvas.height = dimensions.height - dimensions.height * 0.9; //reduce 10% the height of the canvas based on the browser to avoid scrolling (just to be safe)
  canvas.style.border = "0px solid";
  middle = canvas.height / 2;
  ctx = canvas.getContext("2d");
}

/*draws the line in the middle of the browser*/
function drawLine() {
  var dimensions = getWindowDimensions();
  ctx.moveTo(0, middle);
  ctx.lineTo(dimensions.width, middle);
  ctx.stroke();
}

/*main function to display the rectangles*/
function drawSquares() {
  if (rectangles.length > 0) {
    //check if there are more rectangles in the array
    previousRect = currentRect; //set the previous rectangle
    currentRect = rectangles.splice(
      Math.floor(Math.random() * rectangles.length),
      1
    )[0]; //obtain a rectangle and remove it from the array
    ctx.fillStyle = currentRect.color; //set the rectangle color

    if (!firstTime) {
      //if this is not the first rectangle
      timeRectAppear = new Date().getTime(); //set the current time
      var xPos = safeDistance(currentRect, previousRect); //check if the current rectangle has the minimum distance from the previous rectangle and return the position
      currentRect.x = xPos; //set the safe position to the current rectangle
    }
    ctx.fillRect(
      currentRect.x,
      currentRect.y,
      currentRect.width,
      currentRect.height
    ); //draw the rectangle

    if (firstTime) {
      //if this is the first time we add the event listener. We don't want to add it multiple times
      /*The event listener function calls checkCollision with the mouse click coordinates and the current rectangle information*/
      canvas.addEventListener("click", (e) => {
        var pos = {
          x: e.offsetX,
          y: e.offsetY,
        };
        checkCollision(pos, currentRect);
      });
      firstTime = false;
    }
  } //once the array is done, the experiment is finished
  else {
    document.getElementById("text").innerHTML = "Fitts 1D task finished";
    document.body.style.background = "black";
    document.getElementById("btnResults").style.visibility = "visible";
    document.getElementById("back").style.visibility = "visible";
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clear the canvas
  }
}

/*recursive function that makes sure that the distance between the previous rectangle and the current rectangle is at least 30px*/
function safeDistance(curr, prev) {
  var prevMidPoint = (prev.x + prev.width) / 2;
  var currMidPoint = (curr.x + curr.width) / 2;
  if (Math.abs(prevMidPoint - currMidPoint) >= 30) return curr.x;
  else {
    var temp = curr;
    temp.x = generatePosition(curr.width);
    return safeDistance(temp, prev);
  }
}

/*checks if the participant clicked inside a rectangle*/
function checkCollision(pointerPos, rectangle) {
  if (
    pointerPos.x >= rectangle.x &&
    pointerPos.x <= rectangle.x + rectangle.width &&
    pointerPos.y >= rectangle.y &&
    pointerPos.y <= rectangle.y + rectangle.height
  ) {
    //if click is inside rectangle ...
    var currentTime = new Date().getTime(); // get the current time
    ctx.clearRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height); //delete the rectangle from canvas
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height); //reset the canvas style
    drawLine(); //draw the line again
    var device = isMobile() ? "Smartphone" : "PC"; //obtain device type

    var deltaTime = currentTime - timeRectAppear; //obtain time elapsed
    var resultObj;
    if (previousRect == null) {
      //if this is the first rectangle...
      //the resultObj will have id 1 and no previous rectangle and no distance. This item will be the origin.
      resultObj = {
        id: ++rectId,
        timeElapsed: deltaTime,
        currentRectangle: currentRect,
        previousRectangle: null,
        distance: null,
        device: device,
      };
    } else {
      //set up all information for the resultObj
      resultObj = {
        id: ++rectId,
        timeElapsed: deltaTime,
        currentRectangle: currentRect,
        previousRectangle: previousRect,
        distance: Math.abs(
          (currentRect.x + currentRect.width) / 2 -
            (previousRect.x + previousRect.width) / 2
        ), //distance from the middle point of the rectangles
        device: device,
      };
    }
    results.push(resultObj); //insert resultObj to results array

    drawSquares(); //draw the next rectangle
  }
}

/*displays the results array as a JSON string which later can be parsed in an online tool for further analysis*/
function showResults() {
  // document.getElementById("txtResults").style.visibility = "visible";
  document.getElementById("btnCopy").style.visibility = "visible";
  document.getElementById("download").style.visibility = "visible";
  var textField = document.getElementById("txtResults");
  var jsonOutput = JSON.stringify(results, null, 2);
  // Parse JSON
  const data = JSON.parse(jsonOutput);

  // Prepare the text content
  let textContent = "";

  // get radio button data
  var handDominance = getRadioValue("hand-dominance");
  var pointingDevice = getRadioValue("pointing-device");
  var deviceExpereience = getRadioValue("device-experience");

  textContent += `Hand Dominance : ${handDominance}\n`;
  textContent += `Pointing Experience : ${pointingDevice}\n`;
  textContent += `Device Experience : ${deviceExpereience}\n`;

  // Iterate over each object in the data array
  data.forEach((obj) => {
    textContent += `Rectangle ID: ${obj.id}\n`;
    textContent += `Time Elapsed: ${obj.timeElapsed}\n`;
    textContent += "Current Rectangle:\n";
    textContent += `  x: ${obj.currentRectangle.x}\n`;
    textContent += `  y: ${obj.currentRectangle.y}\n`;
    textContent += `  color: ${obj.currentRectangle.color}\n`;
    textContent += `  width: ${obj.currentRectangle.width}\n`;
    textContent += `  height: ${obj.currentRectangle.height}\n`;
    textContent += "Previous Rectangle:\n";
    textContent += `  x: ${obj.previousRectangle.x}\n`;
    textContent += `  y: ${obj.previousRectangle.y}\n`;
    textContent += `  color: ${obj.previousRectangle.color}\n`;
    textContent += `  width: ${obj.previousRectangle.width}\n`;
    textContent += `  height: ${obj.previousRectangle.height}\n`;
    textContent += `Distance: ${obj.distance}\n`;
    textContent += `Device: ${obj.device}\n`;
    textContent += "---------------------\n\n\n\n\n\n";
  });

  // Add spaces to the text content
  textContent = textContent.replace(/\n/g, "\n\n");

  console.log(handDominance, pointingDevice, ".........");
  localStorage.setItem("tempData", textContent);
  textField.value = textContent;
  textField.style.color = "black";
}

/*copy the results to the clipboard*/
function copytoClipboard() {
  /* Get the text field */
  var copyText = document.getElementById("txtResults");

  /* Select the text field */
  copyText.select();

  /* Alert the copied text */
  alert("Copied !!!!");
}

/*determines if it's a mobile browser*/
function isMobile() {
  return (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
    navigator.userAgent.match(/Opera Mini/i) ||
    navigator.userAgent.match(/IEMobile/i)
  );
}
