var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let g = 0.08;
let u = -0.04;
let mi =0.04;
let time = 0;
let ax =1;
let VX = 5;
let VY= -7;
let h = 600; //altura do canvas
let c = 100; //tamanho do chão
let canos =[];
let buracos =[];
//para ficar no chão, Ty+Th tem que ser igual a 500
let mario = new Mario();
function criaCanos(){
	let cano1 = new Cano(-1, 500, 300, 100,"#8B5143");//-1 pro Mario não bugar
	let cano2 = new Cano(400, 500, 5000, 100,"#8B5143");
	let cano3 = new Cano(300, 150, 200, 100,"#00FF00");
	let cano4 = new Cano(600, 100, 200, 100,"#00FF00");
	canos.push(cano1,cano2,cano3,cano4)
    //console.log(canos);
}
function Cano(xC, yC, wC, hC, corC){
	this.x = xC;
	this.y = yC;
	this.w = wC;
	this.h = hC;
	this.cor = corC;
	this.draw =function(){
		ctx.beginPath();
		ctx.fillStyle = this.cor;
		ctx.fillRect(this.x, this.y, this.w, this.h);
		ctx.closePath();
    	}
}
function criaBuracos(){
	let buraco1 = new Buraco(299,101);
	buracos.push(buraco1)
	console.log(buracos);
}
function Buraco(xB,wB){
	this.x=xB;
	this.w=wB;
	this.draw =function(){
		ctx.beginPath();
		ctx.fillStyle ="#5eb4dd";
		ctx.fillRect(this.x,500,this.w,100);//altitude, altura e cor são fixas pra diferentes buracos
		ctx.closePath();
	}
}
function init (){
 	criaCanos();
	criaBuracos();
	document.getElementById("button").style= "display: none";
	ctx.clearRect(0,0,canvas.width,canvas.height);
	let mario = new Mario();
	mario.draw()
	piso();
	window.setInterval(run, 1);//milisegundos
}
function sol(){
   ctx.save();
   ctx.beginPath();
   ctx.arc(100,75,50,0,2*Math.PI);
   ctx.fillStyle ="#FFFF00";
   ctx.stroke();
	ctx.fill();
   ctx.restore();
}
function tri(x,y,l){
	ctx.beginPath();
	ctx.moveTo(x,y);
	ctx.lineTo(x+l,y);
	ctx.lineTo(x+l/2,y+Math.sqrt(3)*l/2);
	ctx.lineTo(x,y);
	ctx.fillStyle ="#228b22";
	ctx.fill();
	ctx.closePath();	
}
function piso (){
	let l =25;
	for(var i =0; i<=5000;i+=l){
	tri(i,500,l)		
	}
}
// a primeira é a coordenada x do canto superior esquerdo do cano
// a segunda é a coordenada y do canto superior esquerdo
//terceira coisa é comprimento
//a quarta é a altura
function Mario(){
	this.x= 100; 
    	this.l=20;
	this.y= 480;
	this.vy= 0;
    	this.vx= 0;
	this.move = function(){
        this.x += this.vx;
        this.y += this.vy;
	this.vy += g;
		if (this.x<=0){
			this.vx=0
			this.x=0
        	}if (this.x>=5000-this.l){
			this.vx=0;
			this.x=5000-this.l;
		}
		for (let i = 0; i< canos.length; i++){
			if (this.x >= canos[i].x-this.l && this.x< canos[i].x+1 && this.y >= canos[i].y-this.l+1&& this.y <=canos[i].y+canos[i].h){
				this.vx =0;
				this.x = canos[i].x-this.l;
				//colisão com o cano na esquerda
			}else if(this.x <=canos[i].x+canos[i].w && this.x>=canos[i].x+canos[i].w-10 && this.y >=canos[i].y-this.l+1 &&this.y <=canos[i].y+canos[i].h){
				this.vx= 0;
				this.x = canos[i].x+canos[i].w;
				//colisão com o cano na direita
			}else if (this.y >=canos[i].y-this.l &&this.x >canos[i].x -this.l && this.x <canos[i].x+canos[i].w && this.vx>0 && this.y <=canos[i].y+canos[i].h-10){
				this.vy=0;
				this.y=canos[i].y-this.l;
				this.vx +=u;  
				//atrito prum lado, caso mario esteja em cima do cano
			}else if (this.y >=canos[i].y-this.l && this.x >canos[i].x -this.l && this.x <canos[i].x+canos[i].w && this.vx<0 && this.y <=canos[i].y+canos[i].h-10){
				this.vy=0;
				this.y=canos[i].y-this.l;
				this.vx +=mi;
				//atrito pro outro lado, caso mario esteja em cima do cano
			}
			if (this.x >canos[i].x -this.l && this.x <canos[i].x+canos[i].w  && this.y <=canos[i].y+canos[i].h && this.y >=canos[i].y+canos[i].h-10){ 
				this.vy=0.01;
				this.vy+=g;
				this.y=canos[i].y+canos[i].h;
				//se o mario pular debaixo do cano, terá vy 0 e não mudará de lugar
			}
			if (this.y >=canos[i].y-this.l && this.x >canos[i].x -this.l && this.x <canos[i].x+canos[i].w  && this.y <=canos[i].y+canos[i].h-10){ 
				this.vy=0;
				this.y=canos[i].y-this.l;
				//se o mario estiver em cima do cano, vy=0 e ele fica em cima do cano, não indo para baixo
			}
		}
		if(Math.abs(this.vx)<=0.061){
         this.vx = 0;   //tirar o atrito "residual"
        }else if(this.vx<=-VX && this.y == h-c-this.l){
            this.vx = -VX;
            this.vx +=mi;
        }else if (this.vx >=-VX && this.vx<-0.01 && this.y >= h-c-this.l){
            this.vx +=mi;
        }else if(this.vx >0.01 && this.vx <=VX && this.y >=h-c-this.l){
            this.vx +=u; 
        }else if (this.vx >=VX && this.y == h-c-this.l){
            this.vx = VX;
            this.vx +=u;
        }else if(this.y<h-c-this.l&&this.vx==0){
            this.vx +=u
            this.vx +=mi
        }
    }   
	this.draw = function(){
		ctx.beginPath();
		ctx.fillStyle = "#000000";
		ctx.fillRect(this.x, this.y, this.l, this.l);
		ctx.closePath();
	}	
	this.jump = function(){
	if(event.keyCode == '68'){
		this.vx += ax;
        }else  if(event.keyCode =='65'){
           	 this.vx -= ax;
        }else if(event.keyCode =='32' && this.vy == 0){
            	this.vy=VY;
        }
       // console.log(this.vx)
     } 
}
function run (){
	time +=5;//milisegundos (por enquanto inútil)
	ctx.clearRect (0,0,canvas.width , canvas.height);
	mario.move();
	tri();
	sol();
    	for(let i =0;i<canos.length;i++){
       	canos[i].draw();
        //console.log("desenhando");
   	}piso();
	for(let i=0;i<buracos.length;i++){
		buracos[i].draw();
	}mario.draw();
}
