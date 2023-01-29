class Wave{
  constructor(amp,phase,c){
    this.amplitude = amp;
    this.phase = phase;
    this.color = c;
    
  }  
  calculate(x){
    return sin(this.phase + TAU * x/slider2.value())* this.amplitude;
  }
  display(){
   fill(this.color);
  }
}

let waves=[];
let r;
let button;
let canvas;
let slider;
let slider2;

let displayState = 0;

function setup() {
  console.log(windowWidth);
    if(windowWidth < 600){
    canvas = createCanvas(windowWidth, windowHeight);
  }else{
    canvas = createCanvas(600, 600);
  }
  rectMode(CENTER);

  canvas.parent("sketch-container");  
  
  addGUI();
  
  for(let i =0; i<5; i++){
  waves[i] =new Wave(random(0,height/6),random(0,TAU),color(190,77,46));
  } 
}

function draw() {
  background(27,49,142,20);
    stroke(240);
  strokeWeight(0.1);
  for(let i = 0 ; i < 2000; i++){
    point(random(width), random(height));
  }
  
  noStroke();  
  for(let x=0; x<width; x+=10){
    let y = 0;
    for(let wave of waves){
    y += wave.calculate(x);
      wave.display();
  }
    r=slider.value();
      if(displayState == 0){
     ellipse(x,y+height/2,30-r,r);
  }else{
     rect(x,y+height/2,30-r,r);
  }
  }

 for(let wave of waves){
   wave.phase+=0.1;
 }
}

function addGUI(){
  
  slider = createSlider(2,28,15);
  slider.addClass("slider");
  //Add the slider to the parent gui HTML element
  slider.parent("gui-container");
  
   
  slider2 = createSlider(10,100,50);
  slider2.addClass("slider");
  //Add the slider to the parent gui HTML element
  slider2.parent("gui-container");
  
  
  //add a button
  if(displayState == 0)
  {
      button = createButton("Change to Square");
  }else if(displayState == 1){
      button = createButton("Change to Circle");
  }

  button.addClass("button");

  //Add the play button to the parent gui HTML element
  button.parent("gui-container");
  
  //Adding a mouse pressed event listener to the button 
  button.mousePressed(handleButtonPress); 

}

function handleButtonPress()
{
    
  if(displayState < 1)
  {
    displayState++;
  }else{
    displayState = 0;
  }

  if(displayState == 0)
  {
      button.html("Change to Square");
  }else if(displayState == 1){
      button.html("Change to Circle");
  }
}


function windowResized() {

  if(windowWidth < 600){
    resizeCanvas(windowWidth, windowHeight);
  }else if(canvas.width != 600){
    resizeCanvas(600, 600);
  }
}