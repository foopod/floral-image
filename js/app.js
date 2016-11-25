var ctx;
var canvas;
var perlin = new ClassicalNoise(Math);
var count = 0;

function gameLoop() {
     var div = 30;
    var size = 50;
    var diff = 40;
    
    for(var y =0; y < canvas.height/size; y++){
        for(var x =0; x < canvas.width/size; x++){
            var colorArray = new Array(4);
            colorArray[0] = hsv2rgb((perlin.noise(x*5 / diff+count*0.05, y*5/diff+count*0.05,0)+0.5)*255,0.75,0.95);
            colorArray[1] = hsv2rgb((perlin.noise(x*5 / diff+count*0.05, y*5/diff+count*0.05,0)+0.5)*255,0.45,0.98);
            colorArray[2] = hsv2rgb((perlin.noise(x*5 / diff+count*0.05, y*5/diff+count*0.05,0)+0.5)*255,0.85,0.9);
            colorArray[3] = hsv2rgb((perlin.noise(x*5 / diff+count*0.05, y*5/diff+count*0.05,0)+0.5)*255,0.65,0.92);
            colorArray = shuffle(colorArray,x,y);
//            console.log(colorArray);
            
//            ctx.fillStyle =colorToUse;
//            ctx.fillRect(x*xdiv,y*ydiv,xdiv+1,ydiv);
            drawTri(x,y,size,size,"up",colorArray[1]);
            drawTri(x,y,size,size,"down",colorArray[2]);
            drawTri(x,y,size,size,"left",colorArray[3]);
            drawTri(x,y,size,size,"right",colorArray[4]);
        } 
    }
    count+=0.1;
}

 Math.seededRandom = function(max, min, seed) {
    max = max || 1;
    min = min || 0;
 
    var newseed = (seed * 9301 + 49297) % 233280;
    var rnd = newseed / 233280;
 
    return min + rnd * (max - min);
}

function drawTri(x,y,xdiv,ydiv,type, color){
    switch(type) {
    case "up":
        ctx.beginPath();
        ctx.moveTo(x*xdiv, y*ydiv);
        ctx.lineTo(x*xdiv+0.5*xdiv, y*ydiv+0.5*ydiv);
        ctx.lineTo(x*xdiv+xdiv, y*ydiv);
        ctx.lineTo(x*xdiv, y*ydiv);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        break;
    case "down":
        ctx.beginPath();
        ctx.moveTo(x*xdiv, y*ydiv+ydiv);
        ctx.lineTo(x*xdiv+0.5*xdiv, y*ydiv+0.5*ydiv);
        ctx.lineTo(x*xdiv+xdiv, y*ydiv+ydiv);
        ctx.lineTo(x*xdiv, y*ydiv+ydiv);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        break;
    case "left":
        ctx.beginPath();
        ctx.moveTo(x*xdiv, y*ydiv);
        ctx.lineTo(x*xdiv+0.5*xdiv, y*ydiv+0.5*ydiv);
        ctx.lineTo(x*xdiv, y*ydiv+ydiv);
        ctx.lineTo(x*xdiv, y*ydiv);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        break;
    case "right":
        ctx.beginPath();
        ctx.moveTo(x*xdiv+xdiv, y*ydiv);
        ctx.lineTo(x*xdiv+0.5*xdiv, y*ydiv+0.5*ydiv);
        ctx.lineTo(x*xdiv+xdiv, y*ydiv+ydiv);
        ctx.lineTo(x*xdiv+xdiv, y*ydiv);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        break;
    }
}

function init(){
    canvas = document.getElementById('sunset');
	ctx = canvas.getContext('2d');
    resizeCanvas();
}

function start(){
    init();
    //Start gameloop
    setInterval(gameLoop, 33); // 33 milliseconds = ~ 30 frames per sec
}


function shuffle(array,x,y) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    Math.seedrandom(x+","+y);
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}