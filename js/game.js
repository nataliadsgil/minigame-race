//Posição do player
var playerX = 0;
var playerY = 0;

//Canvas & Contexto
var canvas 	= null;
var ctx 	= null;

//Dimensões do canvas
var canvas_width = 320;
var canvas_height = 480;

var game = {
	velocity: 1,
	road1: 0,
	road2: -480
};

window.addEventListener("load", function(event){

	canvas = document.getElementById("game_screen");
	ctx = canvas.getContext("2d");

	requestAnimationFrame(loop);

});

var loop = function(){
	//Desenhando a pista
	var img = new Image();
	img.src = "img/road.png";
	ctx.clearRect(0, game.road1, canvas_width, canvas_height);
	ctx.clearRect(0, game.road2, canvas_width, canvas_height);
	game.road1 += game.velocity;
	game.road2 += game.velocity;
	ctx.drawImage(img, 0, game.road1, canvas_width, canvas_height);
	ctx.drawImage(img, 0, game.road2, canvas_width, canvas_height);

	if(game.road2 == 0){
		game.road1 = -480;
	}

	if(game.road1 == 0){
		game.road2 = -480;
	}

	requestAnimationFrame(loop);
}