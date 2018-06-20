import c from './console.js';

import Movie from './Movie.js';
import movies from './movies.js';

export default class extends Phaser.Scene {
	
	constructor() {
		super('Gameplay');
	}
	
	create() {
		const move = movies[0][0];
		const m = new Movie(movies[0][0]);
		
		this.add.text(100, 200, m.getChars(), { fontFamily: 'Noto Emoji', fontSize: 64, color: '#000000' });
		
		const startText = this.add.text(0, 100, 'Back', { fontFamily: 'Arial', fontSize: 50, color: '#000000' });
		startText.setInteractive(new Phaser.Geom.Rectangle(0, 0, startText.width, startText.height), Phaser.Geom.Rectangle.Contains);
		startText.on('pointerdown', () => {
			this.scene.start('MainMenu');
		});
	}
	
}