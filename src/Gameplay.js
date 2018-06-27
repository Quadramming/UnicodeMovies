import Movie from './Movie.js';
import movies from './movies.js';
import Keyboard from './Keyboard.js';
import createButton from './createButton.js';

class TextInput {
	
	constructor(scene, x, y) {
		this._scene = scene;
		this._text = '';
		this._obj = null;
		this._x = x;
		this._y = y;
	}
	
	create() {
		this._text = '';
		this._obj = this._scene.add.text(this._x, this._y, '', { fontFamily: 'Arial', fontSize: 50, color: '#000000' });
		this._obj.setOrigin(0.5);
	}
	
	add(v) {
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
	}
	
	preload() {
		const config = this.sys.game.config;
		this._textInput = new TextInput(this, config.width/2, 300);
		this._keyboard = new Keyboard(this);
		this._keyboard.preload();
	}
	
	create() {
		const config = this.sys.game.config;
		
		const move = movies[0][0];
		const m = new Movie(movies[0][0]);
		
		this.add.text(config.width/2, 175, m.getChars(), { fontFamily: 'Noto Emoji', fontSize: 64, color: '#000000' }).setOrigin(0.5);
		
		createButton(this, () => {
			this.scene.start('MainMenu');
		}, config.width/2, 50, 'Back', style.use('Button'));
		
		createButton(this, () => {
			c('Next');
		}, config.width, 50, 'Next', style.use('Button')).setOrigin(1, 0.5);
		
		createButton(this, () => {
			c('Previous');
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
	
}