//Posição do player
var moveLeft = false;
var moveRight = false;

//Canvas & Contexto
var canvas 	= null;
var ctx 	= null;

//Dimensões do canvas
var canvas_width = 420;
var game_width = 320;
var canvas_height = 480;

//Array Posição inimigo
var enemyX = [40, 120, 220];

var game = {
	velocity: 20,
	road1: 0,
	road2: -480,
	playerX: 320,
	currentTime: null,
	lastTime: null,
	roadImg: null,
	carImg: null,
	showEnemy: true,
	colide: false,
	score: 0,
	lifes: 3
};

var enemies = [];

window.addEventListener("load", function(event){

	canvas = document.getElementById("game_screen");
	ctx = canvas.getContext("2d");

	game.roadImg = new Image();
	game.roadImg.src = "img/road.png";

	game.carImg = new Image();
	game.carImg.src = "img/car.png";

	window.addEventListener("keydown", function(event){
		if(event.key == "ArrowLeft"){
			moveLeft = true;
		}

		if(event.key == "ArrowRight"){
			moveRight = true;
		}
	});

	window.addEventListener("keyup", function(event){
		if(event.key == "ArrowLeft"){
			moveLeft = false;
		}

		if(event.key == "ArrowRight"){
			moveRight = false;
		}
	});

	requestAnimationFrame(loop);

});

var render = function(){
	//Desenhando a pista
	ctx.clearRect(0, game.road1, canvas_width, canvas_height);
	ctx.clearRect(0, game.road2, canvas_width, canvas_height);
	game.road1 += game.velocity;
	game.road2 += game.velocity;
	ctx.drawImage(game.roadImg, 0, game.road1, game_width, canvas_height);
	ctx.fillStyle = "#f00";
	ctx.drawImage(game.roadImg, 0, game.road2, game_width, canvas_height);

	if(game.road2 == 0){
		game.road1 = -480;
	}

	if(game.road1 == 0){
		game.road2 = -480;
	}

	//Desenhando o score
	ctx.fillStyle = "#0f0";
	ctx.fillRect(game_width, 0, canvas_width-game_width, canvas_height);

	//Desenhando o player
	if(moveLeft && game.playerX > 120){
		game.playerX -= 20;
	}

	if(moveRight && game.playerX < game_width+20){
		game.playerX += 20;
	}

	ctx.drawImage(game.carImg, game.playerX-100, canvas_height-100, 60, 80);

	//Desenhando o inimigo
	if(game.showEnemy){
		var enemy = {};
		
		var index = Math.floor(Math.random() * 3);
		var posEnemy = enemyX[index];
		enemy.X = posEnemy;
		enemy.Y = -80;

		enemies.push(enemy);

		game.showEnemy = false;
	}

	for(enemy in enemies){
		ctx.drawImage(game.carImg, enemies[enemy].X, enemies[enemy].Y, 60, 80);
	
		if((game.playerX-100) > enemies[enemy].X){
			toleranceCollisionX = (game.playerX-100) - enemies[enemy].X - 60;
		}
		else{
			toleranceCollisionX = enemies[enemy].X - (game.playerX-100) - 60;
		}

		if(toleranceCollisionX < 0 
			&& (enemies[enemy].Y >= (canvas_height-100-80)) 
			&&  (enemies[enemy].Y <= (canvas_height-100+80))){
			console.log("Colidiu");
			console.log("enemy X: ", enemies[enemy].X);
			console.log("enemy Y: ", enemies[enemy].Y);
			console.log("player X: ", (game.playerX-100));
			console.log("player Y: ", (canvas_height-100-80));
			enemies.splice(enemy, 1);
			game.showEnemy = true;
			game.colide = true;
			return false;
		}

		enemies[enemy].Y += game.velocity;
		
		if(enemies[enemy].Y > 480+80){
			enemies.splice(enemy, 1);
			console.log(enemies);
			game.showEnemy = true;
		}
	}


}

var loop = function(){

	//Pegando data atual
	game.currentTime = Date.now();

	if(game.lastTime == null){
		game.lastTime = Date.now();
	}

	if((game.currentTime - game.lastTime) >= 100){
		game.lastTime = game.currentTime;
		game.score++;
		console.log("SCORE: ", game.score);
		render();
	}

	requestAnimationFrame(loop);

}