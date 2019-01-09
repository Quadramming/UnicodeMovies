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

const config = {
	type: Phaser.AUTO,
	//width: window.innerWidth,
	//height: window.innerHeight,
	width: 600,
	height: 800,
	backgroundColor: style`appBackGround`.color,
	scene: [{create}, SplashScreen, MainMenu, Gameplay, Help, Levels, Level]
};

function create() {
	const canvas = this.sys.game.canvas;
	const w = this.sys.game.config.width;
	const h = this.sys.game.config.height;
	canvas.style.position = 'absolute';
	canvas.style.left = (window.innerWidth/2 - w/2) + 'px';
	canvas.style.top  = (window.innerHeight/2 - h/2) + 'px';
	this.scene.start('SplashScreen');
	
	const X = 10;
	const Y = 10;
	const W = 50;
	const H = 80;
	const R = 10; // Round
	const graphics = this.add.graphics();
	graphics.lineStyle(2, 0x404040, 1);
	
	// RU KEYBOARD
	for ( let i = 0; i < 10; ++i) {
			graphics.strokeRoundedRect(X+i*W, Y, W-2, H-2, R);
			this.add.text(X+i*W+30, Y+55, '1234567890'[i], style`Text ${{fontSize: 50}}`).setOrigin(0.5);
	}
	graphics.strokeRoundedRect(X+10*W, Y, W*2-2, H-2, R);
	this.add.text(X+10*W+50, Y+40, `\u2B05`, style`Text ${{fontSize: 75}}`).setOrigin(0.5);
	for ( let i = 0; i < 12; ++i) {
			graphics.strokeRoundedRect(X+i*W, Y+H*1,  W-2, H-2, R);
			this.add.text(X+i*W+25, Y+H*1+40, "ЙЦУКЕНГШЩЗХЪ"[i], style`Text ${{fontSize: 40}}`).setOrigin(0.5);
	}
	for ( let i = 0; i < 11; ++i) {
			graphics.strokeRoundedRect(X+i*W+25, Y+H*2,  W-2, H-2, R);
			this.add.text(X+i*W+25+25, Y+H*2+40, "ФЫВАПРОЛДЖЭ"[i], style`Text ${{fontSize: 40}}`).setOrigin(0.5);
	}
	for ( let i = 0; i < 9; ++i) {
			graphics.strokeRoundedRect(X+i*W+50, Y+H*3,  W-2, H-2, R);
			this.add.text(X+i*W+25+50, Y+H*3+40, "ЯЧСМИТЬБЮ"[i], style`Text ${{fontSize: 40}}`).setOrigin(0.5);
	}
	graphics.strokeRoundedRect(X+100, Y+H*4,  W-2+300, H-2, R);
}

/*
window.addEventListener('resize', (event) => {
	game.resize(window.innerWidth, window.innerHeight);
}, false);
*/

window.addEventListener('load', () => {
	deleteFontLoaders();
	const game = new Phaser.Game(config);
});
