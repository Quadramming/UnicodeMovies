import createButton from './createButton.js';

export default class extends Phaser.Scene {
	
	constructor() {
		super('Help');
	}
	
	create() {
		this._setupScroll();
		
		const style = Phaser.style;
		
		this.add.text(0, 0, 'HELP', style.use('Title'));
		
		this._createBackButton(0, 100);
		this._createBackButton(0, 500);
		this._createHelpText(0, 200);
	}
	
	_createBackButton(x, y) {
		createButton(this, () => {
			this.scene.start('MainMenu');
		}, x, y, 'Back', Phaser.style.use('Button'));
	}
	
	_setupScroll() {
		let pointerX = null;
		let pointerY = null;
		let init = false;
		let clip = {
			left: 0,
			right: 0,
			top: 0,
			bottom: -100
		};
		
		this.input.on('pointerdown', (pointer) => {
			pointerX = null;
			pointerY = null;
			init = true;
		});
		
		this.input.on('pointermove', (pointer) => {
			if ( ! init ) {
				return;
			}
			const isGoodPointer = pointerX !== null && pointerY !== null
			const isMove = pointer.wasTouch || pointer.isDown;
			if ( isGoodPointer && isMove ) {
				this.cameras.main.x += (pointer.x - pointerX);
				this.cameras.main.y += (pointer.y - pointerY);
			}
			if ( this.cameras.main.x > clip.right ) {
				this.cameras.main.x = clip.right;
			} else if ( this.cameras.main.x < clip.left ) {
				this.cameras.main.x = clip.left;
			}
			if ( this.cameras.main.y > clip.top ) {
				this.cameras.main.y = clip.top;
			} else if ( this.cameras.main.y < clip.bottom ) {
				this.cameras.main.y = clip.bottom;
			}
			pointerX = pointer.x;
			pointerY = pointer.y;
		});
	}
	
	_createHelpText(x, y) {
		const helpText = [
			'Q: I cant',
			'A: You can'
		];
		this.add.text(x, y, helpText, Phaser.style.use('Text'));
	}
}
