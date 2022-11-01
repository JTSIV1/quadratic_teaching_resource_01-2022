let UNITSIZE = 20;
let WINX = 17 * UNITSIZE;
let WINY = 17 * UNITSIZE;
let CANVASX = 30 * UNITSIZE;
let CANVASY = 28 * UNITSIZE;
let pixelX, pixelY;
let x0, x1, x2;
let xMin, xMax, yMin, yMax;
let xInt, yInt, vertex;
let axis;
let factored, vertexF, discrim;
let helpMenu;

function setup() {
  createCanvas(CANVASX, CANVASY);
  
  let ranInput = '' + round(random(-2, 2));
  if(ranInput == 0){
    ranInput = '' + 1;
  }
  x2Inp = createInput(ranInput);
  x2Inp.position(WINX + 3.5 * UNITSIZE, 2.8 * UNITSIZE);
  x2Inp.size(20);
  
  ranInput = '' + round(random(-2, 2));
  x1Inp = createInput(ranInput);
  x1Inp.position(WINX + 6.8 * UNITSIZE, 2.8 * UNITSIZE);
  x1Inp.size(20);
  
  ranInput = '' + round(random(-2, 2));
  x0Inp = createInput(ranInput);
  x0Inp.position(WINX + 9.9 * UNITSIZE, 2.8 * UNITSIZE);
  x0Inp.size(20);
  
  xIntCB = createCheckbox('Mark X - Intercept(s)', false);
  xIntCB.changed(updateXInt);
  xIntCB.position(WINX + 1.8 * UNITSIZE, 4.4 * UNITSIZE);
  
  yIntCB = createCheckbox('Mark Y - Intercept', false);
  yIntCB.changed(updateYInt);
  yIntCB.position(WINX + 1.8 * UNITSIZE, 5.8 * UNITSIZE);
  
  vertexCB = createCheckbox('Mark Vetrex', false);
  vertexCB.changed(updateVertex);
  vertexCB.position(WINX + 1.8 * UNITSIZE, 7.2 * UNITSIZE);
  
  axisCB = createCheckbox('Mark Axis of Symmetry', false);
  axisCB.changed(updateAxis);
  axisCB.position(WINX + 1.8 * UNITSIZE, 8.6 * UNITSIZE);
  
  vertexFCB = createCheckbox('Express in Vetrex Form', false);
  vertexFCB.changed(updateVertexF);
  vertexFCB.position(WINX + 1.8 * UNITSIZE, 10 * UNITSIZE);
  
  factoredCB = createCheckbox('Express in Factored Form', false);
  factoredCB.changed(updateFactored);
  factoredCB.position(WINX + 1.8 * UNITSIZE, 11.4 * UNITSIZE);
  
  discrimCB = createCheckbox('Show Discriminant', false);
  discrimCB.changed(updateDiscrim);
  discrimCB.position(WINX + 1.8 * UNITSIZE, 12.8 * UNITSIZE);
  
  xMinInp = createInput('' + -5);
  xMinInp.position(WINX + 5 * UNITSIZE, 15.8 * UNITSIZE);
  xMinInp.size(20);
  
  xMaxInp = createInput('' + 5);
  xMaxInp.position(WINX + 5 * UNITSIZE, 17.3 * UNITSIZE);
  xMaxInp.size(20);
  
  yMinInp = createInput('' + -5);
  yMinInp.position(WINX + 10 * UNITSIZE, 15.8 * UNITSIZE);
  yMinInp.size(20);
  
  yMaxInp = createInput('' + 5);
  yMaxInp.position(WINX + 10 * UNITSIZE, 17.3 * UNITSIZE);
  yMaxInp.size(20);
  
  restartB = createButton('Reset');
  restartB.position(20 * UNITSIZE, WINY + 8 * UNITSIZE);
  restartB.mousePressed(restart);
  
  printB = createButton('Print');
  printB.position(22.7 * UNITSIZE, WINY + 8 * UNITSIZE);
  printB.mousePressed(print);
  
  helpB = createButton('Toggle Help');
  helpB.position(25 * UNITSIZE, WINY + 8 * UNITSIZE);
  helpB.mousePressed(help);
  
  helpMenu = false; xInt = false; yInt = false; vertex = false; axis = false; factored = false; vertexF = false; discrim = false;
}

