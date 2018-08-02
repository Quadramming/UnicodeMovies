import createButton from './createButton.js';
import sceneScroll from './sceneScroll.js';
import movies from './movies.js';
import scene from './scene.js';
import Movie from './Movie.js';
import startSceneFn from './startSceneFn.js'
import style from './styleTag.js';
import T from './i18n.js'

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
		this.add.text(config.width/2, 75, T`LEVEL ${this._level}`, style`Title`).setOrigin(0.5);
		this._createBackButton(config.width/2, 200);
		this._createLevel(config.width/2, 300);
		scene.appear(this);
	}
	
	_createBackButton(x, y) {
		createButton(this, startSceneFn('Levels', this), x, y, T`Back`, style`Button`);
	}
	
	_createLevel(x, y) {
		const gap = 60;
		for ( const i in movies[this._level] ) {
			const movie = new Movie(movies[this._level][i]);
			let textStyle = style`Button Emoji`;
			if ( movie.isAnswered() ) {
				//debugger;
				textStyle = style`${textStyle} Green`;
			}
			createButton(
				this,
				startSceneFn('Gameplay', this, {level: this._level, movie: parseInt(i)}),
				x, y + gap*i, movie.getChars(), textStyle
			);
		}
	}
	
}
