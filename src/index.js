import 'phaser';
import hash from './hash.js';

import c from './console.js';

import Movie from './movie.js';
import movies from './moviesBase.js';

const config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	backgroundColor: '#FFFFFF',
	scene: {
		preload: preload,
		create: create
	}
};

const game = new Phaser.Game(config);


function preload() {
	
}

function create() {
	this.add.text(0, 0, 'UnicodeMovies', { fontFamily: 'Arial', fontSize: 64, color: '#000000' });
	
	const move = movies[0][0];
	const m = new Movie(movies[0][0]);
	c(hash('lol'));
	c( m.check('хат  ико') );
	this.add.text(100, 200, m.getChars(), { fontFamily: 'Noto Emoji', fontSize: 64, color: '#000000' });
}
