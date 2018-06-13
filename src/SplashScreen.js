export default class extends Phaser.Scene {
	
	preload() {
		this.load.image('logo', 'assets/logo.png');
	}
	
	create() {
		const logo = this.add.sprite(400, 300, 'logo');
		logo.alpha = 0;
		const tween = this.tweens.add({
			targets: logo,
			alpha: 1,
			ease: 'Expo.easeOut',
			duration: 1000,
			yoyo: true,
			onComplete: () => {
				this.scene.start('MainMenu');
			}
		});
	}
	
}