var bg = 0; //bg colour
var shapeColor = 255;
var circD = 215;
var boolbg = false;
var AOD = 'AO             Designs';
var contact = 'contact us here for \n your web design needs.';
var textColor = 255;
var BLD = 'LIGHTEST';
var rectbool = false;

// polygon array and number of verts
let poly = []
let n = 100 // feel free to play with this number :)
// canvas size variables
let w = 500
let h = 500
// oscillators
let chord = []
let root = 30
let major = [ 4, 5, 6 ]
let minor = [ 10, 12, 15 ]


function preload(){
	type = loadFont('IBMPlexMono-ExtraLight.ttf');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	//background(255);
	ellipseMode(CENTER);
	noStroke();
	smooth();
	textSize(50);
	textAlign(CENTER, CENTER);
	textFont(type);
	
	n++ // add extra point for closing the polygon
  for (let i = 0; i < n; i++) {
    // populate regular polygon vertices given number of points n
  	let a = {
      x: (width/2) + 50*sin(map(i, 0, n-1, 0, TAU)),
      y: (height/2-150) + 50*cos(map(i, 0, n-1, 0, TAU))
    }
  	poly.push(a)
  }
}

function draw() {
	var w2 = width/2;
	var h2 = height/2;
	blendMode(BLEND);
	background(bg);
	//drawing shapes:
	noStroke();
	fill(shapeColor);
	triangle(w2-325, h2-50, w2-225, h2-250, w2-100, h2-50);
	//ellipse(w2, h2-150, circD, circD);
	ellipse(w2+235, h2-150, 200, 200);
	rect(w2+135, h2-250, 100, 200);
	text(AOD, w2, h2+50 );
	fill(textColor);
	text(contact, w2, h2+250);
	stroke(shapeColor);
	strokeWeight(2.5);
	line(w2-250, 430, w2+95, 410);
	if (mouseX > w2-320 &&
		  mouseX < w2-345){
		shapeColor = (255, 255, 0);
	}else{
		shapeColor = shapeColor;
	}
	//change color
	if (boolbg == true){
		bg = 0;
		shapeColor = 255;
		textColor = 255;
		blendMode(LIGHTEST)
	}else if(boolbg == false){
	 	bg = 255;
		shapeColor = 0;
		textColor = 0;
		blendMode(MULTIPLY)
	}
	//noFill();
	//rect(w2-320, h2+200, 640, 125);
	
  stroke(255, 0, 0)
  drawPoly(1000, 1000)
  
  stroke(0, 255, 0)
  drawPoly(1200, 1500)
  
  stroke(0, 0, 255)
  drawPoly(2000, 1700)
	
	if (overRect(w2-320, h2+200, 640, 125)){
		rectbool = true;
		textColor = '#3dbd5d'
	}else{
		rectbool = false;
	}
}

function logMap(value, start1, stop1, start2, stop2) {
  // based off of linear regression + existing p5.map function
  
  start2 = log(start2)
  stop2 = log(stop2)
 
  return exp(start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1)))
}

function drawPoly(dx, dy) {
  // draws polygon given vertices in the poly[] array, adds mouse bias using params
  strokeWeight(120)
  let g = 0
  if (mouseIsPressed)
    g = random(-2, 2)
    
  beginShape()
  for (let i = 0; i < n; i++) {
  	let bias = dist(mouseX, mouseY, poly[i].x, poly[i].y)
  	vertex(poly[i].x + dx / logMap(bias, w, 0, dx, 45) + g, poly[i].y + dy / logMap(bias, h, 0, dy, 45) + g)
  }
  endShape()
}

function overRect(x, y, w, h) {
	if (mouseX > x && mouseX < x+w && mouseY > y && mouseY < y+h) {
	  return true;	
	} else {
	  return false;	
	}
}

function mouseClicked(){
	//var for dist calc
	var x1 = width/2;
	var y1 = height/2-150;
	var d = dist (mouseX, mouseY, x1, y1);
	if (d <= 100){
		boolbg = !boolbg;
	}
	if (rectbool == true){
		window.open("mailto:okirpane@gmail.com?Subject=Inquiry");
	}
}
