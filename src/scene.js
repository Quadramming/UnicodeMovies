import style from './style.js';

const speed = 200;

function start(newScene, scene, ...args) {
	const game = scene.sys.game;
	const color = style.use('appBackGround');
	
	scene.cameras.main.on('camerafadeoutstart', () => {
		scene.input.disable(game);
	});
	scene.cameras.main.on('camerafadeoutcomplete', () => {
		scene.scene.start(newScene, ...args);
		scene.input.enable(game);
	});
	
	scene.cameras.main.fadeOut(speed, color.r, color.g, color.b);
}

function appear(scene) {
	const color = style.use('appBackGround');
	scene.cameras.main.fadeIn(speed, color.r, color.g, color.b);
}

export default {
	start,
	appear
}

