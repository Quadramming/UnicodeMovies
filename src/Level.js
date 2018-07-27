import createButton from './createButton.js';
import sceneScroll from './sceneScroll.js';
import movies from './movies.js';
import style from './style.js';
import scene from './scene.js';
import Movie from './Movie.js';
import startSceneFn from './startSceneFn.js'

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
		sceneScroll(this, {
			left: 0,
			right: 0,
			top: 0,
			bottom: -100
		});
		this.add.text(config.width/2, 75, `LEVEL ${this._level}`, style.use('Title')).setOrigin(0.5);
		this._createBackButton(config.width/2, 200);
		this._createLevel(config.width/2, 300);
		scene.appear(this);
	}
	
	_createBackButton(x, y) {
		createButton(this, startSceneFn('Levels', this), x, y, 'Back', style.use('Button'));
	}
	
	_createLevel(x, y) {
		const gap = 50;
		for ( const i in movies[this._level] ) {
			const movie = new Movie(movies[this._level][i]);
			let textStyle = style.use('Button', 'Emoji');
			if ( movie.isAnswered() ) {
				textStyle = style.use(textStyle, 'Green');
			}
			createButton(
				this,
				startSceneFn('Gameplay', this, {level: this._level, movie: parseInt(i)}),
				x, y + gap*i, movie.getChars(), textStyle
			);
		}
	}
	
}
