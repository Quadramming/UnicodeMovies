import createButton from './createButton.js';
import storage from './storageHandler.js';
import style from './style.js';
import scene from './scene.js';
import disappear from './disappear.js';
import startSceneFn from './startSceneFn.js'

export default class extends Phaser.Scene {
	
	constructor() {
		super('MainMenu');
		this._config = null;
		this._hintButton = null;
	}
	
	create() {
		this._config = this.sys.game.config;
		this.add.text(this._config.width/2, 75, 'UNICODE MOVIES', style.use('Title')).setOrigin(0.5);
		createButton(this, startSceneFn('Levels', this), this._config.width/2, 200, 'Start', style.use('Button'));
		createButton(this, startSceneFn('Help', this), this._config.width/2, 300, 'Help', style.use('Button'));
		createButton(this, () => { c('EXIT'); }, this._config.width/2, 400, 'Exit', style.use('Button'));
		this._showHints();
		scene.appear(this);
	}
	
	_showHints() {
		const hintInterval = 1; 3600*4;
		const now = Date.now();
		const lastEntrance = storage.getLastEntrance();
		const timeDiff = (now - lastEntrance) / 1000;
		if ( timeDiff > hintInterval ) {
			let hints = Math.floor( timeDiff / hintInterval );
			hints = Math.min(hints, 10);
			this._hintButton = createButton(this, this._onGetHintsButton.bind(this, hints), this._config.width/2, 600, 'Get hints', style.use('Button'));
		}
	}
	
	_onGetHintsButton(hints, x, y) {
		storage.setLastEntrance();
		storage.addHints(hints);
		disappear(this._hintButton);
		const textHints = this.add.text(x, y, `+${hints}`, style.use('HintBubble')).setOrigin(0.5);
		this.tweens.add({
			targets: textHints,
			y: this._hintButton.y - 100,
			alpha: 0,
			duration: 1000
		});
	}
	
}
