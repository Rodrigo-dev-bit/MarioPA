var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
let g = 0.08;
let u = -0.05;
let mi =0.05;
let time = 0;
let ax =1.05;
let VX = 5;
let VY= -7;
let h = 600; //altura do canvas
let c = 100; //tamanho do chão
let canos =[];
//let Bx=300;
//let By=500;
//let Bw=100;
//let Bh=100;
//para ficar no chão, Ty+Th tem que ser igual a 500
let mario = new Mario();

function criaCanos(){
	let cano1 = new Cano(100, 680, 40, 80, "#00FF00");
	let cano2 = new Cano(200, 680, 45, 90, "#00FF00");
	canos.push(cano1, cano2)
    console.log(canos);
}
function init (){
    criaCanos();
	document.getElementById("button").style= "display: none";
	ctx.clearRect(0,0,canvas.width,canvas.height);
	let mario = new Mario();
	mario.draw()
	piso();
	window.setInterval(run, 2);//milisegundos
}
function piso (){
	ctx.save();
	ctx.fillStyle = "#8B5143";
	ctx.fillRect(0, 500, 5000, 100);
	ctx.restore();
	let l =20;
	for(var i =0; i<=5000;i+=l){
	tri(i,500,l)	
	
		
}
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
//function buraco(){
//	ctx.save();
//	ctx.fillStyle ="#5eb4dd";
//	ctx.fillRect(Bx,By,Bw,Bh);
//	ctx.restore();
	
//}

// a primeira é a coordenada x do canto superior esquerdo do cano
// a segunda é a coordenada y do canto superior esquerdo
//terceira coisa é comprimento
//a quarta é a altura

function Mario(){
	this.x= 100; 
    this.l=20;
	this.y= h-c-this.l;
	this.vy= 1;
    this.vx= 0;
	this.move = function(){
        this.x += this.vx;
        this.y += this.vy;
		this.vy += g;
		if (this.x<=0){
			this.vx=0
			this.x=0
        }
		for (let i = 0; i< canos.length; i+=5){
			if (this.x >= canos[i].x-this.l && this.x< canos[i].x+1 && this.y >= canos[i].y-this.l+1&& this.y <=canos[i].y+canos[i].h){
				this.vx =0;
				this.x = canos[i].x-this.l;
				//colisão com o cano na esquerda
				//CADA TX SUBSTITUIR POR CANOS.X 
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
				//ERRO consertado
			}
		}
		
		if(this.y >= h-c-this.l){
			this.vy=0;
			this.y = h-c-this.l;
           	//se ele estiver em cima do chão,vy=0 e ele fica em cima do chão,não indo pra baixo
		//se ele estiver em cima do buraco, cai
            //&& (this.x <Bx || this.x >Bx +Bw)
        }
		
		if(Math.abs(this.vx)<=0.061){
         this.vx = 0;   //tirar o atrito "residual" ------C=====3
        }else if(this.vx<=-VX && this.y == h-c  -this.l){
            this.vx = -VX;
            this.vx +=mi;
        }else if (this.vx >=-VX && this.vx<-0.01 && this.y >= h-c-this.l){
            this.vx +=mi;
        }else if(this.vx >0.01 && this.vx <=VX && this.y >=h-c-this.l){
            this.vx +=u; 
        }else if (this.vx >=VX && this.y == h-c-this.l){
            this.vx = VX;
            this.vx +=u;
        }else if(this.y<h-c-this.l){
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
        console.log(this.y)
     } 
	}
function run (){
	time +=5;//milisegundos (por enquanto inútil)
	ctx.clearRect (0,0,canvas.width , canvas.height);
	mario.move();
	piso();
	tri();
	//tubo();
	sol();
    for(let i =0;i<canos.length;i++){
       canos[i].draw();
        //console.log("desenhando");
    }

	//buraco();
	mario.draw();
}
