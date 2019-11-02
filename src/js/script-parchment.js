let started = false;
let elapsedTime; // for keeping track of amount of time users are on the form page
let startTime; // the time they start
let finished = false;
let currentWriting; //indicate if the pen is making contact to the page
let data = [ ["mouseX", "mouseY", "time", "is writing", "date"], ]; // Headers for the output data 
let dateTime 

function draw() {}
function keyPressed() {
  if(keyCode === 13){
    submit();
    myp5.drawingContext.clearRect(0, 0, 50,50);
    myp5.remove();
    location.reload(true);
    }
  return false; // prevent default
}


const s = ( sketch ) => {
  sketch.setup = () => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    let canvasOverlay = sketch.createCanvas(windowWidth, windowHeight); //create canvas the size of current window
    canvasOverlay.parent('sketch-holder'); //binds the canvas to a dom element
   
    sketch.stroke(255,255,255); //set color of pen stroke
    sketch.background(100, 100, 255); // set background color
  }


  sketch.draw = () => {
    elapsedTime = Date.now() - startTime; //calculates the difference between when the pen first hits the screen and now
    currentWriting = false; //defaults that the user is not writing

    // Draws the line on the screen
    if (sketch.mouseIsPressed) {
      startTimer();
      sketch.line(sketch.mouseX , sketch.mouseY, sketch.pmouseX , sketch.pmouseY);
      currentWriting = true;
    }
   
    // Draws counter on top of the screen;
   if(elapsedTime>1){
    drawingContext.clearRect(0, 0, 50,50);
    fill(255); //set color of counter
    text(elapsedTime, 10,10);
   }

    // Create an array out of the coordinate data
    if (started && finished == false){
      let singleDataPoint =[sketch.mouseX,sketch.mouseY,elapsedTime, currentWriting, startTime];
      data.push(singleDataPoint);
    }
  }
}

let myp5 = new p5(s);

// Adapts canvas size if window size changes
function changeWindowSize() {
  myp5.remove();
  myp5 = new p5(s);
}

window.onresize = changeWindowSize;

// Starts a timer when user is on the form page
function startTimer() {
  if(started == false ){
    started = true;
    startTime = Date.now();
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    dateTime = date+' '+time;
  }
}

// Saves and downloads the data
function submit() {
  finished = true;
  let csvContent = "data:text/csv;charset=utf-8,"
  + data.map(e => e.join(",")).join("\n");
  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "stubs-data-"+dateTime+".csv");
  document.body.appendChild(link); // Required for FF
  link.click(); // This will download the data file named "my_data.csv".
}


