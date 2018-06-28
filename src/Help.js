import createButton from './createButton.js';
import sceneScroll from './sceneScroll.js';

export default class extends Phaser.Scene {
	
	constructor() {
		super('Help');
	}
	
	create() {
		const config = this.sys.game.config;
		
		this.add.text(config.width/2, 75, 'HELP', style.use('Title')).setOrigin(0.5);
		
		this._createBackButton(config.width/2, 200);
		this._createHelpText(0, 300);
		this._createBackButton(config.width/2, 500);
		sceneScroll(this, {
			left: 0,
			right: 0,
			top: 0,
			bottom: -100
		});
	}
	
	_createBackButton(x, y) {
		createButton(this, () => {
			this.scene.start('MainMenu');
		}, x, y, 'Back', style.use('Button'));
	}
	
	_createHelpText(x, y) {
		const helpText = [
			'Q: I cant',
			'A: You can'
		];
		this.add.text(x, y, helpText, style.use('Text'));
	}
}
