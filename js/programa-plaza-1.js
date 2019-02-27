let a = [];
let tamany =[6,6,6,6,6];
let ample =[20,200,20,10,200];
let alt=[20,50,80,10,140];
let paleta=['#00FFFF','#00FFFF', '#00FFFF', '#00FFFF','#00FFFF'];
let espaix=[30,30,30,30,40];
let espaiy=[50,50,50,50,50];
let grossor=[1,2,3,4,5];
let velocitat=[0.5,1,0.2,3,2];
let gx=[1,0.2,0.12,0.4,0.08];
let wx=[0.1,0.2,0.3,0.25,0.4];
let wind;
let gravity;

function setup(){
	createCanvas(192,157);
	background(255);
	for(let i=0; i<5; i=i+1 ){
		a.push(new Antena());
	}
}
function draw(){

	let gravity=new createVector(1,1);

	for(let i=0; i<a.length; i=i+1){
		wind= createVector(wx[i],wx[i]);
		gravity= createVector(gx[i],gx[i]);
		a[i].update();
		a[i].applyForce(wind);
		a[i].applyForce(gravity);
		a[i].display(tamany[i], ample[i], espaix[i], alt[i], espaiy[i], paleta[i], 1);
		a[i].checkEdges();
	}
}
class Antena{
	constructor(){
		this.mass=5;
		this.position= new createVector(30,5);
		this.velocity= new createVector(-1, 1);
		this.acceleration= new createVector(5,5);
	}
	applyForce(force){
		var f= p5.Vector.div(force, this.mass);
		this.acceleration.add(f);
	}
	update(vel){
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
		this.acceleration.mult(0);
				
	}

	display(t,ampr, sx, altr, sy, c, g){
		stroke(c);
		strokeWeight(g);
		for(var posx=0; posx<ampr; posx=posx+sx){
			for(var posy=0; posy<altr; posy=posy+sy){
				push();
				translate(posx+this.position.x-ampr,posy+this.position.y-altr);
					fill(255,0,140);
					ellipse(t*12,t*16,t*2,t*2);
					fill(249,255,51);
           			ellipse(t*8,t*14,t*2,t*2);
           			fill(57,255,51);
            		ellipse(t*4,t*12,t*2,t*2)
				pop();
			}
		}
	}
	checkEdges(){
		if(this.position.x>width){
			this.position.x=width;
			this.velocity.x= this.velocity.x*-1;
		}else if(this.position.x<0){
			this.position.x=0;
			this.velocity.x=this.velocity.x*-1;
		}
		if(this.position.y>height){
			this.position.y=height;
			this.velocity.y*=-1;
		}else if(this.position.y<-100){
			this.position.y=-50;
			this.velocity.y*=-1;
		}
	}
}