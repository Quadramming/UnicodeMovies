import createButton from './createButton.js';
import storage from './storageHandler.js';
import style from './style.js';
import scene from './scene.js';
import disappear from './disappear.js';

export default class extends Phaser.Scene {
	
	constructor() {
		super('MainMenu');
	}
	
	create() {
		const config = this.sys.game.config;
		
		this.add.text(config.width/2, 75, 'UNICODE MOVIES', style.use('Title')).setOrigin(0.5);
		
		createButton(this, () => {
			scene.start('Levels', this);
		}, config.width/2, 200, 'Start', style.use('Button'));
		
		createButton(this, () => {
			scene.start('Help', this);
		}, config.width/2, 300, 'Help', style.use('Button'));
		
		createButton(this, () => {
			c('EXIT');
		}, config.width/2, 400, 'Exit', style.use('Button'));
		
		
		const lastEntrance = storage.getLastEntrance();
		const now = Date.now();
		const timeDiff = (now - lastEntrance) / 1000;
		const hintInterval = 1; 3600*4;
		if ( timeDiff > hintInterval ) {
			const hintButton = createButton(this, (x, y) => {
				let hints = Math.floor( timeDiff/hintInterval );
				hints = Math.min(hints, 10);
				storage.setLastEntrance();
				storage.addHints(hints);
				disappear(hintButton);
				const textHints = this.add.text(x, y, `+${hints}`, style.use('HintBubble')).setOrigin(0.5);
				this.tweens.add({
					targets: textHints,
					y: hintButton.y - 100,
					alpha: 0,
					duration: 1000
				});
			}, config.width/2, 600, 'Get hints', style.use('Button'));
		}
		scene.appear(this);
	}
	
}
