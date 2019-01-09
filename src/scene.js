import style from './style.js';

const speed = 200;

function start(newScene, scene, ...args) {
	const game = scene.sys.game;
	const color = style.use('appBackGround');
	
	scene.cameras.main.on('camerafadeoutstart', () => {
		scene.input.enabled = false;
	});
	scene.cameras.main.on('camerafadeoutcomplete', () => {
		scene.input.enabled = true;
		scene.scene.start(newScene, ...args);
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