function restart(){
  removeElements();
  setup();
}

function updateXInt(){
  xInt = !xInt;
}

function updateYInt(){
  yInt = !yInt;
}

function updateVertex(){
  vertex = !vertex;
}

function updateAxis(){
  axis = !axis;
}

function updateFactored(){
  factored = !factored;
}

function updateVertexF(){
  vertexF = !vertexF;
}

function updateDiscrim(){
  discrim = !discrim;
}

function draw() {
  background(220);
  fill(255);
  stroke(1);
  strokeWeight(1);
  rect(UNITSIZE, UNITSIZE, WINX, WINY, 1);
  
  strokeWeight(0.5);
  stroke(0);
  textSize(10);
  fill(0);
  drawAxisLines();
  strokeWeight(3);
  drawFunction();
  
  strokeWeight(0);
  fill(0);
  textSize(25);
  text('Graph Options:', WINX + 2 * UNITSIZE, 2 * UNITSIZE);
  
  textSize(18);
  text('Y =', WINX + 2 * UNITSIZE, 3.6 * UNITSIZE);
  text('x  +', WINX + 5.2 * UNITSIZE, 3.6 * UNITSIZE);
  text('x +', WINX + 8.4 * UNITSIZE, 3.6 * UNITSIZE);
  textSize(10);
  text('2', WINX + 5.7 * UNITSIZE, 3.2 * UNITSIZE);
  
  x2 = int(x2Inp.value());
  x1 = int(x1Inp.value());
  x0 = int(x0Inp.value());
  
  textSize(25);
  text('Window Options:', WINX + 2 * UNITSIZE, 15.1 * UNITSIZE);
  textSize(18);
  text('Min X:', WINX + 2 * UNITSIZE, 16.6 * UNITSIZE);
  text('Max X:', WINX + 2 * UNITSIZE, 18.1 * UNITSIZE);
  text('Min Y:', WINX + 7 * UNITSIZE, 16.6 * UNITSIZE);
  text('Max Y:', WINX + 7 * UNITSIZE, 18.1 * UNITSIZE);
  
  xMin = int(xMinInp.value());
  xMax = int(xMaxInp.value());
  yMin = int(yMinInp.value());
  yMax = int(yMaxInp.value());
  pixelX = (xMax - xMin) / WINX;
  pixelY = (yMax - yMin) / WINY;
  
  textSize(22);
  text('Standard Form:', 1.5 * UNITSIZE, WINY + 3 * UNITSIZE);
  textSize(15);
  text(displayStandard(), 1.5 * UNITSIZE, WINY + 4.2 * UNITSIZE);
  
  textSize(22);
  text('Vertex Form:', 1.5 * UNITSIZE, WINY + 6 * UNITSIZE);
  textSize(15);
  if(vertexF){
    text(displayVertexF(), 1.5 * UNITSIZE, WINY + 7.2 * UNITSIZE);
  }
  
  discrim1 = (x1 * x1) - (4 * x2 * x0);
  
  textSize(22);
  text('Factored Form:', 1.5 * UNITSIZE, WINY + 9 * UNITSIZE);
  textSize(15);
  if(factored){
    text(displayFactored(), 1.5 * UNITSIZE, WINY + 10.2 * UNITSIZE);
  }
  
  textSize(22);
  text('Discriminant:', 11 * UNITSIZE, WINY + 9 * UNITSIZE);
  textSize(15);
  if(discrim){
    text('Δ = ' + discrim1, 11 * UNITSIZE, WINY + 10.2 * UNITSIZE);
  }
  
  textSize(22);
  text('Y-Intersect:', 11 * UNITSIZE, WINY + 3 * UNITSIZE);
  textSize(15);
  if(yInt){
    text('(0, ' + x0 + ')', 11 * UNITSIZE, WINY + 4.2 * UNITSIZE);
    if(0 > xMin && 0 < xMax && x0 > yMin && x0 < yMax){
      fill(255, 255, 0);
      strokeWeight(2);
      circle(UNITSIZE - xMin / pixelX, UNITSIZE + (yMax - x0) / pixelY, 15);
    }
  }
  fill(255, 255, 0);
  strokeWeight(2);
  circle(0.2 * UNITSIZE + WINX, WINY + 2.65 * UNITSIZE, 15);
  
  stroke(0, 0, 155);
  strokeWeight(3);
  
  let dash = WINY / 21;
  let tempX = (-1 * x1) / (2 * x2);
  if(axis){
    for(let i = 0; i < 21; i = i + 2){
      line(UNITSIZE + (tempX - xMin) / pixelX, UNITSIZE + i * dash, UNITSIZE + (tempX - xMin) / pixelX, UNITSIZE + (i + 1) * dash);
    }
  }
  
  fill(0);
  strokeWeight(0);
  stroke(0);
  
  textSize(22);
  text('Vertex:', 11 * UNITSIZE, WINY + 6 * UNITSIZE);
  textSize(15);
  let tempVert = '(' + round(tempX, 3) + ', ' + round(calcQuad(tempX), 3) + ')';
  if(vertex){
    text(tempVert, 11 * UNITSIZE, WINY + 7.2 * UNITSIZE);
    fill(255, 0, 0);
    strokeWeight(2);
    if(tempX < xMax && tempX > xMin && calcQuad(tempX) < yMax && calcQuad(tempX) > yMin)
    circle(UNITSIZE + (tempX - xMin) / pixelX, UNITSIZE + (yMax - calcQuad(tempX)) / pixelY, 15);
    
  }
  fill(255, 0, 0);
  strokeWeight(2);
  circle(15 * UNITSIZE, WINY + 5.65 * UNITSIZE, 15);
  fill(0);
  strokeWeight(0);
  
  textSize(22);
  text('X-Intersect 1:', 20.5 * UNITSIZE, WINY + 3 * UNITSIZE);
  textSize(15);
  if(xInt){
    if(x2 == 0){
      text('x² coefficient is 0', 20.5 * UNITSIZE, WINY + 4.2 * UNITSIZE);
    }else if(discrim1 < 0){
      text('no root', 20.5 * UNITSIZE, WINY + 4.2 * UNITSIZE);
    }else{
      let temp = round((-1 * x1 + sqrt(discrim1)) / (2 * x2), 3);
      text('(' + temp + ', 0)', 20.5 * UNITSIZE, WINY + 4.2 * UNITSIZE);
      fill(0, 0, 255);
      strokeWeight(2);
      if(0 > yMin && 0 < yMax && temp > xMin && temp < xMax){
        circle(UNITSIZE + (temp - xMin) / pixelX, UNITSIZE + yMax / pixelY, 15);
      }
    }
  }
  fill(0, 0, 255);
  strokeWeight(2);
  circle(10.7 * UNITSIZE + WINX, WINY + 2.65 * UNITSIZE, 15);
  fill(0);
  strokeWeight(0);
  
  textSize(22);
  text('X-Intersect 2:', 20.5 * UNITSIZE, WINY + 6 * UNITSIZE);
  textSize(15);
  if(xInt){
    if(x2 == 0){
      text('x² coefficient is 0', 20.5 * UNITSIZE, WINY + 7.2 * UNITSIZE);
    }else if(discrim1 <= 0){
      text('no root', 20.5 * UNITSIZE, WINY + 7.2 * UNITSIZE);
    }else{
      let temp = round((-1 * x1 - sqrt(discrim1)) / (2 * x2), 3);
      text('(' + temp + ', 0)', 20.5 * UNITSIZE, WINY + 7.2 * UNITSIZE);
      if(0 > yMin && 0 < yMax && temp > xMin && temp < xMax){
        fill(0, 255, 0);
        strokeWeight(2);
        circle(UNITSIZE + (temp - xMin) / pixelX, UNITSIZE + yMax / pixelY, 15);
      }
    }
  }
  fill(0, 255, 0);
  strokeWeight(2);
  circle(10.7 * UNITSIZE + WINX, WINY + 5.65 * UNITSIZE, 15);
  
  if(helpMenu){
    drawHelp();
  }
}

