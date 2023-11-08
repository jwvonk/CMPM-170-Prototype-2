title = "DVD SURVIVAL";

description = `Avoid the enemies!
`;

characters = [
`
ll ll
l ll l
ll ll
`	
];

const G = {
	WIDTH: 150,
	HEIGHT: 100,
	ENEMY_SPEED: 1
};

options = {
	viewSize: {x: G.WIDTH, y: G.HEIGHT},
	theme: "dark"
};


/**
 * @typedef {{
 * pos: Vector,
 * speedX: number,
 * speedY: number
 * }} Player
 */

/**
 * @type { Player }
 */
let player;


/**
 * @typedef {{
* pos: Vector
* }} Enemy
*/

/**
 * @type { Enemy [] }
 */
let enemies;
let colorCount = 0;
function colorShift(t){
	switch(t){
		case 0:
			color("red");
			break;
		case 1:
			color("yellow");
			break;
		case 2:
			color("green");
			break;
		case 3:
			color("cyan");
			break;
		case 4:
			color("blue");
			break;
		case 5:
			color("purple");
			break;
		default:
			color("red");
			break;
	}
}
function update() {
	if (!ticks) {
		player = {
			pos: vec(G.WIDTH * 0.5, G.HEIGHT * 0.5),
			speedX: 1,
			speedY: 1
		};

		enemies = [];
	}
	
	if (enemies.length === 0) {
		for (let i = 0; i < 4; i++) {
			const posX = rnd(0, G.WIDTH);
			const posY = -i * G.HEIGHT * 0.1;
			enemies.push({
				pos: vec(posX, posY),
			 })
		}
	}

	if (input.isJustPressed) {
		// play("jump");
		player.speedY *= -1;
	}

	if (player.pos.x >= G.WIDTH-2 || player.pos.x <= 2) {
		player.speedX *= -1;
		colorCount+=1;
		addScore(1);

		const speedXSign = Math.sign(player.speedX);
    	const speedYSign = Math.sign(player.speedY);

		// Check if the score is less than 100 before incrementing speed
		if (score < 100 && score % 10 === 0) {
			player.speedX += 0.1 * speedXSign;
			player.speedY += 0.1 * speedYSign;
		}
	}

	if (player.pos.y >= G.HEIGHT-2 || player.pos.y <= 2) {
		player.speedY *= -1;
		colorCount+=1;
		addScore(1);
		
    	const speedYSign = Math.sign(player.speedY);
		const speedXSign = Math.sign(player.speedX);

		// Check if the score is less than 100 before incrementing speed
		if (score < 100 && score % 10 === 0) {
			player.speedX += 0.1 * speedXSign;
			player.speedY += 0.1 * speedYSign;
		}
	}

	player.pos = vec(player.pos.x + player.speedX, player.pos.y + player.speedY);
	// player.pos.clamp(0, G.WIDTH, 0, G.HEIGHT);
	colorShift(colorCount%6);
	char("a", player.pos);

	remove(enemies, (e) => {
		e.pos.y += G.ENEMY_SPEED;

		color("black");

		const isCollidingWithPlayer = box(e.pos, 10).isColliding.char.a;

		if (isCollidingWithPlayer) end();

		return (e.pos.y > G.HEIGHT);
	});

	console.log("score: " + score);
	console.log("SpeedX: " + player.speedX + " SpeedY: " + player.speedY);
}
