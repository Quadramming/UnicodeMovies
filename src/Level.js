import createButton from './createButton.js';
import sceneScroll from './sceneScroll.js';
import movies from './movies.js';
import style from './style.js';

export default class extends Phaser.Scene {
	
	constructor() {
		super('Level');
		this._level = null;
	}
	
	init(data) {
		this._level = data.level;
	}
	
	create() {
		const config = this.sys.game.config;
		
		this.add.text(config.width/2, 75, `LEVEL ${this._level}`, style.use('Title')).setOrigin(0.5);
		
		this._createBackButton(config.width/2, 200);
		this._createLevel(config.width/2, 300);
		
		sceneScroll(this, {
			left: 0,
			right: 0,
			top: 0,
			bottom: -100
		});
	}
	
	_createBackButton(x, y) {
		createButton(this, () => {
			this.scene.start('Levels');
		}, x, y, 'Back', style.use('Button'));
	}
	
	_createLevel(x, y) {
		const gap = 50;
		for ( const i in movies[this._level] ) {
			createButton(this, () => {
				this.scene.start('Gameplay', {level: this._level, movie: parseInt(i)});
			}, x, y + gap*i, movies[this._level][i][0], style.use('Button', 'Emoji'));
		}
	}
	
}
