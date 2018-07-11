import createButton from './createButton.js';
import sceneScroll from './sceneScroll.js';
import storage from './storageHandler.js';
import movies from './movies.js';
import Movie from './Movie.js';
import style from './style.js';
import scene from './scene.js';

export default class extends Phaser.Scene {
	
	constructor() {
		super('Levels');
	}
	
	create() {
		const config = this.sys.game.config;
		
		this.add.text(config.width/2, 75, 'LEVELS', style.use('Title')).setOrigin(0.5);
		
		this._createBackButton(config.width/2, 200);
		this._createLevels(config.width/2, 300);
		
		sceneScroll(this, {
			left: 0,
			right: 0,
			top: 0,
			bottom: -100
		});
		scene.appear(this);
	}
	
	_createBackButton(x, y) {
		createButton(this, () => {
			scene.start('MainMenu', this);
		}, x, y, 'Back', style.use('Button'));
	}
	
	_createLevels(x, y) {
		const gap = 50;
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
			let buttonStyle = style.use('Button');
			if ( isCompleted ) {
				buttonStyle = style.use(buttonStyle, 'Green');
			}
			if ( isOpened ) {
				createButton(this, () => {
					scene.start('Level', this, {level: parseInt(i)});
				}, x, y + gap*i, `Level ${i}`, buttonStyle);
			} else {
				buttonStyle = style.use(buttonStyle, 'Gray');
				createButton(this, () => {}, x, y + gap*i, `Level ${i}`, buttonStyle);
			}
			if ( ! isCompleted ) {
				isChampion = false;
			}
			if ( answered < 1 ) {
				isOpened = false;
			}
		}
		if ( isChampion ) {
			const config = this.sys.game.config;
			this.add.text(config.width/2, 125, 'You are the champion', style.use('Title', 'Red')).setOrigin(0.5);
		}
	}
	
}
