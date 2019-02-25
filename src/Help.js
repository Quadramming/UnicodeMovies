import createButton from './createButton.js';
import sceneScroll from './sceneScroll.js';
import scene from './scene.js';
import startSceneFn from './startSceneFn.js'
import style from './styleTag.js';
import T from './i18n.js'

export default class extends Phaser.Scene {
	
	constructor() {
		super('Help');
	}
	
	create() {
		const config = this.sys.game.config;
		sceneScroll(this, {
			left: 0,
			right: 0,
			top: 100,
			bottom: 0
		});
		this.add.text(config.width/2, 75, T`HELP`, style`Title`).setOrigin(0.5);
		this._createBackButton(config.width/2, 200);
		this._createHelpText(0, 300);
		this._createBackButton(config.width/2, 500);
		scene.appear(this);
	}
	
	_createBackButton(x, y) {
		createButton(this, startSceneFn('MainMenu', this), x, y, T`Back`, style`Button`);
	}
	
	_createHelpText(x, y) {
		const helpText = [
			T`Q: Who are developer?`,
			T`A: Trifle Quad Studio`
		];
		this.add.text(x, y, helpText, style`Text`);
	}
	
}
