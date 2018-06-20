import c from './console.js';
import createButton from './createButton.js';

export default class extends Phaser.Scene {
	
	constructor() {
		super('MainMenu');
	}
	
	create() {
		const style = Phaser.style;
		
		this.add.text(0, 0, 'UNICODE MOVIES', style.use('Title'));
		
		createButton(this, () => {
			this.scene.start('Gameplay');
		}, 0, 100, 'Start', style.use('Button'));

		createButton(this, () => {
			this.scene.start('Help');
		}, 0, 150, 'Help', style.use('Button'));
		
		createButton(this, () => {
			c('EXIT');
		}, 0, 200, 'Exit', style.use('Button'));
	}
	
}
