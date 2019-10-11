
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
    text("started", 10, 40);
      startTimer()
  }
  if(keyCode === 13){
    submit();
    }
  return false; // prevent default
}







const s = ( sketch ) => {
  sketch.setup = () => {
    var canvasOverlay = sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    canvasOverlay.parent('sketch-holder');
    sketch.stroke(255,255,255);
  }






  sketch.draw = () => {
    elapsedTime = Date.now() - startTime;
    currentWriting = false;

    // Draw the line on the screen
    if (sketch.mouseIsPressed) {
      sketch.line(sketch.mouseX , sketch.mouseY, sketch.pmouseX , sketch.pmouseY);
      currentWriting = true;
    }

    // During the form Section, create an array out of the coordinate data
    if (started && finished == false){
      var singleDataPoint =[sketch.mouseX,sketch.mouseY,elapsedTime, currentWriting, dateTime];
      data.push(singleDataPoint);
      console.log("mouseX "+ sketch.mouseX+" ; MouseY" + sketch.mouseY);
    }
  }
}
let myp5 = new p5(s);













// startButton.onclick = function(){
//   welomeScreen.parentNode.removeChild(welomeScreen);
//   var drawPractice = document.createElement("h1");
//   drawPractice.setAttribute("id", "connectDotsText");
//   drawPractice.appendChild(document.createTextNode(""));
//   sketchHolder.appendChild(drawPractice);

//   var img = document.createElement('img');
//   // img.src = 'img/image.png'; 
//   img.setAttribute("id", "connect-dots-image");
//   sketchHolder.appendChild(img);

//   nextButton = document.createElement("button");
//   nextButton.setAttribute("id", "next-button");
//   nextButton.appendChild(document.createTextNode("Next"));
//   sketchHolder.appendChild(nextButton);


//   nextButton.onclick = function(){
//     var headerText = document.getElementById("connectDotsText")

//     if (screenNumber == 1){
//       myp5.clear();
//       headerText.textContent ="Great work! Now write your name";
//       var connectDotsImage = document.getElementById("connect-dots-image")
//       connectDotsImage.parentNode.removeChild(connectDotsImage);

//     }

//     else if (screenNumber == 2){
//       myp5.clear();
//       headerText.parentNode.removeChild(headerText);
//       var formInstructions = document.createElement("p");
//       formInstructions.setAttribute("id", "form-instructions");
//       formInstructions.appendChild(document.createTextNode("In the following section you will be asked to complete a form. Hit next to continue"));
//       sketchHolder.appendChild(formInstructions);
//       myp5.stroke(0, 51, 102);
//     }
//     else if (screenNumber == 3){
//       myp5.clear();
//       var formInstructions = document.getElementById("form-instructions")
//       formInstructions.parentNode.removeChild(formInstructions);
//       form = document.getElementById('background-image');
//       form.innerHTML= '<img src="forms/' + formImage[formNumber]+'">';
//       startTimer();
//     }
//     else if (screenNumber == 4){
//       submit();
//       myp5.clear();
//       var formInstructions = document.createElement("p");
//       formInstructions.setAttribute("id", "form-instructions");
//       formInstructions.appendChild(document.createTextNode("Thank you for participating - please see attendent"));
//       sketchHolder.appendChild(formInstructions);
//       nextButton.parentNode.removeChild(nextButton);
//       myp5.remove();
//       var backgroundImage= document.getElementById("background-image")
//       backgroundImage.parentNode.removeChild(backgroundImage);
//     }
//     screenNumber++
//   }

// };


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

