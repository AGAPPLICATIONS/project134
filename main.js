img="";
status1="";
objects=[];

function preload(){
    x= loadSound("alarm.mp3");
}
function setup(){
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start(){
    objectdetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status:Detecting baby";
}
function modelloaded(){
    console.log("Model is Loaded");
    status1=true;
   
}
function gotresults(error,results){
if(error){
    console.log(error);
}else{
    console.log(results);
    objects=results;
}
}
function draw(){
 image(video,0,0,380,380);
 if (status1 != "") {
    objectdetector.detect(video,gotresults);
    r=random(255);
    g=random(255);
    b=random(255);
    for ( i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status:Child Not Detected YET";
      
      x.play();
      fill(r,g,b);
      percent= floor(objects[i].confidence *100);
      text(objects[i].label+" "+percent+"%",objects[i].x,objects[i].y);
      noFill();
      stroke(r,g,b);
      rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
      if(objects[i].label == "person"){
      document.getElementById("status").innerHTML = "Status:Child Detected";
      x.stop();
      
      }else{
        document.getElementById("status").innerHTML = "Status:Child NOT Detected";
        x.play();
      }
        
    }
 }
}