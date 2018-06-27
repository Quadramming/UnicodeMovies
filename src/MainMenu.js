import createButton from './createButton.js';

export default class extends Phaser.Scene {
	
	constructor() {
		super('MainMenu');
	}
	
	create() {
		const config = this.sys.game.config;
		
		this.add.text(config.width/2, 75, 'UNICODE MOVIES', style.use('Title')).setOrigin(0.5);
		
		createButton(this, () => {
			this.scene.start('Gameplay');
		}, config.width/2, 200, 'Start', style.use('Button'));
		
		createButton(this, () => {
			this.scene.start('Help');
		}, config.width/2, 300, 'Help', style.use('Button'));
		
		createButton(this, () => {
			c('EXIT');
		}, config.width/2, 400, 'Exit', style.use('Button'));
	}
	
}
