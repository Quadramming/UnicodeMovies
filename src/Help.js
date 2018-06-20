import c from './console.js';
import createButton from './createButton.js';

export default class extends Phaser.Scene {
	
	constructor() {
		super('Help');
	}
	
	create() {
		this._setupScroll();
		
		const style = Phaser.style;
		
		this.add.text(0, 0, 'HELP', style.use('Title'));
		
		createButton(this, () => {
			this.scene.start('MainMenu');
		}, 0, 100, 'Back', style.use('Button'));
		
	}
	
	_setupScroll() {
		let pointerX = null;
		let pointerY = null;
		this.input.on('pointerdown', (pointer) => {
			pointerX = null;
			pointerY = null;
		});
		this.input.on('pointermove', (pointer) => {
			const isGoodPointer = pointerX !== null && pointerY !== null
			const isMove = pointer.wasTouch || pointer.isDown;
			if ( isGoodPointer && isMove ) {
				this.cameras.main.x += (pointer.x - pointerX);
				this.cameras.main.y += (pointer.y - pointerY);
			}
			pointerX = pointer.x;
			pointerY = pointer.y;
		});
	}
	
}
