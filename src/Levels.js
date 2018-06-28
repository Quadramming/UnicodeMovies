import createButton from './createButton.js';
import sceneScroll from './sceneScroll.js';

export default class extends Phaser.Scene {
	
	constructor() {
		super('Levels');
	}
	
	create() {
		const config = this.sys.game.config;
		
		this.add.text(config.width/2, 75, 'LEVELS', style.use('Title')).setOrigin(0.5);
		
		this._createBackButton(config.width/2, 200);
		this._createLevels(config.width/2, 300);
		
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
	
	_createLevels(x, y) {
		const gap = 50;
		for ( const i in movies ) {
			createButton(this, () => {
				this.scene.start('Level', {level: parseInt(i)});
			}, x, y + gap*i, `Level ${i}`, style.use('Button'));
		}
	}
}
