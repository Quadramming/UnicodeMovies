import storage from './storageHandler.js';
import createButton from './createButton.js';
import disappear from './disappear.js';
import style from './styleTag.js';
import T from './i18n.js'

export default class {
	
	constructor(scene, movie) {
		this._scene = scene;
		this._hintText = null;
		this._movie = movie;
		this._maxHints = 3;
		this._button = null;
	}
	
	create() {
		const config = this._scene.sys.game.config;
		this._hintText = this._scene.add.text(config.width - 75, 350, T``, style`Text Sized`).setOrigin(0.5);
		this._setHintText(false);
		if ( this._isCanHint() ) {
			this._button = createButton(this._scene, this._getHint.bind(this), 0, 350, this._getUseHintText(), style`Button`).setOrigin(0, 0.5);
		}
	}
	
	win() {
		if ( storage.getMovieHints(this._movie) < this._maxHints ) {
			storage.setMovieHints(this._movie, this._maxHints);
			this._destroyButton();
			this._setHintText();
		}
	}
	
	_isCanHint() {
		return storage.getMovieHints(this._movie) < this._maxHints;
	}
	
	_getUseHintText() {
		const hints = storage.getHints();
		return T`Use hint (${hints})`;
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
		const textHints = this._scene.add.text(x, y, T`-1`, style`HintBubble`).setOrigin(0.5);
		this._scene.tweens.add({
			targets: textHints,
			y: textHints.y - 50,
			alpha: 0,
			duration: 1000,
			onComplete: () => { textHints.destroy() }
		});
	}
	
}
