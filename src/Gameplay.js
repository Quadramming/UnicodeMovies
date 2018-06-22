import Movie from './Movie.js';
import movies from './movies.js';
import Keyboard from './Keyboard.js';

class TextInput {
	
	constructor(scene, x, y) {
		this._scene = scene;
		this._text = '';
		this._obj = null;
		this._x = x;
		this._y = y;
	}
	
	create() {
		this._obj = this._scene.add.text(this._x, this._y, '', { fontFamily: 'Arial', fontSize: 50, color: '#000000' });
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
		this._keyboard = new Keyboard(this);
		this._textInput = new TextInput(this, 100, 200);
	}
	
	preload() {
		this._keyboard.preload();
	}
	
	create() {
		const move = movies[0][0];
		const m = new Movie(movies[0][0]);
		
		this.add.text(100, 200, m.getChars(), { fontFamily: 'Noto Emoji', fontSize: 64, color: '#000000' });
		
		const startText = this.add.text(0, 100, 'Back', { fontFamily: 'Arial', fontSize: 50, color: '#000000' });
		startText.setInteractive(new Phaser.Geom.Rectangle(0, 0, startText.width, startText.height), Phaser.Geom.Rectangle.Contains);
		startText.on('pointerdown', () => {
			this.scene.start('MainMenu');
		});
		
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
	
	update() {
	}
	
}