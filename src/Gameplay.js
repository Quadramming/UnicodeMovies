import Movie from './Movie.js';
import Keyboard from './Keyboard.js';
import createButton from './createButton.js';

class TextInput {
	
	constructor(scene, x, y) {
		this._scene = scene;
		this._text = '';
		this._obj = null;
		this._x = x;
		this._y = y;
		this._textLimit = 5;
	}
	
	create() {
		this._text = '';
		this._obj = this._scene.add.text(this._x, this._y, '', { fontFamily: 'Arial', fontSize: 50, color: '#000000' });
		this._obj.setOrigin(0.5);
	}
	
	add(v) {
		if ( this._text.length >= this._textLimit ) {
			return;
		}
		this._text += v;
		this._obj.setText(this._text);
	}
	
	backspace() {
		if ( this._text.length > 0 ) {
			this._text = this._text.slice(0, -1);
		} else {
			// Noting to erase
		}
		this._obj.setText(this._text);
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
	}
	
	init(data) {
		this._level = data.level;
		this._movieIndex = parseInt(data.movie);
		this._movie = new Movie(movies[data.level][data.movie]);
	}
	
	preload() {
		const config = this.sys.game.config;
		this._textInput = new TextInput(this, config.width/2, 300);
		this._keyboard = new Keyboard(this);
		this._keyboard.preload();
	}
	
	create() {
		const config = this.sys.game.config;
		
		this.add.text(config.width/2, 175, this._movie.getChars(), { fontFamily: 'Noto Emoji', fontSize: 64, color: '#000000' }).setOrigin(0.5);
		
		createButton(this, () => {
			this.scene.start('Level', {level: this._level});
		}, config.width/2, 50, 'Back', style.use('Button'));
		
		createButton(this, () => {
			this._goNext();
		}, config.width, 50, 'Next', style.use('Button')).setOrigin(1, 0.5);
		
		createButton(this, () => {
			this._goPrev();
		}, 0, 50, 'Prev', style.use('Button')).setOrigin(0, 0.5);
		
		this._textInput.create();
		this._keyboard.create();
		
		this._keyboard.setOnkey((v) => {
			if ( v === 'BACKSPACE' ) {
				this._textInput.backspace(v);
			} else {
				this._textInput.add(v);
			}
		});
	}
	
	_goNext() {
		this.scene.start('Gameplay', {level: this._level, movie: this._movieIndex + 1});
	}
	
	_goPrev() {
		this.scene.start('Gameplay', {level: this._level, movie: this._movieIndex - 1});
	}
	
}