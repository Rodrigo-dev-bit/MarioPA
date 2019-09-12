//https://stackoverflow.com/questions/11330917/how-to-play-a-mp3-using-javascript




var foo = new Sound("file:///C:/Users/ms3/Downloads/bruh-sound-effect-2.mp3", 1000, true);
var canvas= document.getElementById("canvas");
var ctx = canvas.getContext("2d")
var array=[]
function Sound(source, volume, loop){
    this.source = source;
    this.volume = volume;
    this.loop = loop;
    var son;
    this.son = son;
    this.finish = false;
    this.stop = function()
    {
        document.body.removeChild(this.son);
    }
    this.start = function()
    {
        if (this.finish) return false;
        this.son = document.createElement("embed");
        this.son.setAttribute("src", this.source);
        this.son.setAttribute("hidden", "true");
        this.son.setAttribute("volume", this.volume);
        this.son.setAttribute("autostart", "true");
        this.son.setAttribute("loop", this.loop);
        document.body.appendChild(this.son);
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish = true;
    }
    this.init = function(volume, loop)
    {
        this.finish = false;
        this.volume = volume;
        this.loop = loop;
    }
}
  function Bola(Xc,Yc,r){
  this.x =Xc;
  this.y =Yc;
  this.raio =r;
  this.vX = 2;
  this.vY = 2;
  this.draw = function(){
      ctx.beginPath();
      ctx.arc(this.x,this.y,this.raio,0,Math.PI*2);
      ctx.stroke();
      ctx.closePath();
  }
  this.move = function(){
    if(this.a +this.vX-this.raio>=600){
      this.vX*=-1;
      this.x += this.vX;
      this.y += txhis.vY;}
  }
}
    function create(){
      var bola1 = new Bola(event.clientX,event.clientY,Math.random()*20 + 5);
      array.push(bola1);



}
      function init(){
      var boladomariz= new Bola(300,300,25);
      array.push(boladomariz);
      window.setInterval(run, 10);
}
        function run(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for(var i=0; i<array.length; i++){
      array[i].move();
      array[i].draw();
    }

}
