export default class extends Phaser.Scene {
	
	constructor() {
		super('SplashScreen');
	}
	
	preload() {
		this.load.image('logo', 'assets/logo.png');
	}
	
	create() {
		this.cameras.main.setBackgroundColor('#000000');
		
		const config = this.sys.game.config;
		const logo = this.add.sprite(config.width/2, config.height/2, 'logo');
		logo.setScale(0.3, 0.3);
		logo.alpha = 0;
		const tween = this.tweens.add({
			targets: logo,
			alpha: 1,
			ease: 'Expo.easeOut',
			//duration: 1000,
			duration: 200,
			yoyo: true,
			onComplete: () => {
				this.scene.start('MainMenu');
			}
		});
	}
	
}
