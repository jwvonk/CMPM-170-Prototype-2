title = "DVD SURVIVAL";

description = `Avoid the enemies!
`;

characters = [
  `
ll ll
l ll l
ll ll
`,
];

const G = {
	WIDTH: 150,
	HEIGHT: 100,
	ENEMY_SPEED: 1,
	ENEMY_SIZE: 8,
	ENEMY_MAX: 7,
	PLAYER_BASE_SPEED: 1,
	PLAYER_WIDTH: 6,
	PLAYER_HEIGHT: 4,
};

options = {
	viewSize: { x: G.WIDTH, y: G.HEIGHT },
	theme: "dark",
	isReplayEnabled: true,
};

/**
 * @typedef {{
 * pos: Vector,
 * speed: number,
 * isMovingLeft: boolean,
 * isMovingUp: boolean,
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

/**
 * @type { number }
 */
let colorCount = 0;

function colorShift(t) {
	switch (t) {
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
		speed: G.PLAYER_BASE_SPEED,
		isMovingLeft: false,
		isMovingUp: false,
		};

		enemies = [];
	}
	
	if (enemies.length < G.ENEMY_MAX) {
		const posX = rnd(0, G.WIDTH);
		const posY = -1 * (G.HEIGHT + rnd(-G.HEIGHT, G.HEIGHT/ 2));
		enemies.push({
			pos: vec(posX, posY),
		});
	}

	if (input.isJustPressed) {
		player.isMovingUp = !player.isMovingUp;
	}

	if (player.pos.x >= G.WIDTH - G.PLAYER_WIDTH / 2 || player.pos.x <= G.PLAYER_HEIGHT / 2) {
		player.isMovingLeft = !player.isMovingLeft;

		addScore(1, player.pos);
		play("coin");
		colorCount++;

		// increase speed each 10 score (and below 100 score)
		if (score < 100 && score % 10 === 0) {
			player.speed += 0.1;
		}
	}

	if (player.pos.y >= G.HEIGHT - G.PLAYER_HEIGHT / 2 || player.pos.y <= G.PLAYER_HEIGHT / 2) {
		player.isMovingUp = !player.isMovingUp;

		addScore(1, player.pos);
		play("coin");
		colorCount++;

		if (score < 100 && score % 10 === 0) {
			player.speed += 0.1;
		}
	}

	player.pos.x += player.isMovingLeft ? -player.speed : player.speed;
	player.pos.y += player.isMovingUp ? -player.speed : player.speed;

	colorShift(colorCount % 6);
	char("a", player.pos);

	remove(enemies, (e) => {
		e.pos.y += G.ENEMY_SPEED;

		color("black");

		const isCollidingWithPlayer = box(e.pos, G.ENEMY_SIZE).isColliding.char.a;

		if (isCollidingWithPlayer) {
		play("hit");
		end();
		}
		return e.pos.y > (G.HEIGHT + G.ENEMY_SIZE);
	});
}