function displayStandard(){
  let tempText = 'Y = '; 
  if(x2 != 0){
    if(x2 != 1 && x2 != -1){
      tempText += x2;
    }else if(x2 == -1){
      tempText += '-';
    }
    tempText += 'x² ';
  }
  if(x1 != 0){
    if(tempText == 'Y = '){
      if(x1 == 1 || x1 == -1){
        if(x1 == -1){
          tempText += '- x ';
        }else{
          tempText += 'x ';
        }
      }else if(x1 < 0){
        tempText += '- ' + (0 - x1) + 'x ';
      }else{
        tempText +=  x1 + 'x ';
      }
    }else{
      if(x1 == 1 || x1 == -1){
        if(x1 == -1){
          tempText += '- x ';
        }else{
          tempText += '+ x ';
        }
      }else if(x1 < 0){
        tempText += '- ' + (0 - x1) + 'x ';
      }else{
        tempText += '+ ' + x1 + 'x ';
      }
    }
  }
  if(x0 != 0){
    if(tempText == 'Y = '){
      if(x0 < 0){
        tempText += '-' + (0 - x0);
      }else{
        tempText += x0;
      }
    }else{
      if(x0 < 0){
        tempText += '- ' + (0 - x0);
      }else{
        tempText += '+ ' + x0;
      }
    }
  }
  return tempText;
}

