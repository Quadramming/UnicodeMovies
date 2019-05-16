import 'phaser';
import './console.js';

import './textStyles.js';

import style from './styleTag.js';
import SplashScreen from './SplashScreen.js';
import MainMenu from './MainMenu.js';
import Gameplay from './Gameplay.js';
import Help from './Help.js';
import Levels from './Levels.js';
import Level from './Level.js';
import deleteFontLoaders from './deleteFontLoaders.js';

let game = null;

const config = {
	type: Phaser.AUTO,
	//width: window.innerWidth,
	//height: window.innerHeight,
	parent: 'mainDiv',
	width: 600,
	height: 800,
	backgroundColor: style`appBackGround`.colorInt,
	scene: [{create}, SplashScreen, MainMenu, Gameplay, Help, Levels, Level]
};

function setViewport(size) {
	const vp = document.getElementById('viewport');
	vp.setAttribute('content', 'width='+size+', viewport-fit=cover, user-scalable=no');
}

function create() {
	setViewport(600);
	
	const canvas = this.sys.game.canvas;
	const w = this.sys.game.config.width;
	const h = this.sys.game.config.height;
	canvas.style.position = 'absolute';
	canvas.style.left = (window.innerWidth/2 - w/2) + 'px';
	canvas.style.top  = (window.innerHeight/2 - h/2) + 'px';
	document.getElementById('mainDiv').style.display = 'block';
	this.scene.start('SplashScreen');
	
	const X = 10;
	const Y = 10;
	const W = 50;
	const H = 80;
	const R = 5; // Round
	const graphics = this.add.graphics();
	graphics.lineStyle(2, 0x404040, 1);
	
	// RU KEYBOARD
	for ( let i = 0; i < 10; ++i) {
			graphics.strokeRoundedRect(X+i*W, Y, W, H, R);
			this.add.text(X+i*W+30, Y+55, '1234567890'[i], style`Text ${{fontSize: 50}}`).setOrigin(0.5);
	}
	graphics.strokeRoundedRect(X+10*W, Y, W*2, H, R);
	this.add.text(X+10*W+50, Y+45, `\u2B05`, style`Text ${{fontSize: 75}}`).setOrigin(0.5);
	
	for ( let i = 0; i < 12; ++i) {
			graphics.strokeRoundedRect(X+i*W, Y+H*1,  W, H, R);
			this.add.text(X+i*W+25, Y+H*1+40, 'ЙЦУКЕНГШЩЗХЪ'[i], style`Text ${{fontSize: 40}}`).setOrigin(0.5);
	}
	
	for ( let i = 0; i < 11; ++i) {
			graphics.strokeRoundedRect(X+i*W+25, Y+H*2,  W, H, R);
			this.add.text(X+i*W+25+25, Y+H*2+40, 'ФЫВАПРОЛДЖЭ'[i], style`Text ${{fontSize: 40}}`).setOrigin(0.5);
	}
	
	for ( let i = 0; i < 11; ++i) {
			graphics.strokeRoundedRect(X+i*W, Y+H*3,  W, H, R);
			this.add.text(X+i*W+25, Y+H*3+40, ':ЯЧСМИТЬБЮ-'[i], style`Text ${{fontSize: 40}}`).setOrigin(0.5);
	}
	graphics.strokeRoundedRect(X+11*W, Y+H*3,  W, H, R);
	this.add.text(X+11*W+25, Y+H*3+45, `\u2B05`, style`Text ${{fontSize: 40}}`).setOrigin(0.5);
	
	graphics.strokeRoundedRect(X+50, Y+H*4,  W, H, R);
	this.add.text(X+50+25, Y+H*4+40, ',', style`Text ${{fontSize: 40}}`).setOrigin(0.5);
	graphics.strokeRoundedRect(X+100, Y+H*4,  W*8, H, R);
	graphics.strokeRoundedRect(X+100+W*8, Y+H*4,  W, H, R);
	this.add.text(X+100+W*8+25, Y+H*4+40, '+', style`Text ${{fontSize: 40}}`).setOrigin(0.5);
}

window.addEventListener('load', () => {
	if ( window.cordova ) {
		document.addEventListener('deviceready', initApplication, false);
	} else {
		initApplication();
	}
});

function onBackButton(game) {
	const scenes = game.scene.getScenes();
	if ( scenes.length > 0 ) {
		if ( scenes[0].onBackButton ) {
			scenes[0].onBackButton();
		}
	}
}

const initApplication = () => {
	deleteFontLoaders();
	game = new Phaser.Game(config);
	document.addEventListener('backbutton', onBackButton.bind(null, game), false);
};
