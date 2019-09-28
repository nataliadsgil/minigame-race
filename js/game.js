//Posição do player
var moveLeft = false;
var moveRight = false;

//Canvas & Contexto
var canvas 	= null;
var ctx 	= null;

//Dimensões do canvas
var canvas_width = 320;
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
	showEnemy: true
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
	ctx.drawImage(game.roadImg, 0, game.road1, canvas_width, canvas_height);
	ctx.fillStyle = "#f00";
	ctx.drawImage(game.roadImg, 0, game.road2, canvas_width, canvas_height);

	if(game.road2 == 0){
		game.road1 = -480;
	}

	if(game.road1 == 0){
		game.road2 = -480;
	}

	//Desenhando o player
	if(moveLeft && game.playerX > 120){
		game.playerX -= 20;
	}

	if(moveRight && game.playerX < canvas_width+20){
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
		// console.log(enemies[enemy]);
		ctx.drawImage(game.carImg, enemies[enemy].X, enemies[enemy].Y, 60, 80);
		
		enemies[enemy].Y += game.velocity;

		if(enemies[enemy].Y > 480+80){
			console.log("DESTRUIR");
			enemies.splice(enemy, 1);
			console.log(enemies);
			game.showEnemy = true;
		}
	}

}

var loop = function(){

	//Pegando data atual
	game.currentTime = Date.now();
	// var ms = time.getTime();

	if(game.lastTime == null){
		game.lastTime = Date.now();
	}

	// console.log("lastTime: ", game.lastTime);
	// console.log("currentTime: ", game.currentTime);
	// console.log("diferença: ", game.currentTime - game.lastTime);

	if((game.currentTime - game.lastTime) >= 100){
		game.lastTime = game.currentTime;

		render();
	}

	//game.currentTime++;
	// console.log(game.currentTime);
	//if(game.currentTime == 2){
	//	game.currentTime = 0;
	//	console.log("passou aqui");
	requestAnimationFrame(loop);
//}
}