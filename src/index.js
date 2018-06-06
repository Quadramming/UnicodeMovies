import 'phaser';
import hash from './hash.js';

import c from './console.js';

import Movie from './movie.js';
import movies from './moviesBase.js';

class MainMenu extends Phaser.Scene {
	
	constructor() {
		super('MainMenu');
	}
	
	preload() {
	}
	
	create() {
		this.add.text(0, 0, 'UNICODE MOVIES', { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
		
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

class SplashScreen extends Phaser.Scene {
	
	preload() {
		this.load.image('logo', 'assets/logo.png');
	}
	
	create() {
		const logo = this.add.sprite(400, 300, 'logo');
		logo.alpha = 0;
		var tween = this.tweens.add({
			targets: logo,
			alpha: 1,
			ease: 'Expo.easeOut',
			duration: 1500,
			yoyo: true,
			onComplete: () => {
				this.scene.start('MainMenu');
			},
		});
		c(this);
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
