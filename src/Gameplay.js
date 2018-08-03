import Movie from './Movie.js';
import Keyboard from './Keyboard.js';
import createButton from './createButton.js';
import hash from './hash.js';
import movies from './movies.js';
import storage from './storageHandler.js';
import scene from './scene.js';
import Hinter from './Hinter.js'
import TextInput from './TextInput.js'
import startSceneFn from './startSceneFn.js'
import style from './styleTag.js';
import T from './i18n.js'

export default class extends Phaser.Scene {
	
	constructor() {
		super('Gameplay');
		this._keyboard = null;
		this._textInput = null;
		this._level = null;
		this._movieIndex = null;
		this._movie = null;
		this._hinter = null;
		this._answer = null;
		this._winEmoji = null;
	}
	
	init(data) {
		this._level = data.level;
		this._movieIndex = parseInt(data.movie);
		this._movie = new Movie(movies[data.level][data.movie]);
		this._answer = storage.getAnswer(this._movie);
	}
	
	preload() {
		this._keyboard = new Keyboard(this);
		this._keyboard.preload();
	}
	
	create() {
		const config = this.sys.game.config;
		this._textInput = new TextInput(this, config.width/2, 275);
		this._hinter = new Hinter(this, this._movie);
		
		if ( this._answer ) {
			const answer = this.add.text(config.width/2, 275, this._answer, style`AnswerInput`).setOrigin(0.5);
			answer.setScale( Math.min(500/answer.width, 1));
		}
		
		this.add.text(config.width/2, 175, this._movie.getChars(), style`MovieEmoji`).setOrigin(0.5);
		this._winEmoji = this.add.text(config.width/2, 175, this._movie.getChars(), style`MovieEmojiDone`).setOrigin(0.5);
		if ( ! this._answer ) {
			this._winEmoji.setAlpha(0);
		}
		
		createButton(this, startSceneFn('Level', this, {level: this._level}), config.width/2, 50, T`\u{2934}`, style`Button Big Emoji`);
		
		if ( this._isNextExists() ) {
			createButton(this, this._goNext.bind(this), config.width-100, 50, T`\u{27A1}`, style`Button Big Emoji`).setOrigin(1, 0.5);
		}
		if ( this._isPrevExists() ) {
			createButton(this, this._goPrev.bind(this), 100, 50, T`\u{2B05}`, style`Button Big Emoji`).setOrigin(0, 0.5);
		}
		this._inputInit();
		this._hinter.create();
		scene.appear(this);
	}
	
	_inputInit() {
		this._textInput.create();
		this._keyboard.create();
		this._keyboard.setOnkey((v) => {
			if ( ! this._answer ) {
				if ( v === 'BACKSPACE' ) {
					this._textInput.backspace(v);
				} else {
					this._textInput.add(v);
				}
			}
		});
		this._textInput.setOnchange((text) => {
			if ( ! this._answer ) {
				if ( this._movie.titles.includes(hash(text)) ) {
					this._win(text);
				}
			}
		});
	}

	_win(text) {
		const config = this.sys.game.config;
		this._keyboard.disable();
		this._hinter.win();
		storage.setAnswer(this._movie, text);
		this.tweens.add({
			targets: this._winEmoji,
			alpha: 1,
			duration: 1500,
			ease: 'Expo.easeOut',
			onComplete: () => {
				if ( this._isNextExists() ) {
					this._goNext();
				} else {
					scene.start('Level', this, {level: this._level});
				}
			}
		});
	}
	
	_isNextExists() {
		const nextIndex = this._movieIndex + 1;
		const maxIndex = movies[this._level].length;
		return nextIndex < maxIndex;
	}
	
	_isPrevExists() {
		const prevIndex = this._movieIndex - 1;
		return prevIndex >= 0;
	}
	
	_goNext() {
		scene.start('Gameplay', this, {level: this._level, movie: this._movieIndex + 1});
	}
	
	_goPrev() {
		scene.start('Gameplay', this, {level: this._level, movie: this._movieIndex - 1});
	}
	
}
