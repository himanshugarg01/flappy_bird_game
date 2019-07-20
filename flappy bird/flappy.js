var cvs=document.getElementById("canvas");
var ctx=cvs.getContext('2d');
var bird=new Image();
var fg=new Image();
var bg=new Image();
var pipeNorth=new Image();
var pipeSouth=new Image();


bird.src="bird.png";
fg.src="fg.png";
bg.src="bg.png";
pipeNorth.src="pipeNorth.png";
pipeSouth.src="pipeSouth.png";

var gap = 85;
var constant = 242+gap;

var bX=10;
var bY=150;
var gravity=1.5;

var score=0;

var flysound=new Audio();
var scrsound=new Audio();

flysound.src="fly.mp3";
scrsound.src="score.mp3";
document.addEventListener("keydown",function()
{
  bY-=25;
  flysound.play();
});

var pipe=[];
pipe[0]={
  x : cvs.width ,
  y : 0
}

function draw()
{
  ctx.drawImage(bg,0,0);
  for(var i=0;i<pipe.length;i++)
  {
    console.log("ww");
  ctx.drawImage(pipeNorth,pipe[i].x,pipe[i].y);
  ctx.drawImage(pipeSouth,pipe[i].x,pipe[i].y+constant);
  pipe[i].x--;
  if(pipe[i].x==125)
  {
    pipe.push({
      x : cvs.width ,
      y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
    });
  }

  if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width && (bY <= pipe[i].y + pipeNorth.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - fg.height){
    location.reload(); // reload the page
}


if(pipe[i].x == 5){
    score++;
    scrsound.play();
}

  }
  ctx.drawImage(fg,0,cvs.height-fg.height);
  ctx.drawImage(bird,bX,bY);

  bY+=gravity;

  ctx.fillStyle="#000";
  ctx.font="20px verdana";
  ctx.fillText("Score : "+score,0,cvs.height-20);

  requestAnimationFrame(draw);
}

draw();
