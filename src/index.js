import 'phaser';
import hash from './hash.js';

import c from './console.js';

import Movie from './Movie.js';
import movies from './moviesBase.js';
import SplashScreen from './SplashScreen.js';


class MainMenu extends Phaser.Scene {
	
	constructor() {
		super('MainMenu');
	}
	
	preload() {
	}
	
	create() {
		let x = this.add.text(0, 0, 'UNICODE MOVIES', { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
		x.setInteractive(new Phaser.Geom.Rectangle(0, 0, x.width, x.height), Phaser.Geom.Rectangle.Contains);
		debugger;
		x.on('pointerdown', function () {
			c('wwowow');
		});
		this.add.text(0, 100, 'Start', { fontFamily: 'Arial', fontSize: 50, color: '#000000' });
		this.add.text(0, 150, 'Credits', { fontFamily: 'Arial', fontSize: 50, color: '#000000' });
		this.add.text(0, 200, 'Exit', { fontFamily: 'Arial', fontSize: 50, color: '#000000' });
	}
	
}

class Game extends Phaser.Scene {
	
	constructor() {
		super({ key: 'sceneA' });
	}
	
	preload() {
	}
	
	create() {

		const move = movies[0][0];
		const m = new Movie(movies[0][0]);
		
		this.add.text(100, 200, m.getChars(), { fontFamily: 'Noto Emoji', fontSize: 64, color: '#000000' });
	}
	
}

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#AAAAAA',
	scene: [SplashScreen, MainMenu]
};

const game = new Phaser.Game(config);