function displayVertexF(){
  if(x2 == 0){
    return 'x² coefficient is 0'
  }
  let tempText = 'Y = ';
  
  let a = x2;
  let h = round((-1 * x1) / (2 * x2), 2);
  let k = round(calcQuad(h),2);
  
  if(a < 0){
    tempText += '-';
    a = 0 - a;
  }
  if(a == 1){
    tempText += '(x ';
  }else{
    tempText += a + '(x ';
  }
  
  if(h < 0){
    tempText += '+ ';
    h = 0 - h;
  }else{
    tempText += '- ';
  }
  tempText += h + ')² ';
  
  if(k != 0){
    if(k < 0){
      k = 0 - k;
      tempText += '- ' + k;
    }else{
      tempText += '+ ' + k;
    }
  }
  
  return tempText;
}

function displayFactored(){
  if(x2 == 0){
    return 'x² coefficient is 0'
  }
  
  if(discrim1 < 0){
    return 'no real roots'
  }
  
  let tempText = 'Y = ';
  
  if(x2 == -1){
    tempText += '-';
  }else if(x2 != 1){
    tempText += x2;
  }
  
  if(discrim1 == 0){
    let tempSol = (-1 * x1) / (2 * x2);
    if(tempSol == 0){
      tempText += 'x²';
    }else if(tempSol < 0){
      tempText += '(x + ' + (0 - tempSol) +')²';
    }else{
      tempText += '(x - ' + tempSol +')²';
    }
  }else{
    let tempSol1 = (-1 * x1 + sqrt(discrim1)) / (2 * x2);
    let tempSol2 = (-1 * x1 - sqrt(discrim1)) / (2 * x2);
    if(tempSol1 == 0 || tempSol2 == 0){
      tempText += 'x';
    }
    if(tempSol1 < 0){
      tempText += '(x + ' + round(0 - tempSol1, 2) +')';
    }else if(tempSol1 > 0){
      tempText += '(x - ' + round(tempSol1, 2) +')';
    }
    if(tempSol2 < 0){
      tempText += '(x + ' + round(0 - tempSol2, 2) +')';
    }else if(tempSol2 > 0){
      tempText += '(x - ' + round(tempSol2, 2) +')';
    }
  }
  
  return tempText;
}

