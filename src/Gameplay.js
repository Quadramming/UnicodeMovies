import Movie from './Movie.js';
import Keyboard from './Keyboard.js';
import createButton from './createButton.js';
import hash from './hash.js';
import movies from './movies.js';
import style from './style.js';
import storage from './storageHandler.js';
import scene from './scene.js';
import disappear from './disappear.js';

class TextInput {
	
	constructor(scene, x, y) {
		this._scene = scene;
		this._text = '';
		this._obj = null;
		this._x = x;
		this._y = y;
		this._textLimit = 5;
		this._onChange = null;
	}
	
	create() {
		this._text = '';
		this._obj = this._scene.add.text(this._x, this._y, '', { fontFamily: 'Arial', fontSize: 50, color: '#000000' });
		this._obj.setOrigin(0.5);
	}
	
	setOnchange(fn) {
		this._onChange = fn;
	}
	
	add(v) {
		if ( this._text.length >= this._textLimit ) {
			return;
		}
		this._text += v;
		this._updateText();
	}
	
	backspace() {
		if ( this._text.length > 0 ) {
			this._text = this._text.slice(0, -1);
		} else {
			// Noting to erase
		}
		this._updateText();
	}
	
	_updateText() {
		this._obj.setText(this._text);
		if ( this._onChange ) {
			this._onChange(this._text);
		}
	}
	
}

class Hinter {
	
	constructor(scene, movie) {
		this._scene = scene;
		this._hintText = null;
		this._movie = movie;
		this._maxHints = 3;
		this._button = null;
	}
	
	create() {
		const config = this._scene.sys.game.config;
		this._hintText = this._scene.add.text(config.width/2, 350, '', style.use('Text')).setOrigin(0.5);
		this._setHintText(false);
		if ( this._isCanHint() ) {
			this._button = createButton(this._scene, this._getHint.bind(this), 0, 350, this._getUseHintText(), style.use('Button')).setOrigin(0, 0.5);
		}
	}
	
	win() {
		storage.setMovieHints(this._movie, this._maxHints);
		this._destroyButton();
		this._setHintText();
	}
	
	_isCanHint() {
		if ( storage.getMovieHints(this._movie) >= this._maxHints ) {
			return false;
		}
		return true;
	}
	
	_getUseHintText() {
		const hints = storage.getHints();
		return `Use hint (${hints})`;
	}
	
	_getHint(x, y) {
		if ( storage.getHints() === 0 ) {
			return false;
		}
		if ( this._scene.tweens.getAllTweens().length > 0 ) {
			return false;
		}
		this._minusHint(x, y);
		storage.addMovieHints(this._movie);
		this._setHintText();
		if ( this._isCanHint() ) {
			this._button.setText(this._getUseHintText());
		} else {
			this._destroyButton();
		}
	}
	
	_setHintText(tweens = true) {
		const level = storage.getMovieHints(this._movie);
		let text = '';
		if ( level === 1 ) {
			text = this._movie.getCentury();
		} else if ( level === 2 ) {
			text = this._movie.getDecade();
		} else if ( level === 3 ) {
			text = this._movie.getYear();
		}
		if ( tweens ) {
			this._scene.tweens.add({
				targets: this._hintText,
				duration: 200,
				yoyo: true,
				alpha: 0,
				onYoyo: () => { this._hintText.setText( text ) },
			});
		} else {
			this._hintText.setText( text );
		}
	}
	
	_destroyButton() {
		if ( this._button ) {
			disappear(this._button);
			this._button = null;
		}
	}
	
	_minusHint(x, y) {
		storage.subHint();
		const textHints = this._scene.add.text(x, y, '-1', style.use('HintBubble')).setOrigin(0.5);
		this._scene.tweens.add({
			targets: textHints,
			y: textHints.y - 50,
			alpha: 0,
			duration: 1000,
			onComplete: () => {
				textHints.destroy();
			}
		});
	}
	
}

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
		this._textInput = new TextInput(this, config.width/2, 300);
		this._hinter = new Hinter(this, this._movie);

		if ( this._answer ) {
			this.add.text(config.width/2, 100, this._answer, style.use('Text')).setOrigin(0.5);
		}
		
		this.add.text(config.width/2, 175, this._movie.getChars(), style.use('MovieEmoji')).setOrigin(0.5);
		this._winEmoji = this.add.text(config.width/2, 175, this._movie.getChars(), style.use('MovieEmojiDone')).setOrigin(0.5);
		if ( ! this._answer ) {
			this._winEmoji.setAlpha(0);
		}
		
		createButton(this, () => {
			scene.start('Level', this, {level: this._level});
		}, config.width/2, 50, 'Back', style.use('Button'));
		
		if ( this._isNextExists() ) {
			createButton(this, () => {
				this._goNext();
			}, config.width, 50, 'Next', style.use('Button')).setOrigin(1, 0.5);
		}
		
		if ( this._isPrevExists() ) {
			createButton(this, () => {
				this._goPrev();
			}, 0, 50, 'Prev', style.use('Button')).setOrigin(0, 0.5);
		}
		
		this._textInput.create();
		this._keyboard.create();
		
		this._keyboard.setOnkey((v) => {
			if ( v === 'BACKSPACE' ) {
				this._textInput.backspace(v);
			} else {
				this._textInput.add(v);
			}
		});
		
		this._textInput.setOnchange((text) => {
			if ( ! this._answer ) {
				if ( this._movie.titles.includes(hash(text)) ) {
					this._win(text);
				}
			}
		});
		
		this._hinter.create();
		scene.appear(this);
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
