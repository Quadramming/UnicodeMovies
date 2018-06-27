import 'phaser';
import './console.js';

import './style.js';
import './textStyles.js';

import hash from './hash.js';

import SplashScreen from './SplashScreen.js';
import MainMenu from './MainMenu.js';
import Gameplay from './Gameplay.js';
import Help from './Help.js';
import Storage from './Storage.js';
import deleteFontLoaders from './deleteFontLoaders.js';

const config = {
	type: Phaser.CANVAS,
	//width: window.innerWidth,
	//height: window.innerHeight,
	width: 600,
	height: 800,
	backgroundColor: '#aaaaaa',
	scene: [{create}, SplashScreen, MainMenu, Gameplay, Help]
};

function create() {
	const canvas = this.sys.game.canvas;
	const w = this.sys.game.config.width;
	const h = this.sys.game.config.height;
	
	canvas.style.position = 'absolute';
	canvas.style.left = (window.innerWidth/2 - w/2) + 'px';
	canvas.style.top  = (window.innerHeight/2 - h/2) + 'px';
	
	this.scene.start('SplashScreen');
}

const game = new Phaser.Game(config);

/*
window.addEventListener('resize', (event) => {
	game.resize(window.innerWidth, window.innerHeight);
}, false);
*/

window.addEventListener('load', () => {
	deleteFontLoaders();
});
