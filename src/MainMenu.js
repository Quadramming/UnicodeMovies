import createButton from './createButton.js';
import storage from './storageHandler.js';
import style from './style.js';

export default class extends Phaser.Scene {
	
	constructor() {
		super('MainMenu');
	}
	
	create() {
		const config = this.sys.game.config;
		
		this.add.text(config.width/2, 75, 'UNICODE MOVIES', style.use('Title')).setOrigin(0.5);
		
		createButton(this, () => {
			this.scene.start('Levels');
		}, config.width/2, 200, 'Start', style.use('Button'));
		
		createButton(this, () => {
			this.scene.start('Help');
		}, config.width/2, 300, 'Help', style.use('Button'));
		
		createButton(this, () => {
			c('EXIT');
		}, config.width/2, 400, 'Exit', style.use('Button'));
		
		
		const lastEntrance = storage.getLastEntrance();
		const now = Date.now();
		const timeDiff = (now - lastEntrance) / 1000;
		const hintInterval = 10; 3600*4;
		if ( timeDiff > hintInterval ) {
			const hintButton = createButton(this, () => {
				let hints = Math.floor( timeDiff/hintInterval );
				hints = Math.min(hints, 10);
				storage.setLastEntrance();
				storage.addHints(hints);
				hintButton.destroy();
			}, config.width/2, 600, 'Get hints', style.use('Button'));
		}
	}
	
}
