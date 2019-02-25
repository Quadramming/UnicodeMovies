import createButton from './createButton.js';
import sceneScroll from './sceneScroll.js';
import movies from './movies.js';
import Movie from './Movie.js';
import scene from './scene.js';
import startSceneFn from './startSceneFn.js'
import style from './styleTag.js';
import T from './i18n.js'

export default class extends Phaser.Scene {
	
	constructor() {
		super('Levels');
	}
	
	create() {
		this._config = this.sys.game.config;
		sceneScroll(this, {
			left: 0,
			right: 0,
			top: 150,
			bottom: 0
		});
		this.add.text(this._config.width/2, 75, T`LEVELS`, style`Title`).setOrigin(0.5);
		this._createBackButton(this._config.width/2, 225);
		const isChampion = this._createLevels(this._config.width/2, 325);
		if ( isChampion ) {
			this.add.text(this._config.width/2, 150, T`You are the champion`, style`Text Red`).setOrigin(0.5);
		}
		scene.appear(this);
	}
	
	_createBackButton(x, y) {
		createButton(this, startSceneFn('MainMenu', this), x, y, T`Back`, style`Button`);
	}
	
	_createLevels(x, y) {
		const gap = 60;
		let isOpened = true;
		let isChampion = true;
		for ( const i in movies ) {
			let answered = 0;
			let isCompleted = true;
			for ( const j of movies[i] ) {
				const movie = new Movie(j);
				if ( ! movie.isAnswered() ) {
					isCompleted = false;
				} else {
					++answered;
				}
			}
			let buttonStyle = style`Button`;
			if ( isCompleted ) {
				buttonStyle = style`${buttonStyle} Green`;
			}
			if ( isOpened ) {
				createButton(this, startSceneFn('Level', this, {level: parseInt(i)}), x, y + gap*i, T`Level ${i}`, buttonStyle);
			} else {
				buttonStyle = style`${buttonStyle} Gray`;
				createButton(this, null, x, y + gap*i, T`Level ${i}`, buttonStyle);
			}
			if ( ! isCompleted ) {
				isChampion = false;
			}
			if ( answered < 8 ) {
				isOpened = false;
			}
		}
		return isChampion;
	}
	
}
