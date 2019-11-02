
var currentWriting;
var started = false;
var elapsedTime; // for keeping track of amount of time users are on the form page
var startTime; // the time they start
var finished = false;
var form;

var today = new Date();
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;

var isCounting = false

let data = [
  ["mouseX", "mouseY", "time", "is writing", "date"],
]; // Headers for the output data


function draw() {}
function keyPressed() {
  background('yellow');
//   text(`${key} ${keyCode}`, 10, 40);
//   print(key, ' ', keyCode);

  if(keyCode === 82){
    print(key);  

  }
  if(keyCode === 13){
    submit();
    }
  return false; // prevent default
}


const s = ( sketch ) => {
  sketch.setup = () => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;
    var canvasOverlay = sketch.createCanvas(windowWidth, windowHeight);
    canvasOverlay.parent('sketch-holder');
    sketch.stroke(255,255,255);
  }


  sketch.draw = () => {
    elapsedTime = Date.now() - startTime;
    currentWriting = false;
  isCounting2=isCounting;
    // Draw the line on the screen
    if (sketch.mouseIsPressed) {
      isCounting = true;

      sketch.line(sketch.mouseX , sketch.mouseY, sketch.pmouseX , sketch.pmouseY);
      currentWriting = true;
    }
    
    if (isCounting2 != isCounting){
      text("started", 10, 40);
      console.log("CHANGE")
      startTimer()
      
    }
    console.log(currentWriting);

    // During the form Section, create an array out of the coordinate data
    if (started && finished == false){
      var singleDataPoint =[sketch.mouseX,sketch.mouseY,elapsedTime, currentWriting, dateTime];
      data.push(singleDataPoint);
      console.log("mouseX "+ sketch.mouseX+" ; MouseY" + sketch.mouseY);
      
    }
  }
}
let myp5 = new p5(s);





function changeWindowSize() {
  myp5.remove();
  myp5 = new p5(s);
}


window.onresize = changeWindowSize;





// Starts a timer when user is on the form page
function startTimer() {
  if(started == false ){
    started = true;
    myp5.background(200, 200, 200, 0);
    startTime = Date.now();
  }
}





// Saves and downloads the data
function submit() {
  finished = true;
  let csvContent = "data:text/csv;charset=utf-8,"
  + data.map(e => e.join(",")).join("\n");
  var encodedUri = encodeURI(csvContent);
  var link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "stubs-data.csv");
  document.body.appendChild(link); // Required for FF
  link.click(); // This will download the data file named "my_data.csv".
}