function drawAxisLines(){
  // X Lines
  let xAxis = getAxisList(xMin, xMax);
  for (let i = 1; i < xAxis.length; i++) {
    if (xAxis[i] == 0) {
      strokeWeight(1.5);
    }
    let xCoord = UNITSIZE + (((xMax - xMin) - (xMax - xAxis[i])) / pixelX);
    line(xCoord, UNITSIZE, xCoord, UNITSIZE + WINY);
    text(round(xAxis[i], 1), xCoord - 3, WINY + 1.5 * UNITSIZE);
    strokeWeight(0.5);
  }
  
  // Y Lines
  let yAxis = getAxisList(yMin, yMax);
  for (let i = 1; i < yAxis.length; i++) {
    if (yAxis[i] == 0) {
      strokeWeight(1.5);
    }
    let yCoord = UNITSIZE + ((yMax - yAxis[i]) / pixelY);
    line(UNITSIZE, yCoord, UNITSIZE + WINY, yCoord);
    text(round(yAxis[i], 1), 2, yCoord + 3);
    strokeWeight(0.5);
  }
}

function getAxisList(min, max){
  let result = [];
  min = round(min);
  let range = max - min;
  if (range <= 2) {
    for (let i = 0; i < range; i += 0.1) {
      result.push(min + round(i, 1));
    }
  } else if (range <= 30) {
    for (let i = 0; i < range; i++) {
      result.push(min + i);
    }
  } else if (range <= 120) {
    for (let i = 0; i < range; i++) {
      if ((min + i) % 5 == 0) {
        result.push(min + i);
      }
    }
  } else {
    for (let i = 0; i < range; i++) {
      if ((min + i) % 10 == 0) {
        result.push(min + i);
      }
    }
  }
  return result;
}

// precondition: x0, x1, and x2 and input are defined
// postcondition: returns a double 
function calcQuad(input){
  let result = 0;
  result += x0;
  result += x1 * input;
  result += x2 * pow(input, 2);
  return result;
}

function drawFunction(){
  let quad = [];
  for(let i = 0; i < WINX; i++){
	quad.push(calcQuad(xMin + i * pixelX));
  }
  
  let toDraw = yToPixel(quad);
  
  for (let i = 0; i < toDraw.length - 1; i++) {
    if (toDraw[i] != -1 && toDraw[i + 1] != -1) {
      line(UNITSIZE + i, UNITSIZE + (WINY - toDraw[i]), UNITSIZE + i + 1, UNITSIZE + (WINY - toDraw[i + 1]));
    } else if (toDraw[i] != -1 && toDraw[i + 1] == -1) {
      if (quad[i + 1] < yMin) {
        line(UNITSIZE + i, UNITSIZE + (WINY - toDraw[i]), UNITSIZE + i + 1, UNITSIZE + WINY);
      } else {
        line(UNITSIZE + i, UNITSIZE + (WINY - toDraw[i]), UNITSIZE + i + 1, UNITSIZE);
      }
    } else if (toDraw[i] == -1 && toDraw[i + 1] != -1) {
      if (quad[i] < yMin) {
        line(UNITSIZE + i, UNITSIZE + WINY, UNITSIZE + i + 1, UNITSIZE + (WINY - toDraw[i + 1]));
      } else {
        line(UNITSIZE + i, UNITSIZE, UNITSIZE + i + 1, UNITSIZE + (WINY - toDraw[i + 1]));
      }
    }
  }
}

