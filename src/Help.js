import createButton from './createButton.js';
import sceneScroll from './sceneScroll.js';
import style from './style.js';
import scene from './scene.js';
import startSceneFn from './startSceneFn.js'

export default class extends Phaser.Scene {
	
	constructor() {
		super('Help');
	}
	
	create() {
		const config = this.sys.game.config;
		sceneScroll(this, {
			left: 0,
			right: 0,
			top: 0,
			bottom: -100
		});
		this.add.text(config.width/2, 75, 'HELP', style.use('Title')).setOrigin(0.5);
		this._createBackButton(config.width/2, 200);
		this._createHelpText(0, 300);
		this._createBackButton(config.width/2, 500);
		scene.appear(this);
	}
	
	_createBackButton(x, y) {
		createButton(this, startSceneFn('MainMenu', this), x, y, 'Back', style.use('Button'));
	}
	
	_createHelpText(x, y) {
		const helpText = [
			'Q: I cant',
			'A: You can'
		];
		this.add.text(x, y, helpText, style.use('Text'));
	}
	
}
