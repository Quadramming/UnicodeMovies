import createButton from './createButton.js';
import storage from './storageHandler.js';
import scene from './scene.js';
import disappear from './disappear.js';
import startSceneFn from './startSceneFn.js'
import style from './styleTag.js';
import T from './i18n.js'

export default class extends Phaser.Scene {
	
	constructor() {
		super('MainMenu');
		this._config = null;
		this._hintButton = null;
	}
	
	create() {
		this._config = this.sys.game.config;
		this.add.text(this._config.width/2, 75, T`UNICODE MOVIES`, style`Title`).setOrigin(0.5);
		let i = 0;
		const gap = 75;
		const yStart = 250;
		createButton(this, startSceneFn('Levels', this), this._config.width/2, yStart+gap*(i++), T`Start`, style`Button`);
		createButton(this, startSceneFn('Help', this), this._config.width/2, yStart+gap*(i++), T`Help`, style`Button`);
		createButton(this, () => { c('EXIT'); }, this._config.width/2, yStart+gap*(i++), T`Exit`, style`Button`);
		this._showHints();
		scene.appear(this);
	}
	
	_showHints() {
		const hintInterval = 3600*4; // 1;
		const now = Date.now();
		const lastEntrance = storage.getLastEntrance();
		const timeDiff = (now - lastEntrance) / 1000;
		if ( timeDiff > hintInterval ) {
			let hints = Math.floor( timeDiff / hintInterval );
			hints = Math.min(hints, 10);
			this._hintButton = createButton(this, this._onGetHintsButton.bind(this, hints), this._config.width/2, 600, T`Get hints`, style`Button`);
		}
	}
	
	_onGetHintsButton(hints, x, y) {
		storage.setLastEntrance();
		storage.addHints(hints);
		disappear(this._hintButton);
		const textHints = this.add.text(x, y, `+${hints}`, style`HintBubble`).setOrigin(0.5);
		this.tweens.add({
			targets: textHints,
			y: this._hintButton.y - 100,
			alpha: 0,
			duration: 1000
		});
	}
	
}
