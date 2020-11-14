function preLoad(){
}

function setup() {
    canvas = createCanvas(640, 480);
    canvas.position(150, 150);
    video = createCapture(VIDEO);
    video.hide();
}

function draw () {
    image(video, 0, 0, 640, 480);
}

function take_snapshot(){
    save('homie.png');
}

//some code in canvas that generates a lot of colorful circles in random positions on the screen
var canvas=document.getElementsByTagName('canvas')[0];
//set the width and height of canvas element
canvas.width=window.innerWidth;
canvas.height=window.innerHeight;
//get the 2d context
var c=canvas.getContext('2d');
//...........................................//
//function to generate random hex colors
var minRadius=5;
var maxRadius=40;
//using this event listener the width and height of the canvas peice will be the same as the window when we resize it
//also it will call a function to spawn new balls to fill the white spaces
window.addEventListener('resize',function(){
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
	init();
})
//decided not to use this random color generating function :)
//var color=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];//all charcters used in hex system
//function colorPick(){
	//var result='';
	//for(var i=0;i<6;i++){
	//	var a=Math.floor(Math.random()*color.length);
	//	result+=color[a];
	//}
	//return '#'+result;
//}
var colors=['#F24236','#2AB7CA','#220C10','#2E86AB','#F78764','#333745','#FAF0CA'];
//the mouse object will hold the mouse x and y on the browser window
var mouse={x:undefined,y:undefined}
window.addEventListener('mousemove',function(event){
	mouse.x=event.x;
	mouse.y=event.y;
})
function Circle(x,y,dx,dy,radius){
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.radius=radius;
	this.color=colors[Math.floor(Math.random()*colors.length)];
	this.draw=function(){
		c.beginPath();
		c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
		c.fillStyle=this.color; //passed the method that generates random colors as a value
		c.fill();
	}
	this.update=function(){
			this.x+=this.dx;
			this.y+=this.dy;
			if(this.x+this.radius>window.innerWidth||this.x-this.radius<0){this.dx= -this.dx}
			if(this.y+this.radius>window.innerHeight||this.y-this.radius<0){this.dy= -this.dy}
			if(mouse.x-this.x<50&&mouse.x-this.x>-50&&mouse.y-this.y<50&&mouse.y-this.y>-50){
				if(this.radius<maxRadius){this.radius+=2}//condition for preventing balls radius from surpassing spicific value
			}
			else if(this.radius>=minRadius){this.radius-=2}//condition for preventing balls to disappear
	this.draw();
	}
}
//.......................................//
//start drawing circles

var circleArr=[]; //this store all the circles in it
function init(){
	circleArr=[];
  // feel free to change 600 to any number you like
for(var z=0;z<1000;z++){ 
	circleArr.push(new Circle(Math.random()*window.innerWidth,Math.random()*window.innerHeight,(Math.random()-0.5)*8,(Math.random()-0.5)*8,minRadius))
 }
 for(var v=0;v<circleArr.length;v++){
 	circleArr[v].update()
 }}
 function animate(){
	requestAnimationFrame(animate)
	c.clearRect(0,0,innerWidth,innerHeight)
	for(var v=0;v<circleArr.length;v++){
 	circleArr[v].update()
 }

}
init()
animate()


