import 'phaser';

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	scene: {
		preload: preload,
		create: create
	}
};

const game = new Phaser.Game(config);

function preload () {
	alert('preloaded');
}

function create () {
}