// precondition: arr[] is an array of doubles and yMin, yMax, pixelY
// postcondition: returns an array of doubles the same length of arr[] and the pixel coordinates are relative to the graph’s origin, not the program origin
function yToPixel(arr){
  let result = [];
  for(i = 0; i < arr.length; i++){
	if (arr[i] > yMax || arr[i] < yMin){
			result.push(-1); // indicates an out of domain value  
    }else{
	  result.push((arr[i] - yMin) / pixelY);
    }
  }
  return result;
}

// precondition: num is a double and xMin, xMax, pixelX
// postcondition: returns a double that is the pixel value of the inputted X
// pc: the pixel coordinates are relative to the graph’s origin, not the program origin
function xToPixel(num){
  let result;
  if (num > xMax || num < xMin){
          result = -1; // indicates an out of domain value
  }else{
  result = (num - xMin) / pixelX;
  }
return result;
}

// precondition: the user has indicated that the axis should be drawn and axis is true, x1 and x2 are defined
// postcondition: plots the axis of symmetry on the graph and returns void
function drawAxisS(){
  let temp = -x1 / (2 * x2);
  let temp1 = xToPixel(temp) + UNITSIZE;
  line(temp1, UNITSIZE, temp1, WINY + UNITSIZE);
  //display “x = “ + temp as the equation of the axis of symmetry
}

function help(){
  helpMenu = !helpMenu;
}

function drawHelp(){
  fill(255);
  stroke(1);
  strokeWeight(1);
  rect(0.5 * UNITSIZE, 0.5 * UNITSIZE, WINX + 1.2 * UNITSIZE, WINY + 3.5 * UNITSIZE, 1);
  
  strokeWeight(0);
  fill(0);
  textSize(25);
  text('Help Menu:', UNITSIZE, 2 * UNITSIZE);
  textSize(14);
  text('1. Enter your quadratic (in standard form) in the input ', UNITSIZE, 3 * UNITSIZE);
  text('boxes next to "Y =" (a, b, and c must be integers).', UNITSIZE, 3.9 * UNITSIZE);
  
  text('2. Tick the checkboxes of elements you would like to be ', UNITSIZE, 5 * UNITSIZE);
  text('displayed. The first four boxes starting with "Mark" will ', UNITSIZE, 5.9 * UNITSIZE);
  text('label the corresponding element on the graph and its ', UNITSIZE, 6.8 * UNITSIZE);
  text('coordinate (or equation) below the graph. You may have ', UNITSIZE, 7.7 * UNITSIZE);
  text('to adjust the window to see the elements. The next three ', UNITSIZE, 8.6 * UNITSIZE);
  text('checkboxes will display the corresponding equation ', UNITSIZE, 9.5 * UNITSIZE);
  text('below the graph when checked on.', UNITSIZE, 10.4 * UNITSIZE);
  
  text('3. Use the number entry boxes under window options to ', UNITSIZE, 11.5 * UNITSIZE);
  text('define the maximum and minimum integer values for X ', UNITSIZE, 12.4 * UNITSIZE);
  text('and Y of the window.', UNITSIZE, 13.3 * UNITSIZE);
  
  text('4. Use the buttons on the bottom right of the app for a ', UNITSIZE, 14.4 * UNITSIZE);
  text('variety of functions. "Reset" will reset the app to default ', UNITSIZE, 15.3 * UNITSIZE);
  text('settings with a random quadratic. "Print" will open the ', UNITSIZE, 16.2 * UNITSIZE);
  text('print menu where you can print the graph to a PDF or ', UNITSIZE, 17.1 * UNITSIZE);
  text('print otherwise. "Toggle Help" is used to open and close ', UNITSIZE, 18 * UNITSIZE);
  text('this help menu.', UNITSIZE, 18.9 * UNITSIZE);
  
  text('Press the "Toggle Help" button to exit.', UNITSIZE, 20.3 * UNITSIZE);
}
  